import { vendors as mockVendors } from '../utils/mockVendors';
import { handleRequest } from './requestHandler';
import { showGlobalSuccess } from '../contexts/ToastContext';

const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getVendors = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve([...(mockVendors || [])]);
  });

export const addVendor = async (vendor) => 
  handleRequest(async () => {
    await simulateDelay(500);
    showGlobalSuccess('Vendor successfully added');
    return { success: true, data: vendor };
  });

export const updateVendor = async (vendor) => 
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess('Vendor updated successfully');
    return { success: true, data: vendor };
  });

export const deleteVendor = async (id) => 
  handleRequest(async () => {
    await simulateDelay(300);
    showGlobalSuccess('Vendor deleted successfully');
    return { success: true };
  });

export const toggleVendorStatus = async (id, newStatus) => 
  handleRequest(async () => {
    await simulateDelay(200);
    showGlobalSuccess(`Vendor status changed to ${newStatus}`);
    return { success: true, status: newStatus };
  });
