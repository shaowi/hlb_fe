export function formatToCurrency(amount) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function convertToLocalCurrency(amount) {
  return parseFloat(amount) + 1000;
}
