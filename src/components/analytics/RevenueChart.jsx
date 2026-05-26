import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DashboardCard from '../ui/DashboardCard';
import { getRevenueAnalytics } from '../../services/analyticsService';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

const RevenueChart = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRevenueAnalytics();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch revenue analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formattedData = (data || []).map(item => ({ 
    ...item, 
    name: item?.name ? (typeof item.name === 'object' ? item.name?.[i18n.language] : String(item.name)) : '??' 
  }));

  const chartData = formattedData;
  if (!chartData?.length) return null;
  if (!data?.length) return null;

  if (!loading && (!data || data.length === 0)) {
    return (
      <DashboardCard title={t('analytics.revenue')}>
        <div className="h-80 w-full flex items-center justify-center text-text-muted text-sm">
          {t('analytics.noData')}
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title={t('analytics.revenue')}>
      <div className="h-80 w-full mt-4 text-sm flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-xs text-text-muted">{t('analytics.loadingChart')}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#4f46e5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </DashboardCard>
  );
};

export default RevenueChart;
