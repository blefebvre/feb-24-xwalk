/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS - Import all parsers needed for this template
import heroBannerParser from './parsers/hero-banner.js';
import columnsArticleParser from './parsers/columns-article.js';
import cardsTrendParser from './parsers/cards-trend.js';
import cardsGalleryParser from './parsers/cards-gallery.js';

// TRANSFORMER IMPORTS - Import all transformers found in tools/importer/transformers/
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json (fashion-trends-page)
const PAGE_TEMPLATE = {
  name: 'fashion-trends-page',
  description: 'Fashion trends content page with hero banner, featured article, trend cards, photo gallery, and bottom CTA',
  urls: [
    'https://www.wknd-trendsetters.site/fashion-trends-of-the-season'
  ],
  blocks: [
    {
      name: 'hero-banner',
      instances: ['header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl']
    },
    {
      name: 'columns-article',
      instances: ['section#trends .grid-layout.tablet-1-column.grid-gap-lg']
    },
    {
      name: 'cards-trend',
      instances: ['main > section.section:nth-of-type(2) .grid-layout.desktop-3-column.tablet-1-column']
    },
    {
      name: 'cards-gallery',
      instances: ['main > section.section:nth-of-type(3) .grid-layout.desktop-3-column.tablet-2-column-1']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'header.section.secondary-section',
      style: 'secondary',
      blocks: ['hero-banner'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Trend Alert',
      selector: 'section#trends',
      style: null,
      blocks: ['columns-article'],
      defaultContent: ['.utility-text-align-center h2.h2-heading', '.utility-text-align-center .paragraph-lg']
    },
    {
      id: 'section-3',
      name: 'Trends',
      selector: 'main > section.section:nth-of-type(2)',
      style: 'secondary',
      blocks: ['cards-trend'],
      defaultContent: ['.utility-text-align-center h2.h2-heading']
    },
    {
      id: 'section-4',
      name: 'Gallery',
      selector: 'main > section.section:nth-of-type(3)',
      style: null,
      blocks: ['cards-gallery'],
      defaultContent: ['.utility-text-align-center.utility-margin-bottom-8rem h2.h2-heading', '.utility-text-align-center.utility-margin-bottom-8rem .paragraph-lg']
    },
    {
      id: 'section-5',
      name: 'Bottom CTA',
      selector: 'section.section.accent-section',
      style: 'accent',
      blocks: [],
      defaultContent: ['.utility-text-align-center h2.h2-heading', '.utility-text-align-center .paragraph-lg', '.utility-text-align-center .button-group']
    }
  ]
};

// PARSER REGISTRY - Map parser names to functions
const parsers = {
  'hero-banner': heroBannerParser,
  'columns-article': columnsArticleParser,
  'cards-trend': cardsTrendParser,
  'cards-gallery': cardsGalleryParser,
};

// TRANSFORMER REGISTRY - Array of transformer functions
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - The payload containing { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      }
    }];
  }
};
