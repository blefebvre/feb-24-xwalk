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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const textDiv = element.querySelector(":scope > div:first-child");
    const heading = textDiv ? textDiv.querySelector("h1, h2") : null;
    const subheading = textDiv ? textDiv.querySelector("p.subheading, p") : null;
    const buttons = textDiv ? Array.from(textDiv.querySelectorAll(".button-group a, a.button")) : [];
    const imageGrid = element.querySelector(":scope > div:nth-child(2)");
    const image = imageGrid ? imageGrid.querySelector("img") : element.querySelector("img");
    const cells = [];
    if (image) {
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      imageFrag.appendChild(image);
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
      const breadcrumbs = col2Div.querySelector(".breadcrumbs");
      const heading = col2Div.querySelector("h2, h1");
      const authorInfo = col2Div.querySelector(":scope > div:last-child");
      if (breadcrumbs) col2Frag.appendChild(breadcrumbs);
      if (heading) col2Frag.appendChild(heading);
      if (authorInfo) col2Frag.appendChild(authorInfo);
    }
    const cells = [[col1Frag, col2Frag]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
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

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const tabPanes = Array.from(element.querySelectorAll(".tab-pane"));
    const tabButtons = Array.from(element.querySelectorAll(".tab-menu-link"));
    const cells = [];
    tabPanes.forEach((pane, index) => {
      const button = tabButtons[index];
      const titleFrag = document.createDocumentFragment();
      titleFrag.appendChild(document.createComment(" field:title "));
      if (button) {
        const nameEl = button.querySelector("strong");
        const titleText = nameEl ? nameEl.textContent.trim() : button.textContent.trim();
        titleFrag.appendChild(document.createTextNode(titleText));
      }
      const contentFrag = document.createDocumentFragment();
      const nameDiv = pane.querySelector(".paragraph-xl strong, strong");
      const nameText = nameDiv ? nameDiv.textContent.trim() : "";
      if (nameText) {
        contentFrag.appendChild(document.createComment(" field:content_heading "));
        const h3 = document.createElement("h3");
        h3.textContent = nameText;
        contentFrag.appendChild(h3);
      }
      const paneImage = pane.querySelector("img.cover-image, img");
      if (paneImage) {
        contentFrag.appendChild(document.createComment(" field:content_image "));
        contentFrag.appendChild(paneImage);
      }
      const roleDiv = pane.querySelector(".paragraph-xl + div, .paragraph-xl ~ div:not(.paragraph-xl)");
      const roleText = roleDiv && !roleDiv.querySelector("strong") ? roleDiv.textContent.trim() : "";
      const quote = pane.querySelector("p.paragraph-xl");
      if (roleText || quote) {
        contentFrag.appendChild(document.createComment(" field:content_richtext "));
        if (roleText) {
          const roleP = document.createElement("p");
          roleP.textContent = roleText;
          contentFrag.appendChild(roleP);
        }
        if (quote) {
          contentFrag.appendChild(quote);
        }
      }
      cells.push([titleFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const cards = Array.from(element.querySelectorAll(":scope > a.article-card, :scope > a.card-link"));
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img");
      const body = card.querySelector(".article-card-body");
      const tag = body ? body.querySelector(".tag") : null;
      const date = body ? body.querySelector(".paragraph-sm, .article-card-meta .paragraph-sm") : null;
      const heading = body ? body.querySelector("h3, h4, h2") : null;
      const imageFrag = document.createDocumentFragment();
      if (img) {
        imageFrag.appendChild(document.createComment(" field:image "));
        imageFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const href = card.getAttribute("href");
      if (heading && href) {
        const link = document.createElement("a");
        link.setAttribute("href", href);
        link.textContent = heading.textContent;
        const h = document.createElement(heading.tagName);
        h.appendChild(link);
        textFrag.appendChild(h);
      } else if (heading) {
        textFrag.appendChild(heading);
      }
      if (tag) {
        const p = document.createElement("p");
        p.textContent = tag.textContent;
        textFrag.appendChild(p);
      }
      if (date) {
        const p = document.createElement("p");
        p.textContent = date.textContent;
        textFrag.appendChild(p);
      }
      cells.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const faqItems = Array.from(element.querySelectorAll("details.faq-item, details"));
    const cells = [];
    faqItems.forEach((item) => {
      const summaryEl = item.querySelector("summary");
      const questionSpan = summaryEl ? summaryEl.querySelector("span") : null;
      const questionText = questionSpan ? questionSpan.textContent.trim() : summaryEl ? summaryEl.textContent.trim() : "";
      const summaryFrag = document.createDocumentFragment();
      if (questionText) {
        summaryFrag.appendChild(document.createComment(" field:summary "));
        summaryFrag.appendChild(document.createTextNode(questionText));
      }
      const answerDiv = item.querySelector(".faq-answer");
      const textFrag = document.createDocumentFragment();
      if (answerDiv) {
        textFrag.appendChild(document.createComment(" field:text "));
        while (answerDiv.firstChild) {
          textFrag.appendChild(answerDiv.firstChild);
        }
      }
      cells.push([summaryFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-cta.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector(":scope > img.cover-image, img.utility-overlay");
    const cardBody = element.querySelector(".card-body, .utility-text-on-overlay");
    const heading = cardBody ? cardBody.querySelector("h2, h1") : null;
    const description = cardBody ? cardBody.querySelector("p.subheading, p") : null;
    const buttons = cardBody ? Array.from(cardBody.querySelectorAll(".button-group a, a.button")) : [];
    const cells = [];
    if (bgImage) {
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      imageFrag.appendChild(bgImage);
      cells.push([imageFrag]);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    if (description) textFrag.appendChild(description);
    buttons.forEach((btn) => textFrag.appendChild(btn));
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-cta", cells });
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

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-banner": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-cta": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "WKND Trendsetters homepage with hero, featured article, image gallery, testimonials, article cards, FAQ, and bottom CTA",
    urls: [
      "https://wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "hero-banner",
        instances: [
          "header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl"
        ]
      },
      {
        name: "columns-article",
        instances: [
          "main > section.section:nth-of-type(1) .grid-layout.tablet-1-column.grid-gap-lg"
        ]
      },
      {
        name: "cards-gallery",
        instances: [
          "main > section.section:nth-of-type(2) .grid-layout.desktop-4-column"
        ]
      },
      {
        name: "tabs-testimonial",
        instances: [
          ".tabs-wrapper"
        ]
      },
      {
        name: "cards-article",
        instances: [
          "main > section.section:nth-of-type(4) .grid-layout.desktop-4-column"
        ]
      },
      {
        name: "accordion-faq",
        instances: [
          ".faq-list"
        ]
      },
      {
        name: "hero-cta",
        instances: [
          "section.section.inverse-section .utility-position-relative"
        ]
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
        name: "Featured Article",
        selector: "main > section.section:nth-of-type(1)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "main > section.section:nth-of-type(2)",
        style: "secondary",
        blocks: ["cards-gallery"],
        defaultContent: [
          ".utility-text-align-center h2",
          ".utility-text-align-center .paragraph-lg"
        ]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section.section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section.section:nth-of-type(4)",
        style: "secondary",
        blocks: ["cards-article"],
        defaultContent: [
          ".utility-text-align-center h2",
          ".utility-text-align-center .paragraph-lg"
        ]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section.section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [
          "h2.h2-heading",
          "p.subheading"
        ]
      },
      {
        id: "section-7",
        name: "Bottom CTA",
        selector: "section.section.inverse-section",
        style: null,
        blocks: ["hero-cta"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    transform2
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
  var import_homepage_default = {
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
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
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
  return __toCommonJS(import_homepage_exports);
})();
