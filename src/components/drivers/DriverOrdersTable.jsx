import React, { useState } from 'react';
import { Package, Calendar, DollarSign, CheckCircle, Loader2 } from 'lucide-react';
import OrderPaidStatusBadge from '../orders/OrderPaidStatusBadge';
import { updateOrderPaidStatus } from '../../services/ordersService';
import { safeMap } from '../../utils/safeMap';

const DriverOrdersTable = ({ orders, onUpdate }) => {
  const [loadingId, setLoadingId] = useState(null);

  const handleMarkAsPaid = async (orderId) => {
    setLoadingId(orderId);
    try {
      await updateOrderPaidStatus(orderId, true);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error updating payment status:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50/50 border-b border-border-soft text-text-muted uppercase text-[10px] font-black tracking-widest">
              <th className="px-6 py-4 text-start">Order ID</th>
              <th className="px-6 py-4 text-center">Date</th>
              <th className="px-6 py-4 text-center">Agent Fee</th>
              <th className="px-6 py-4 text-center">Settlement Status</th>
              <th className="px-6 py-4 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {safeMap(orders, (order) => (
              <tr key={order.id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-text-main">{order.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-text-muted font-bold text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {order.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1 text-emerald-600 font-black">
                    <DollarSign className="w-3 h-3" />
                    {order.driverFee?.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <OrderPaidStatusBadge isPaid={order.isPaid} />
                </td>
                <td className="px-6 py-4 text-end">
                  {!order.isPaid ? (
                    <button 
                      onClick={() => handleMarkAsPaid(order.id)}
                      disabled={loadingId === order.id}
                      className="px-4 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-emerald-100 flex items-center gap-2 ms-auto"
                    >
                      {loadingId === order.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      Mark as Paid
                    </button>
                  ) : (
                    <span className="text-[10px] font-black text-emerald-600/40 uppercase tracking-widest italic pe-4">Verified</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverOrdersTable;
