import { revenueData, secondaryChartData } from '../utils/mockData';
import { analyticsData as mockAnalyticsData } from '../utils/mockAnalytics';
import { handleRequest } from './requestHandler';

const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getRevenueAnalytics = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve([...(revenueData || [])] || []);
  });

export const getOrdersDistribution = async () => 
  handleRequest(async () => {
    await simulateDelay();
    return Promise.resolve([...(secondaryChartData || [])] || []);
  });

/**
 * Fetches high-level dashboard analytics data.
 * Prepared for: GET /api/analytics/summary
 */
export const getAnalyticsData = async () => 
  handleRequest(async () => {
    await simulateDelay(600);
    return Promise.resolve({ ...mockAnalyticsData });
  });
