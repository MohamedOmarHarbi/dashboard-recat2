import { handleRequest } from './requestHandler';

export const getFinanceData = async () => 
  handleRequest(async () => {
    // Return mock analytics data for the dashboard
    return Promise.resolve({
      totalRevenue: 54000,
      platformCommission: 5400,
      vendorPayouts: 48600,
      activeVendors: 12
    });
  });

export const getVendorsLedger = async () => 
  handleRequest(async () => {
    return Promise.resolve([
      { id: 1, name: "Buffalo Burger", sales: 12000, commission: 1200, net: 10800 },
      { id: 2, name: "Syrian House", sales: 8500, commission: 850, net: 7650 }
    ]);
  });
