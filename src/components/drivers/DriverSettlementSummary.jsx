import React from 'react';
import { Wallet, CheckCircle, Clock, DollarSign, ArrowUpRight } from 'lucide-react';

const DriverSettlementSummary = ({ stats }) => {
  const items = [
    { 
      label: 'Settled Tasks', 
      value: stats.paidCount, 
      icon: CheckCircle, 
      color: 'bg-emerald-50 text-emerald-600',
      sub: `EGP ${stats.cashSettled.toLocaleString()}`
    },
    { 
      label: 'Pending Tasks', 
      value: stats.unpaidCount, 
      icon: Clock, 
      color: 'bg-rose-50 text-rose-600',
      sub: `EGP ${stats.cashPending.toLocaleString()}`
    },
    { 
      label: 'Total Cash Expected', 
      value: `EGP ${(stats.cashSettled + stats.cashPending).toLocaleString()}`, 
      icon: DollarSign, 
      color: 'bg-indigo-50 text-indigo-600',
      sub: 'All-time collections'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-200 group-hover:text-primary transition-colors" />
          </div>
          <div>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">{item.label}</p>
            <h4 className="text-xl font-black text-text-main">{item.value}</h4>
            <div className="mt-2 text-xs font-bold text-text-muted/60">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DriverSettlementSummary;
