/**
 * Format a number as a USD currency string.
 *
 * @param {number} amount  — The numeric value to format.
 * @param {string} [currency='USD'] — ISO 4217 currency code.
 * @returns {string} Formatted price string, e.g. "$49.99"
 */
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
