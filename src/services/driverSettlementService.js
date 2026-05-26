import { ordersList } from '../utils/mockOrdersList';
import { addSettlementRecord, mockDriverSettlements } from '../utils/mockDriverSettlements';
import { handleRequest } from './requestHandler';
import { showGlobalSuccess } from '../contexts/ToastContext';

const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches all unpaid/unsettled orders for a driver.
 */
export const getDriverUnpaidOrders = async (driverId) => 
  handleRequest(async () => {
    await simulateDelay(300);
    const unpaid = (ordersList || []).filter(o => o.driverId === parseInt(driverId) && !o.isPaid && o.status === 'Delivered');
    return Promise.resolve([...unpaid]);
  });

/**
 * Closes a driver's shift by settling all pending cash orders.
 */
export const closeDriverShift = async (driverId, driverName) => 
  handleRequest(async () => {
    await simulateDelay(800);
    const today = new Date().toISOString().split('T')[0];
    
    // Find orders to settle
    const ordersToSettle = (ordersList || []).filter(o => 
      o.driverId === parseInt(driverId) && !o.isPaid && o.status === 'Delivered'
    );

    if (ordersToSettle.length === 0) {
      throw new Error("No pending orders to settle for this driver.");
    }

    const totalAmount = ordersToSettle.reduce((sum, o) => sum + (o.amount || 0), 0);
    const totalFees = ordersToSettle.reduce((sum, o) => sum + (o.driverFee || 0), 0);

    // Update orders (simulate mutation)
    ordersToSettle.forEach(order => {
      order.isPaid = true;
      order.settlementDate = today;
    });

    // Save record
    addSettlementRecord({
      driverId: parseInt(driverId),
      driverName,
      date: today,
      ordersSettled: ordersToSettle.length,
      totalAmount,
      settlementFee: totalFees
    });

    showGlobalSuccess(`Driver ${driverName}'s shift closed successfully. EGP ${totalAmount} reconciled.`);
    return { success: true };
  });

/**
 * Fetches settlement history for a specific driver.
 */
export const getDriverSettlementHistory = async (driverId) =>
  handleRequest(async () => {
    await simulateDelay(200);
    return mockDriverSettlements.filter(s => s.driverId === parseInt(driverId));
  });
