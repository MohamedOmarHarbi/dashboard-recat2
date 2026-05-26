import { ordersList } from './mockOrdersList';
import { vendors } from './mockVendors';

/**
 * Calculates settlement data for a vendor.
 * Net Earnings = Order Amount - Platform Commission
 */
export const calculateVendorFinanceSummary = (vendorId) => {
  if (!vendorId) return { totalOrders: 0, totalCommission: 0, netEarnings: 0 };
  
  const vendor = vendors.find(v => v.id === vendorId);
  const commissionRate = vendor?.commissionRate || 0.10;
  
  const vendorOrders = (ordersList || []).filter(order => 
    order.vendorId === vendorId && 
    order.status === 'Delivered'
  );
  
  const totalOrdersAmount = vendorOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
  const totalCommission = parseFloat((totalOrdersAmount * commissionRate).toFixed(2));
  const netEarnings = parseFloat((totalOrdersAmount - totalCommission).toFixed(2));
  
  return {
    totalOrders: vendorOrders.length,
    totalSales: totalOrdersAmount,
    totalCommission,
    netEarnings
  };
};
