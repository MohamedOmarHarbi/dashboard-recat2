import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { safeMap } from '../../utils/safeMap';
import { Link } from 'react-router-dom';

const UnpaidOrdersPanel = ({ orders }) => {
  const { t } = useTranslation();
  
  const unpaidOrders = orders?.filter(o => !o.isPaid && o.status === 'Delivered') || [];

  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">{t('settlement.unsettledOrders') || 'Unsettled Orders'}</h3>
            <p className="text-xs text-text-muted mt-0.5">{unpaidOrders.length} orders awaiting cash collection</p>
          </div>
        </div>
        <Link to="/orders" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {unpaidOrders.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-text-muted font-medium italic">No pending settlements. All clear!</p>
          </div>
        ) : (
          safeMap(unpaidOrders.slice(0, 5), (order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-page-bg rounded-xl border border-border-soft hover:border-primary/40 transition-colors group">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{order.id}</span>
                <span className="text-xs text-text-muted mt-1">{order.customer} • {order.date}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-text-main">EGP {parseFloat(order.amount).toFixed(2)}</span>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mt-1">{order.paymentMethod}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UnpaidOrdersPanel;
