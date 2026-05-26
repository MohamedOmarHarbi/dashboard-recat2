import { drivers as mockDrivers } from '../utils/mockDrivers';
import { handleRequest } from './requestHandler';
import { showGlobalSuccess } from '../contexts/ToastContext';

const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getDrivers = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve([...(mockDrivers || [])]);
  });

export const getDriverById = async (id) => 
  handleRequest(async () => {
    await simulateDelay();
    const driver = (mockDrivers || []).find(d => d.id === parseInt(id));
    return Promise.resolve(driver || null);
  });

/**
 * Updates the connectivity status of a driver.
 * Prepared for: PATCH /api/drivers/:id/online-status
 */
export const updateDriverOnlineStatus = async (id, isOnline) => 
  handleRequest(async () => {
    await simulateDelay(200);
    showGlobalSuccess(`Driver is now ${isOnline ? 'Online' : 'Offline'}`);
    return { success: true, id, isOnline };
  });

/**
 * Assigns an order to a driver and updates their active tasks.
 * Prepared for: POST /api/drivers/:id/assign-order
 */
export const assignOrderToDriver = async (driverId, orderId) => 
  handleRequest(async () => {
    await simulateDelay(500);
    // Logic: driver.activeOrderId = orderId
    showGlobalSuccess(`Order ${orderId} assigned to driver successfully`);
    return { success: true, driverId, orderId };
  });

/**
 * Admin-only: Creates a new driver account with authentication.
 * Prepared for: POST /api/drivers
 */
export const createDriverAccount = async (driverData) => 
  handleRequest(async () => {
    await simulateDelay(800);
    showGlobalSuccess("Driver account created successfully");
    const newDriver = {
      id: Math.floor(Math.random() * 10000),
      ...driverData,
      isOnline: false,
      activeOrderId: null,
      accountStatus: "Active",
      rating: 5.0,
      totalCompletedOrders: 0
    };
    return Promise.resolve(newDriver);
  });

/**
 * Placeholder for driver mobile app authentication.
 * Prepared for: POST /api/drivers/login
 */
export const driverLogin = async (email, password) => 
  handleRequest(async () => {
    await simulateDelay(1000);
    // Mock authentication logic
    return Promise.resolve({ success: true, token: "mock-driver-jwt" });
  });

// Backward compatibility or for generic onboarding
export const addDriver = createDriverAccount;
