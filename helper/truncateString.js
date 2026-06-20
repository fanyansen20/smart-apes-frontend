/**
 *
 * @param {string} text
 * @param {number} len
 * @returns {string}
 */

export function truncateString(text, len) {
  return text.length >= len ? text?.substring(0, len) + " ..." : text;
}
