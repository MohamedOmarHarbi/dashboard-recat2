import { ordersList } from './mockOrdersList';

/**
 * Calculates total driver earnings for the current day.
 * Filters by driverId and date (today).
 */
export const calculateDriverDailyEarnings = (driverId) => {
  if (!driverId) return 0;
  
  const today = new Date().toISOString().split('T')[0];
  
  return (ordersList || [])
    .filter(order => 
      order.driverId === driverId && 
      order.date === today && 
      order.status === 'Delivered'
    )
    .reduce((sum, order) => sum + (order.driverFee || 0), 0);
};

export const getCompletedOrdersCountToday = (driverId) => {
  if (!driverId) return 0;
  const today = new Date().toISOString().split('T')[0];
  
  return (ordersList || [])
    .filter(order => 
      order.driverId === driverId && 
      order.date === today && 
      order.status === 'Delivered'
    ).length;
};
