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
