import React from 'react';
import { useTranslation } from 'react-i18next';
import { safeMap } from '../../utils/safeMap';

const VendorFinanceTable = ({ vendors, orders }) => {
  const { t } = useTranslation();

  const vendorStats = vendors?.map(vendor => {
    const vendorOrders = orders?.filter(o => o.vendorId === vendor.id && o.status === 'Delivered') || [];
    const commission = vendorOrders.reduce((sum, o) => sum + (parseFloat(o.platformCommission) || 0), 0);
    const netEarnings = vendorOrders.reduce((sum, o) => sum + (parseFloat(o.vendorAmount) || 0), 0);
    
    return {
      id: vendor.id,
      name: vendor.name,
      orderCount: vendorOrders.length,
      commission,
      netEarnings
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border-soft">
        <h3 className="text-lg font-bold text-text-main">{t('finance.ledger') || 'Vendor Settlement Ledger'}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-border-soft text-text-muted">
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Vendor Name</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Orders Count</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Platform Commission</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Vendor Net Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {safeMap(vendorStats, (stat) => (
              <tr key={stat.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-text-main">{stat.name}</td>
                <td className="px-6 py-4 text-text-muted">{stat.orderCount}</td>
                <td className="px-6 py-4 font-bold text-rose-600">EGP {stat.commission.toFixed(2)}</td>
                <td className="px-6 py-4 font-bold text-emerald-600">EGP {stat.netEarnings.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorFinanceTable;
