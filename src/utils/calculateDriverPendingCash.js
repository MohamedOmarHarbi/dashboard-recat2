/**
 * Calculates the total cash amount currently held by a driver that hasn't been settled.
 * Targets only 'Delivered' orders where isPaid is false.
 */
export const calculateDriverPendingCash = (orders) => {
  if (!Array.isArray(orders)) return 0;
  
  return (orders || [])
    .filter(order => order.status === 'Delivered' && !order.isPaid)
    .reduce((sum, order) => sum + (order.amount || 0), 0);
};

export const calculateDriverFeesPending = (orders) => {
  if (!Array.isArray(orders)) return 0;
  
  return (orders || [])
    .filter(order => order.status === 'Delivered' && !order.isPaid)
    .reduce((sum, order) => sum + (order.driverFee || 0), 0);
};
