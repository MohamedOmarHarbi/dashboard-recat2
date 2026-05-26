import { handleRequest } from './requestHandler';

export const getPaymentsReview = async () => 
  handleRequest(async () => {
    // Mock payments awaiting review
    return Promise.resolve([
      { id: "PAY-1001", orderId: "#ORD-10235", customer: "Sarah Ali", amount: 85.50, status: "Pending Verification", screenshot: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=600&fit=crop" },
      { id: "PAY-1002", orderId: "#ORD-10236", customer: "John Doe", amount: 210.00, status: "Pending Verification", screenshot: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=600&fit=crop" }
    ]);
  });

export const verifyPayment = async (id, status) => 
  handleRequest(async () => {
    return Promise.resolve({ success: true, id, status });
  });
