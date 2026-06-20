const isObject = (value) => {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return true;
  }
  return false;
};

/**
 *
 * @param {string} value
 * @returns
 */
export const isEmptyObject = (value) => {
  if (!isObject(value));
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
};
