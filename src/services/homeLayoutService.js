import { homeLayout as mockHomeLayout } from '../utils/mockHomeLayout';
import { handleRequest } from './requestHandler';
import { showGlobalSuccess } from '../contexts/ToastContext';

const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getHomeLayout = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve({ ...mockHomeLayout });
  });

export const updateFeaturedCategories = async (categoryIds) => 
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess('Featured categories updated successfully');
    return { success: true, data: categoryIds };
  });

export const addBanner = async (banner) => 
  handleRequest(async () => {
    await simulateDelay(500);
    showGlobalSuccess('Banner added successfully');
    return { success: true, data: banner };
  });

export const updateBanner = async (banner) => 
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess('Banner updated successfully');
    return { success: true, data: banner };
  });

export const deleteBanner = async (id) => 
  handleRequest(async () => {
    await simulateDelay(300);
    showGlobalSuccess('Banner deleted successfully');
    return { success: true };
  });

export const toggleBannerStatus = async (id) =>
  handleRequest(async () => {
    await simulateDelay(200);
    showGlobalSuccess('Banner status updated');
    return { success: true };
  });
