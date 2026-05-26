import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, Check, X, ImageIcon } from 'lucide-react';
import { getCustomers } from '../../services/customersService';
import { getPendingPayments, updatePaymentStatus } from '../../services/paymentService';
import PaymentStatusBadge from '../orders/PaymentStatusBadge';
import { useToast } from '../../contexts/ToastContext';
import { safeMap } from '../../utils/safeMap';

const CustomerPaymentsPanel = () => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [customers, pendingOrders] = await Promise.all([
        getCustomers(),
        getPendingPayments()
      ]);

      // Join data: match customer.id === order.customerId
      const joinedData = safeMap(pendingOrders, order => {
        const customer = (customers || []).find(c => c.id === order.customerId);
        return {
          ...order,
          customerName: customer?.name || order.customer || "Unknown",
          customerPhone: customer?.phone || "N/A"
        };
      });

      setData(joinedData);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      showError("Failed to load payment verification requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (orderId, status) => {
    try {
      await updatePaymentStatus(orderId, status);
      if (status === 'Verified') {
        showSuccess("Payment verified successfully");
      } else {
        showError("Payment rejected");
      }
      // Remove from list after action
      setData(prev => prev.filter(item => item.id !== orderId));
    } catch (error) {
      showError("Failed to update payment status");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-border-soft p-12 flex flex-col items-center justify-center gap-4 shadow-sm mb-8">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm font-medium text-text-muted">Loading verification queue...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border-soft shadow-sm overflow-hidden mb-8">
      <div className="p-5 border-b border-border-soft bg-gray-50/30">
        <h2 className="text-lg font-black text-text-main flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          Customers Payment Verification Queue
        </h2>
      </div>

      {!data?.length ? (
        <div className="py-12 text-center">
          <p className="text-text-muted font-medium italic">No pending payment screenshots to review</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="bg-gray-50 text-text-muted border-b border-border-soft">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Payment Screenshot</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {safeMap(data, (order) => (
                <tr key={order?.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-text-main">{order?.customerName}</td>
                  <td className="px-6 py-4 text-text-muted">{order?.customerPhone}</td>
                  <td className="px-6 py-4 font-medium text-text-main">{order?.id}</td>
                  <td className="px-6 py-4">
                    {order?.paymentScreenshotUrl ? (
                      <a 
                        href={order.paymentScreenshotUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-16 h-16 group relative"
                      >
                        <img
                          src={order.paymentScreenshotUrl}
                          className="w-16 h-16 object-cover rounded-lg border border-border-soft shadow-sm group-hover:opacity-75 transition-opacity"
                          alt="Payment Screenshot"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                          <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                      </a>
                    ) : (
                      <span className="text-xs text-text-muted italic">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <PaymentStatusBadge status={order?.paymentStatus} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleAction(order?.id, 'Verified')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg font-bold text-xs transition-all shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Confirm
                      </button>
                      <button 
                        onClick={() => handleAction(order?.id, 'Rejected')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs transition-all shadow-sm"
                      >
                        <X className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerPaymentsPanel;
