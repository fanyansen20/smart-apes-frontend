/**
 *
 * @param {string} value
 * @returns
 */

export const convertToKebabCase = (value) => {
  return value.toLowerCase().replace(/\s+/g, "-");
};
