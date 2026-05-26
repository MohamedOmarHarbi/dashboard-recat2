import { ordersList } from '../utils/mockOrdersList';
import { getOrderDetails } from '../utils/mockOrderDetails';
import { handleRequest } from './requestHandler';
import { showGlobalSuccess } from '../contexts/ToastContext';

const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getOrders = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve([...(ordersList || [])] || []);
  });

export const getOrderById = async (id) => 
  handleRequest(async () => {
    await simulateDelay();
    return getOrderDetails(id) || null;
  });

/**
 * Fetches all orders associated with a specific driver.
 */
export const getOrdersByDriver = async (driverId) => 
  handleRequest(async () => {
    await simulateDelay(400);
    const driverOrders = (ordersList || []).filter(o => o.driverId === parseInt(driverId));
    return Promise.resolve([...driverOrders]);
  });

export const updateOrderStatus = async (id, status) => 
  handleRequest(async () => {
    await simulateDelay();
    showGlobalSuccess(`Order ${id} status updated to ${status}`);
    return { success: true };
  });

/**
 * Updates the settlement status of an order.
 * Admin-only settlement control.
 */
export const updateOrderPaidStatus = async (id, isPaid) => 
  handleRequest(async () => {
    await simulateDelay(300);
    showGlobalSuccess(`Order ${id} marked as ${isPaid ? 'paid' : 'unpaid'} successfully`);
    return { success: true, id, isPaid };
  });

/**
 * Updates the assigned driver for an order.
 * Essential for the Dispatch Queue module.
 */
export const updateOrderDriver = async (orderId, driverId) => 
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess(`Order ${orderId} assigned to driver successfully`);
    return { success: true, orderId, driverId };
  });

export const deleteOrders = async (ids) => 
  handleRequest(async () => {
    await simulateDelay();
    showGlobalSuccess(`${(ids || []).length} orders successfully deleted`);
    return { success: true };
  });

export const exportOrders = async () => 
  handleRequest(async () => {
    await simulateDelay(500);
    showGlobalSuccess('Orders successfully exported to CSV');
    return { success: true };
  });

export const getOrdersStats = async (data = ordersList) => 
  handleRequest(async () => {
    await simulateDelay(100);
    const safeData = Array.isArray(data) ? data : [];
    const totalOrders = safeData.length;
    const deliveredCount = safeData.filter(o => o?.status === 'Delivered').length;
    const pendingCount = safeData.filter(o => o?.status === 'Pending').length;
    const processingCount = safeData.filter(o => o?.status === 'Processing').length;
    
    const totalRevenueSum = safeData.reduce((sum, order) => {
      const amount = typeof order?.amount === 'number' 
        ? order.amount 
        : parseFloat(String(order?.amount || '0').replace('$', '').replace(',', ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    return Promise.resolve({
      totalOrders: totalOrders || 0,
      deliveredCount: deliveredCount || 0,
      pendingCount: pendingCount || 0,
      processingCount: processingCount || 0,
      totalRevenueSum: totalRevenueSum || 0
    } || {});
  });

export const updateOrder = async (order) => 
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess(`Order ${order?.id} successfully updated`);
    return { success: true, data: order };
  });
