import React, { useState, useEffect } from 'react';
import { Package, CheckCircle, Clock, RefreshCcw, DollarSign, Loader2 } from 'lucide-react';
import { getOrdersStats } from '../../services/ordersService';

const OrdersStats = ({ orders }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orders) return;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getOrdersStats(orders);
        const formattedStats = [
          { label: 'Total Orders', value: data.totalOrders, icon: Package },
          { label: 'Delivered', value: data.deliveredCount, icon: CheckCircle },
          { label: 'Pending', value: data.pendingCount, icon: Clock },
          { label: 'Processing', value: data.processingCount, icon: RefreshCcw },
          { label: 'Total Revenue', value: `$${data.totalRevenueSum.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: DollarSign },
        ];
        setStats(formattedStats);
      } catch (error) {
        console.error("Failed to fetch order stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [orders]);

  if (!orders) return null;

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white border border-border-soft rounded-xl p-4 flex items-center justify-center h-24 animate-pulse">
            <Loader2 className="w-5 h-5 text-primary/20 animate-spin" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats?.map((stat, idx) => (
        <div key={idx} className="bg-white border border-border-soft rounded-xl p-4 flex flex-col shadow-sm transition-all hover:shadow-md">
          <stat.icon className="w-5 h-5 text-primary mb-2" />
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{stat.label}</span>
          <span className="text-lg font-bold text-text-main mt-1">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

export default OrdersStats;
