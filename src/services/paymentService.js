import { ordersList } from '../utils/mockOrdersList';
import { handleRequest } from './requestHandler';

/**
 * Payment Service - Handles payment verification and screenshot uploads
 * 
 * FUTURE API ENDPOINTS:
 * GET /api/payments/pending
 * POST /api/orders/:id/payment-screenshot
 * PATCH /api/orders/:id/payment-status
 */

export const uploadPaymentScreenshot = async (orderId, file) => {
  return handleRequest(async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return a mock success response with the object URL for local preview
    return Promise.resolve({
      success: true,
      paymentScreenshotUrl: URL.createObjectURL(file)
    });
  });
};

export const getPendingPayments = async () => 
  handleRequest(async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const pending = (ordersList || []).filter(o => o.paymentStatus === "Pending Verification");
    return Promise.resolve(pending);
  });

export const updatePaymentStatus = async (orderId, status) =>
  handleRequest(async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // In a real app, this would be an API call
    return Promise.resolve({ success: true, orderId, status });
  });
