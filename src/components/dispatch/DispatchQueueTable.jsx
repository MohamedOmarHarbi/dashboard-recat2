import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import { safeMap } from '../../utils/safeMap';
import StatusBadge from '../ui/StatusBadge';
import { cn } from '../../utils/cn';

const DispatchQueueTable = ({ orders, drivers, onAssign, onReassign }) => {
  const { t } = useTranslation();

  const isOrderDelayed = (order) => {
    const now = new Date();
    const orderTime = new Date(order.createdAt || order.date);
    const diffMinutes = Math.floor((now - orderTime) / (1000 * 60));
    return order.status !== 'Delivered' && order.status !== 'Cancelled' && diffMinutes > 20;
  };

  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-border-soft text-text-muted">
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Order ID</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Customer / Vendor</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Driver</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Time In Queue</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {safeMap(orders, (order) => {
              const delayed = isOrderDelayed(order);
              const driver = drivers?.find(d => d.id === order.driverId);
              
              return (
                <tr 
                  key={order.id} 
                  className={cn(
                    "hover:bg-gray-50/50 transition-colors group",
                    delayed && "bg-rose-50/30 border-l-4 border-l-rose-500"
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-main">{order.id}</span>
                      {delayed && <AlertCircle className="w-3.5 h-3.5 text-rose-500 animate-pulse" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-text-main">{order.customer}</span>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">{order.vendorName || 'General Store'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {driver ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.name}`} alt="" className="w-full h-full rounded-full" />
                        </div>
                        <span className="font-medium text-text-main">{driver.name}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-rose-500 uppercase tracking-tighter">Waiting for Assign</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-text-muted font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {order.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-end">
                    {!order.driverId ? (
                      <button 
                        onClick={() => onAssign(order)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-sm hover:bg-primary-hover transition-all"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        Assign Driver
                      </button>
                    ) : (
                      <button 
                        onClick={() => onReassign(order)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border-soft text-text-main rounded-lg text-xs font-bold shadow-sm hover:bg-gray-50 transition-all"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reassign
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DispatchQueueTable;
