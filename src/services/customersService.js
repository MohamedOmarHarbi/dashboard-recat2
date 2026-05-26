import { customers as mockCustomers } from '../utils/mockCustomers';
import { handleRequest } from './requestHandler';
import { showGlobalSuccess } from '../contexts/ToastContext';

const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getCustomers = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve([...(mockCustomers || [])]);
  });

export const getCustomerById = async (id) => 
  handleRequest(async () => {
    await simulateDelay();
    const customer = (mockCustomers || []).find(c => c.id === parseInt(id));
    return Promise.resolve(customer || null);
  });

export const updateCustomerStatus = async (id, newStatus) => 
  handleRequest(async () => {
    await simulateDelay(200);
    const msg = newStatus === 'Active' ? 'activated' : 'blocked';
    showGlobalSuccess(`Customer successfully ${msg}`);
    return { success: true, status: newStatus };
  });

export const deleteCustomer = async (id) => 
  handleRequest(async () => {
    await simulateDelay(300);
    showGlobalSuccess('Customer successfully deleted');
    return { success: true };
  });
