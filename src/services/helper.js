/**
 * The `formatToCurrency` function takes an amount and returns it formatted as a currency with two decimal places and
 * commas for thousands separators.
 * @param amount - The `amount` parameter is a number that represents a monetary value.
 * @returns a formatted string representation of the given amount as a currency value.
 */
export function formatToCurrency(amount) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// TODO: Update this function later with rate taken from API
export function convertToLocalCurrency(amount) {
  return parseFloat(amount) + 0.5;
}

/**
 * The `toCamelCase` function converts a string to camel case by removing spaces and capitalizing the first letter of each
 * word except the first one.
 * @param str - The `str` parameter is a string that you want to convert to camel case.
 * @returns a camel case version of the input string.
 */
export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * The function `mapNullValuesToEmptyString` takes an object as input and returns a new object with any null values
 * replaced by empty strings.
 * @param obj - The `obj` parameter is an object that contains key-value pairs.
 * @returns a new object where any null values in the input object are replaced with an empty string.
 */
export function mapNullValuesToEmptyString(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = obj[key] === null ? '' : obj[key];
    return acc;
  }, {});
}
