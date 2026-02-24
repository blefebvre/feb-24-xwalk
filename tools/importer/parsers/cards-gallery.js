/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gallery variant. Base: cards.
 * Source: https://wknd-trendsetters.site/
 * Selector: main > section.section:nth-of-type(2) .grid-layout.desktop-4-column
 * Model: container with card items (image, text). Image-only gallery cards.
 */
export default function parse(element, { document }) {
  // Each card is a direct child div with class utility-aspect-1x1 containing an img
  const cardDivs = Array.from(element.querySelectorAll(':scope > div.utility-aspect-1x1, :scope > div'));

  const cells = [];

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return;

    // Column 1: image field
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(' field:image '));
    imageFrag.appendChild(img);

    // Column 2: text field (empty for gallery cards - no hint for empty cells)
    const textFrag = document.createDocumentFragment();

    cells.push([imageFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
