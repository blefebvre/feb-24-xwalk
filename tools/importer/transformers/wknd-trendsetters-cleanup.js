/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Selectors from captured DOM of https://wknd-trendsetters.site/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove skip link (found: a.skip-link)
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }
  if (hookName === H.after) {
    // Remove non-authorable content from captured DOM:
    // - .navbar (site navigation bar)
    // - footer.footer (site footer)
    // - link elements
    // - noscript elements
    WebImporter.DOMUtils.remove(element, [
      '.navbar',
      'footer.footer',
      'link',
      'noscript',
    ]);
  }
}
