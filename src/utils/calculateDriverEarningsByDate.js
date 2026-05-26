/**
 * Calculates driver earnings for a specific date or range.
 * @param {Array} orders - List of driver-specific orders
 * @param {string} filterRange - The selected time range (today, yesterday, last7days)
 */
export const calculateDriverEarningsByFilter = (orders, filterRange = 'today') => {
  if (!Array.isArray(orders)) return 0;
  
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let filteredOrders = orders;

  if (filterRange === 'today') {
    filteredOrders = orders.filter(o => o.date === todayStr);
  } else if (filterRange === 'yesterday') {
    filteredOrders = orders.filter(o => o.date === yesterdayStr);
  } else if (filterRange === 'last7days') {
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);
    filteredOrders = orders.filter(o => new Date(o.date) >= lastWeek);
  }

  return filteredOrders
    .filter(o => o.status === 'Delivered')
    .reduce((sum, o) => sum + (o.driverFee || 0), 0);
};

export const getSettlementStats = (orders) => {
  if (!Array.isArray(orders)) return { paid: 0, unpaid: 0, cashPending: 0 };
  
  const delivered = orders.filter(o => o.status === 'Delivered');
  
  return {
    paidCount: delivered.filter(o => o.isPaid).length,
    unpaidCount: delivered.filter(o => !o.isPaid).length,
    cashPending: delivered.filter(o => !o.isPaid).reduce((sum, o) => sum + (o.amount || 0), 0),
    cashSettled: delivered.filter(o => o.isPaid).reduce((sum, o) => sum + (o.amount || 0), 0)
  };
};
