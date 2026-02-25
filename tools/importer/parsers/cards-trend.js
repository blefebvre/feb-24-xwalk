/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-trend variant. Base: cards.
 * Source: https://www.wknd-trendsetters.site/fashion-trends-of-the-season
 * Selector: main > section.section:nth-of-type(2) .grid-layout.desktop-3-column.tablet-1-column
 * Model: container with card items (image, text). Trend cards with image, heading, description.
 */
export default function parse(element, { document }) {
  // Each card is a direct child div containing image, heading, and description text
  // Source DOM: div > img.cover-image + h3.h4-heading + p.paragraph-sm
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  const cells = [];

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    const heading = cardDiv.querySelector('h3, h4, h2');
    const description = cardDiv.querySelector('p.paragraph-sm, p');

    // Column 1: image field
    const imageFrag = document.createDocumentFragment();
    if (img) {
      imageFrag.appendChild(document.createComment(' field:image '));
      imageFrag.appendChild(img);
    }

    // Column 2: text field (heading + description)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (heading) textFrag.appendChild(heading);
    if (description) textFrag.appendChild(description);

    cells.push([imageFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-trend', cells });
  element.replaceWith(block);
}
