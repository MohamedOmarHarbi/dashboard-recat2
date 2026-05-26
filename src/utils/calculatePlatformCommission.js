/**
 * Calculates platform commission from an order amount.
 * Default rate: 10% (0.10)
 */
export const calculatePlatformCommission = (orderAmount, rate = 0.10) => {
  if (!orderAmount || orderAmount <= 0) return 0;
  return parseFloat((orderAmount * rate).toFixed(2));
};
