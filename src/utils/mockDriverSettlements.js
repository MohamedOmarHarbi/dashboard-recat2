/**
 * Historical record of driver shift settlements.
 * Stores totals and metadata for administrative review.
 */
export const mockDriverSettlements = [
  {
    id: 1,
    driverId: 1,
    driverName: "Mohamed Ali",
    date: "2026-04-20",
    ordersSettled: 1,
    totalAmount: 120,
    settlementFee: 15
  },
  {
    id: 2,
    driverId: 2,
    driverName: "Ahmed Harbi",
    date: "2026-04-26",
    ordersSettled: 1,
    totalAmount: 150,
    settlementFee: 18
  }
];

export const addSettlementRecord = (record) => {
  mockDriverSettlements.push({
    id: mockDriverSettlements.length + 1,
    ...record
  });
};
