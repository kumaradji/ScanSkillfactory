// utils.js
/**
 * Utility functions to assist with HTML content manipulation.
 */

/**
 * Decodes HTML entities into their string representation.
 *
 * @param {string} html - The HTML string with entities to decode.
 * @returns {string} The decoded string.
 */
export const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

/**
 * Cleans HTML content by decoding HTML entities and stripping HTML tags.
 *
 * @param {string} htmlContent - The HTML content to clean.
 * @returns {string} The cleaned text content without HTML tags.
 */
export const cleanHtmlContent = (htmlContent) => {
  const decodedHtml = decodeHtml(htmlContent);
  // Remove HTML tags from the content
  const cleanedContent = decodedHtml.replace(/(<([^>]+)>)/gi, "");
  return cleanedContent;
};