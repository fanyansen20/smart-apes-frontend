/**
 *
 * @param {{
 * arr : [{}]
 * key : string
 * comparison : string
 * }} props
 * @returns
 */
export function checkSameValueInArray({ arr, key, comparison }) {
  if (!arr || !key || !comparison) return;

  if (arr?.length === 0) return true;

  return arr.every((obj) => obj[key] !== comparison);
}

/**
 * @param {number} number
 * @param {string} currency
 *
 * @returns {string}
 */
export function formatCurrency(number, currency = "SGD") {
  const result = new Intl.NumberFormat("zh-SG", {
    style: "currency",
    currency: currency,
  }).format(number);
  return `S${result}`;
}

/**
 * @param {number} number
 * @param {string} currency
 *
 * @returns {string}
 */
export function mobileFormatCurrency(number, currency = "SGD") {
  return `S$ ${formatCurrency(number, currency).slice(2)}`;
}

export function checkValue(value) {
  if (value === "undefined" || !value) return "-";

  return value;
}

export function roundUpDiscountLessThanOne(discount) {
  if (discount < 1) {
    return 1;
  }

  return parseInt(discount);
}

export function isValidPhoneNumberType(inputString) {
  const parsedInputToNumber = Number(inputString);

  if (isNaN(parsedInputToNumber)) {
    return false;
  }

  return true;
}

export function convertSizeValue(size) {
  switch (size) {
    case "small":
      return "S";
    case "medium":
      return "M";
    case "large":
      return "L";
    case "extra-large":
      return "XL";
    default:
      break;
  }
}
