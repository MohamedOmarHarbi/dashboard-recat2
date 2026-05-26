import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, CheckCircle, XCircle, Eye, Loader2 } from 'lucide-react';
import { getPaymentsReview, verifyPayment } from '../services/paymentsService';
import { useToast } from '../contexts/ToastContext';
import { safeMap } from '../utils/safeMap';

const PaymentsReview = () => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await getPaymentsReview();
      setPayments(data || []);
    } catch (err) {
      showError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id, status) => {
    try {
      await verifyPayment(id, status);
      showSuccess(`Payment ${status === 'Verified' ? 'Approved' : 'Rejected'}`);
      setPayments(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      showError("Verification failed");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm flex items-center gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-xl">
          <CreditCard className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-text-main tracking-tight">{t('payments.title') || "Payments Review"}</h1>
          <p className="text-sm text-text-muted mt-0.5 font-medium">{t('payments.desc') || "Verify manual payment screenshots"}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-bold text-text-muted">{t('orders_module.loading')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-border-soft text-text-muted">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Payment ID</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Order / Customer</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Amount</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {safeMap(payments, (payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-text-main">{payment.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-text-main">{payment.orderId}</span>
                        <span className="text-xs text-text-muted">{payment.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-text-main">EGP {payment.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-end">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Screenshot">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleVerify(payment.id, 'Verified')}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleVerify(payment.id, 'Rejected')}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <XCircle className="w-4 h-4" />
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
    </div>
  );
};

export default PaymentsReview;
