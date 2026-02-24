/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-cta variant. Base: hero.
 * Source: https://wknd-trendsetters.site/
 * Selector: section.section.inverse-section .utility-position-relative
 * Model fields: image (reference), imageAlt (collapsed), text (richtext)
 */
export default function parse(element, { document }) {
  // Background image is the first img inside the container
  const bgImage = element.querySelector(':scope > img.cover-image, img.utility-overlay');

  // Text content is in .card-body
  const cardBody = element.querySelector('.card-body, .utility-text-on-overlay');
  const heading = cardBody ? cardBody.querySelector('h2, h1') : null;
  const description = cardBody ? cardBody.querySelector('p.subheading, p') : null;
  const buttons = cardBody ? Array.from(cardBody.querySelectorAll('.button-group a, a.button')) : [];

  const cells = [];

  // Row 1: image field (background image)
  if (bgImage) {
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(' field:image '));
    imageFrag.appendChild(bgImage);
    cells.push([imageFrag]);
  }

  // Row 2: text field (richtext - heading + description + CTAs)
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (description) textFrag.appendChild(description);
  buttons.forEach((btn) => textFrag.appendChild(btn));
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-cta', cells });
  element.replaceWith(block);
}
