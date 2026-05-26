import React from 'react';
import { DollarSign, Truck, Store, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StatCard = ({ label, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm flex items-center gap-4">
    <div className={`p-4 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-text-muted">{label}</p>
      <p className="text-2xl font-black text-text-main mt-1">{value}</p>
    </div>
  </div>
);

const FinanceSummaryCards = ({ data }) => {
  const { t } = useTranslation();
  
  const stats = [
    {
      id: 'platform',
      label: t('settlement.platformRevenue') || 'Platform Revenue Today',
      value: `EGP ${data?.platformRevenueToday?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      colorClass: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'drivers',
      label: t('settlement.driverEarnings') || 'Drivers Earnings Today',
      value: `EGP ${data?.driversEarningsToday?.toFixed(2) || '0.00'}`,
      icon: Truck,
      colorClass: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 'vendors',
      label: t('settlement.vendorEarnings') || 'Vendors Earnings Today',
      value: `EGP ${data?.vendorsEarningsToday?.toFixed(2) || '0.00'}`,
      icon: Store,
      colorClass: 'bg-amber-50 text-amber-600'
    },
    {
      id: 'pending',
      label: t('settlement.pendingSettlements') || 'Pending Settlements',
      value: data?.pendingSettlementsCount || 0,
      icon: Clock,
      colorClass: 'bg-rose-50 text-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
};

export default FinanceSummaryCards;
