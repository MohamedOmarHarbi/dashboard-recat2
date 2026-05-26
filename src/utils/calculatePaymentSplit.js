/**
 * Calculate the split between Cash and Online payments.
 * @param {Array} orders - List of orders
 * @param {string} dateFilter - Optional date string (YYYY-MM-DD)
 * @returns {Object} - { cashTotal, onlineTotal }
 */
export const calculatePaymentSplit = (orders, dateFilter = null) => {
  const result = {
    cashTotal: 0,
    onlineTotal: 0
  };

  if (!orders || !Array.isArray(orders)) return result;

  orders.forEach(order => {
    if (dateFilter && order.date !== dateFilter) return;
    
    // Only include successful orders (Delivered)
    if (order.status !== 'Delivered') return;

    const amount = parseFloat(order.amount) || 0;

    if (order.paymentMethod === 'Cash') {
      result.cashTotal += amount;
    } else {
      // Everything else (Credit Card, Bank Transfer, Apple Pay, etc.) is considered online
      result.onlineTotal += amount;
    }
  });

  return result;
};
