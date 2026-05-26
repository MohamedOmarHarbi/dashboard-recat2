import { productsData } from '../utils/mockData';
import { categories as mockCategories } from '../utils/mockCategories';
import { handleRequest } from './requestHandler';
import { showGlobalSuccess } from '../contexts/ToastContext';

const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve([...(productsData || [])]);
  });

export const getTopSellingProducts = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve((productsData || []).slice(0, 4));
  });

export const getCategories = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve([...(mockCategories || [])]);
  });

export const getProductById = async (id) => 
  handleRequest(async () => {
    await simulateDelay();
    const product = (productsData || []).find(p => p?.id === parseInt(id));
    return product || null;
  });

export const addProduct = async (product) => 
  handleRequest(async () => {
    await simulateDelay(500);
    showGlobalSuccess('Product successfully added');
    return { success: true, data: product };
  });

export const deleteProduct = async (id) => 
  handleRequest(async () => {
    await simulateDelay(300);
    showGlobalSuccess('Product successfully deleted');
    return { success: true };
  });

export const updateProduct = async (product) => 
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess('Product successfully updated');
    return { success: true, data: product };
  });

export const addCategory = async (category) => 
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess('Category successfully created');
    return { success: true, data: category };
  });

export const updateCategory = async (category) =>
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess('Category successfully updated');
    return { success: true, data: category };
  });

export const deleteCategory = async (id) => 
  handleRequest(async () => {
    await simulateDelay(300);
    showGlobalSuccess('Category successfully deleted');
    return { success: true };
  });

export const toggleCategoryStatus = async (id) =>
  handleRequest(async () => {
    await simulateDelay(300);
    showGlobalSuccess('Category status updated');
    return { success: true };
  });

export const assignVendorsToCategory = async (categoryId, vendors) =>
  handleRequest(async () => {
    await simulateDelay(400);
    showGlobalSuccess('Vendors successfully assigned to category');
    return { success: true };
  });
