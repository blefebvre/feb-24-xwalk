/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-article variant. Base: columns.
 * Source: https://wknd-trendsetters.site/
 * Selector: main > section.section:nth-of-type(1) .grid-layout.tablet-1-column.grid-gap-lg
 * Model: columns/rows (no field hints for Columns blocks)
 */
export default function parse(element, { document }) {
  // Column 1: image (first direct child div containing img)
  const col1Div = element.querySelector(':scope > div:first-child');
  const image = col1Div ? col1Div.querySelector('img') : null;

  // Column 2: article metadata (second direct child div)
  const col2Div = element.querySelector(':scope > div:nth-child(2)');

  const col1Frag = document.createDocumentFragment();
  if (image) col1Frag.appendChild(image);

  const col2Frag = document.createDocumentFragment();
  if (col2Div) {
    // Extract all meaningful content: headings, paragraphs, buttons, breadcrumbs, author info
    const children = Array.from(col2Div.children);
    children.forEach((child) => {
      col2Frag.appendChild(child);
    });
  }

  // Columns: one row with N columns (no field hints needed)
  const cells = [[col1Frag, col2Frag]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
