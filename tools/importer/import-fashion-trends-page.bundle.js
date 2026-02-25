var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-fashion-trends-page.js
  var import_fashion_trends_page_exports = {};
  __export(import_fashion_trends_page_exports, {
    default: () => import_fashion_trends_page_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const textDiv = element.querySelector(":scope > div:first-child");
    const heading = textDiv ? textDiv.querySelector("h1, h2") : null;
    const subheading = textDiv ? textDiv.querySelector("p.subheading, p") : null;
    const buttons = textDiv ? Array.from(textDiv.querySelectorAll(".button-group a, a.button")) : [];
    const imageGrid = element.querySelector(":scope > div:nth-child(2)");
    const images = imageGrid ? Array.from(imageGrid.querySelectorAll("img")) : [];
    if (images.length === 0) {
      const fallback = element.querySelector("img");
      if (fallback) images.push(fallback);
    }
    const cells = [];
    if (images.length > 0) {
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      images.forEach((img) => imageFrag.appendChild(img));
      cells.push([imageFrag]);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    if (subheading) textFrag.appendChild(subheading);
    buttons.forEach((btn) => textFrag.appendChild(btn));
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document }) {
    const col1Div = element.querySelector(":scope > div:first-child");
    const image = col1Div ? col1Div.querySelector("img") : null;
    const col2Div = element.querySelector(":scope > div:nth-child(2)");
    const col1Frag = document.createDocumentFragment();
    if (image) col1Frag.appendChild(image);
    const col2Frag = document.createDocumentFragment();
    if (col2Div) {
      const children = Array.from(col2Div.children);
      children.forEach((child) => {
        col2Frag.appendChild(child);
      });
    }
    const cells = [[col1Frag, col2Frag]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-trend.js
  function parse3(element, { document }) {
    const cardDivs = Array.from(element.querySelectorAll(":scope > div"));
    const cells = [];
    cardDivs.forEach((cardDiv) => {
      const img = cardDiv.querySelector("img");
      const heading = cardDiv.querySelector("h3, h4, h2");
      const description = cardDiv.querySelector("p.paragraph-sm, p");
      const imageFrag = document.createDocumentFragment();
      if (img) {
        imageFrag.appendChild(document.createComment(" field:image "));
        imageFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (heading) textFrag.appendChild(heading);
      if (description) textFrag.appendChild(description);
      cells.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-trend", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse4(element, { document }) {
    const cardDivs = Array.from(element.querySelectorAll(":scope > div.utility-aspect-1x1, :scope > div"));
    const cells = [];
    cardDivs.forEach((cardDiv) => {
      const img = cardDiv.querySelector("img");
      if (!img) return;
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      imageFrag.appendChild(img);
      const textFrag = document.createDocumentFragment();
      cells.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".navbar",
        "footer.footer",
        "link",
        "noscript"
      ]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var H2 = { after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const template = payload && payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectorList = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectorList) {
          sectionEl = element.querySelector(sel);
          if (!sectionEl) {
            const stripped = sel.replace(/^main\s*>\s*/, ":scope > ");
            if (stripped !== sel) sectionEl = element.querySelector(stripped);
          }
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (i > 0 && sectionEl.previousElementSibling) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-fashion-trends-page.js
  var PAGE_TEMPLATE = {
    name: "fashion-trends-page",
    description: "Fashion trends content page with hero banner, featured article, trend cards, photo gallery, and bottom CTA",
    urls: [
      "https://www.wknd-trendsetters.site/fashion-trends-of-the-season"
    ],
    blocks: [
      {
        name: "hero-banner",
        instances: ["header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl"]
      },
      {
        name: "columns-article",
        instances: ["section#trends .grid-layout.tablet-1-column.grid-gap-lg"]
      },
      {
        name: "cards-trend",
        instances: ["main > section.section:nth-of-type(2) .grid-layout.desktop-3-column.tablet-1-column"]
      },
      {
        name: "cards-gallery",
        instances: ["main > section.section:nth-of-type(3) .grid-layout.desktop-3-column.tablet-2-column-1"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: "secondary",
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Trend Alert",
        selector: "section#trends",
        style: null,
        blocks: ["columns-article"],
        defaultContent: [".utility-text-align-center h2.h2-heading", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-3",
        name: "Trends",
        selector: "main > section.section:nth-of-type(2)",
        style: "secondary",
        blocks: ["cards-trend"],
        defaultContent: [".utility-text-align-center h2.h2-heading"]
      },
      {
        id: "section-4",
        name: "Gallery",
        selector: "main > section.section:nth-of-type(3)",
        style: null,
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center.utility-margin-bottom-8rem h2.h2-heading", ".utility-text-align-center.utility-margin-bottom-8rem .paragraph-lg"]
      },
      {
        id: "section-5",
        name: "Bottom CTA",
        selector: "section.section.accent-section",
        style: "accent",
        blocks: [],
        defaultContent: [".utility-text-align-center h2.h2-heading", ".utility-text-align-center .paragraph-lg", ".utility-text-align-center .button-group"]
      }
    ]
  };
  var parsers = {
    "hero-banner": parse,
    "columns-article": parse2,
    "cards-trend": parse3,
    "cards-gallery": parse4
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_fashion_trends_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_fashion_trends_page_exports);
})();
