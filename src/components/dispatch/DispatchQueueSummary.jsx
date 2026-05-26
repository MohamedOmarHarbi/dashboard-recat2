import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, UserMinus, Package, Truck, AlertCircle } from 'lucide-react';

const SummaryCard = ({ label, count, icon: Icon, colorClass }) => (
  <div className="bg-white p-5 rounded-2xl border border-border-soft shadow-sm flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-text-muted">{label}</p>
        <p className="text-2xl font-black text-text-main mt-1">{count}</p>
      </div>
    </div>
  </div>
);

const DispatchQueueSummary = ({ groups }) => {
  const { t } = useTranslation();

  const stats = [
    {
      label: 'Unassigned',
      count: groups?.unassigned?.length || 0,
      icon: UserMinus,
      colorClass: 'bg-indigo-50 text-indigo-600'
    },
    {
      label: 'Ready for Pickup',
      count: groups?.readyForPickup?.length || 0,
      icon: Package,
      colorClass: 'bg-amber-50 text-amber-600'
    },
    {
      label: 'Assigned',
      count: groups?.assigned?.length || 0,
      icon: Clock,
      colorClass: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'On Delivery',
      count: groups?.onDelivery?.length || 0,
      icon: Truck,
      colorClass: 'bg-emerald-50 text-emerald-600'
    },
    {
      label: 'Delayed',
      count: groups?.delayed?.length || 0,
      icon: AlertCircle,
      colorClass: 'bg-rose-50 text-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <SummaryCard key={i} {...stat} />
      ))}
    </div>
  );
};

export default DispatchQueueSummary;
