/**
 * Calculate total vendor earnings from a list of orders.
 * Earnings are the sum of vendorAmount.
 * @param {Array} orders - List of orders
 * @param {string} dateFilter - Optional date string (YYYY-MM-DD)
 * @returns {number} - Total earnings
 */
export const calculateVendorsRevenue = (orders, dateFilter = null) => {
  if (!orders || !Array.isArray(orders)) return 0;
  
  return orders.reduce((total, order) => {
    if (dateFilter && order.date !== dateFilter) return total;
    
    // Only include successful orders (Delivered)
    if (order.status !== 'Delivered') return total;
    
    return total + (parseFloat(order.vendorAmount) || 0);
  }, 0);
};
