import React from 'react';
import { useTranslation } from 'react-i18next';
import { safeMap } from '../../utils/safeMap';

const DriverFinanceTable = ({ drivers, orders }) => {
  const { t } = useTranslation();

  const driverStats = drivers?.map(driver => {
    const driverOrders = orders?.filter(o => o.driverId === driver.id && o.status === 'Delivered') || [];
    const totalEarnings = driverOrders.reduce((sum, o) => sum + (parseFloat(o.driverFee) || 0), 0);
    const paidAmount = driverOrders.filter(o => o.isPaid).reduce((sum, o) => sum + (parseFloat(o.driverFee) || 0), 0);
    const pendingAmount = totalEarnings - paidAmount;
    
    return {
      id: driver.id,
      name: driver.name,
      orderCount: driverOrders.length,
      paidAmount,
      pendingAmount,
      totalEarnings
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border-soft">
        <h3 className="text-lg font-bold text-text-main">{t('finance.driverPerformance') || 'Driver Performance Ledger'}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-border-soft text-text-muted">
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Driver Name</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Orders Completed</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Paid Amount</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Pending Amount</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Total Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {safeMap(driverStats, (stat) => (
              <tr key={stat.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-text-main">{stat.name}</td>
                <td className="px-6 py-4 text-text-muted">{stat.orderCount}</td>
                <td className="px-6 py-4 text-emerald-600 font-medium">EGP {stat.paidAmount.toFixed(2)}</td>
                <td className="px-6 py-4 text-amber-600 font-medium">EGP {stat.pendingAmount.toFixed(2)}</td>
                <td className="px-6 py-4 font-bold text-text-main">EGP {stat.totalEarnings.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverFinanceTable;
