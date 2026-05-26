/**
 * Groups orders into dispatch-specific categories.
 * @param {Array} orders - List of orders
 * @returns {Object} - Grouped orders
 */
export const groupOrdersByDispatchStatus = (orders) => {
  const groups = {
    unassigned: [],
    readyForPickup: [],
    assigned: [],
    onDelivery: [],
    delayed: []
  };

  if (!orders || !Array.isArray(orders)) return groups;

  const now = new Date();
  const DELAY_THRESHOLD_MINUTES = 20;

  orders.forEach(order => {
    const orderTime = new Date(order.createdAt || order.date);
    const diffMinutes = Math.floor((now - orderTime) / (1000 * 60));
    
    // Check for delay (Not delivered and older than threshold)
    const isDelayed = order.status !== 'Delivered' && order.status !== 'Cancelled' && diffMinutes > DELAY_THRESHOLD_MINUTES;

    if (isDelayed) {
      groups.delayed.push(order);
    }

    if (!order.driverId) {
      groups.unassigned.push(order);
    } else if (order.status === 'Preparing') {
      groups.readyForPickup.push(order);
    } else if (order.status === 'Assigned') {
      groups.assigned.push(order);
    } else if (order.status === 'Picked Up' || order.status === 'On the way') {
      groups.onDelivery.push(order);
    }
  });

  return groups;
};
