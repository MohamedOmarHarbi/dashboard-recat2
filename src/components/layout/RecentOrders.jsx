import React, { useState, useEffect } from 'react';
import DashboardCard from '../ui/DashboardCard';
import StatusBadge from '../ui/StatusBadge';
import { getOrders } from '../../services/ordersService';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RecentOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        // Just take the first 5 for "Recent"
        setOrdersData((data || []).slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch recent orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const actionButton = (
    <button className="text-sm text-primary font-medium hover:underline">
      {t('orders.viewAll')}
    </button>
  );

  if (!ordersData?.length) return null;

  return (
    <DashboardCard title={t('orders.recentOrders')} action={actionButton}>
      <div className="overflow-x-auto min-h-[300px] flex flex-col justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-2 py-10">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-text-muted">{t('orders.loading')}</p>
          </div>
        ) : !ordersData?.length ? null : (
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-text-muted border-b border-border-soft rtl:text-right">
                <th className="pb-3 font-semibold">{t('table.orderId')}</th>
                <th className="pb-3 font-semibold">{t('table.product')}</th>
                <th className="pb-3 font-semibold">{t('table.customer')}</th>
                <th className="pb-3 font-semibold">{t('table.price')}</th>
                <th className="pb-3 font-semibold">{t('table.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {(ordersData || []).map((order) => (
                <tr key={order?.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-medium text-text-main">{order?.id}</td>
                  <td className="py-4 text-text-main">
                    {typeof order?.productName === 'object' ? (order?.productName?.[i18n.language] || order?.productName?.en) : (order?.productName || order?.product)}
                  </td>
                  <td className="py-4 text-text-muted">
                    {typeof order?.customer === 'object' ? (order?.customer?.[i18n.language] || order?.customer?.en) : order?.customer}
                  </td>
                  <td className="py-4 font-semibold text-text-main">{order?.price}</td>
                  <td className="py-4">
                    <StatusBadge status={order?.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardCard>
  );
};

export default RecentOrders;
