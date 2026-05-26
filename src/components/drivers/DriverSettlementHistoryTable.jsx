import React from 'react';
import { History, Calendar, Package, DollarSign, ArrowRight } from 'lucide-react';
import { safeMap } from '../../utils/safeMap';

const DriverSettlementHistoryTable = ({ settlements }) => {
  if (!settlements || settlements.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border-soft p-12 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
          <History className="w-8 h-8" />
        </div>
        <p className="text-text-muted font-bold">No settlement history found for this driver.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-5 border-b border-border-soft bg-gray-50/30 flex items-center justify-between">
        <h3 className="text-sm font-black text-text-main uppercase tracking-widest flex items-center gap-2">
          <History className="w-4 h-4 text-primary" />
          Shift Settlement History
        </h3>
        <span className="px-3 py-1 bg-white border border-border-soft rounded-lg text-[10px] font-black text-text-muted uppercase tracking-widest">
          {settlements.length} Records
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-border-soft text-text-muted uppercase text-[10px] font-black tracking-widest">
              <th className="px-6 py-4 text-start">Reconciliation Date</th>
              <th className="px-6 py-4 text-center">Orders Closed</th>
              <th className="px-6 py-4 text-center">Cash Reconciled</th>
              <th className="px-6 py-4 text-center">Agent Payout</th>
              <th className="px-6 py-4 text-end">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {safeMap(settlements, (record) => (
              <tr key={record.id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-bold text-text-main">
                    <Calendar className="w-4 h-4 text-text-muted" />
                    {record.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg font-black text-[10px]">
                    <Package className="w-3 h-3" />
                    {record.ordersSettled} Orders
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="font-black text-text-main">
                    EGP {record.totalAmount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-emerald-600 font-black">
                    <DollarSign className="w-3 h-3" />
                    {record.settlementFee.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-end">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full font-black text-[10px] uppercase tracking-widest">
                    Closed
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverSettlementHistoryTable;
