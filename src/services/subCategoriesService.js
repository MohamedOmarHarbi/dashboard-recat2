import { subCategories as mockSubCategories } from '../utils/mockSubCategories';
import { handleRequest } from './requestHandler';
import { showGlobalSuccess } from '../contexts/ToastContext';

const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getSubCategories = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve([...(mockSubCategories || [])]);
  });

export const addSubCategory = async (subCategory) => 
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess('Sub-category successfully created');
    return { success: true, data: subCategory };
  });

export const updateSubCategory = async (subCategory) => 
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess('Sub-category successfully updated');
    return { success: true, data: subCategory };
  });

export const deleteSubCategory = async (id) => 
  handleRequest(async () => {
    await simulateDelay(300);
    showGlobalSuccess('Sub-category successfully deleted');
    return { success: true };
  });

export const toggleSubCategoryStatus = async (id) =>
  handleRequest(async () => {
    await simulateDelay(200);
    showGlobalSuccess('Sub-category status updated');
    return { success: true };
  });
