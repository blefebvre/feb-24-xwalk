/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner variant. Base: hero.
 * Source: https://wknd-trendsetters.site/
 * Selector: header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl
 * Model fields: image (reference), imageAlt (collapsed), text (richtext)
 */
export default function parse(element, { document }) {
  // Text content is in the first direct child div
  const textDiv = element.querySelector(':scope > div:first-child');
  const heading = textDiv ? textDiv.querySelector('h1, h2') : null;
  const subheading = textDiv ? textDiv.querySelector('p.subheading, p') : null;
  const buttons = textDiv ? Array.from(textDiv.querySelectorAll('.button-group a, a.button')) : [];

  // Images are in the second direct child div (grid of images)
  const imageGrid = element.querySelector(':scope > div:nth-child(2)');
  const image = imageGrid ? imageGrid.querySelector('img') : element.querySelector('img');

  const cells = [];

  // Row 1: image field (single reference)
  if (image) {
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(' field:image '));
    imageFrag.appendChild(image);
    cells.push([imageFrag]);
  }

  // Row 2: text field (richtext - heading + subheading + CTAs)
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (subheading) textFrag.appendChild(subheading);
  buttons.forEach((btn) => textFrag.appendChild(btn));
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
