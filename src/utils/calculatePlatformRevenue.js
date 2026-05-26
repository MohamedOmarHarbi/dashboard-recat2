/**
 * Calculate total platform revenue from a list of orders.
 * Revenue is the sum of platformCommission.
 * @param {Array} orders - List of orders
 * @param {string} dateFilter - Optional date string (YYYY-MM-DD)
 * @returns {number} - Total revenue
 */
export const calculatePlatformRevenue = (orders, dateFilter = null) => {
  if (!orders || !Array.isArray(orders)) return 0;
  
  return orders.reduce((total, order) => {
    // If dateFilter is provided, only include orders from that date
    if (dateFilter && order.date !== dateFilter) return total;
    
    // Only include successful orders (Delivered)
    if (order.status !== 'Delivered') return total;
    
    return total + (parseFloat(order.platformCommission) || 0);
  }, 0);
};
