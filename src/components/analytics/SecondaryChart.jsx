import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DashboardCard from '../ui/DashboardCard';
import { getOrdersDistribution } from '../../services/analyticsService';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

const SecondaryChart = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrdersDistribution();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch distribution data:", error);
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
      <DashboardCard title={t('analytics.salesByCategory')}>
        <div className="h-80 w-full flex items-center justify-center text-text-muted text-sm">
          {t('analytics.noData')}
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title={t('analytics.salesByCategory')}>
      <div className="h-80 w-full mt-4 text-sm flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-xs text-text-muted">{t('analytics.loadingChart')}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECEEF2" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8A8F98' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8A8F98' }} />
              <Tooltip
                cursor={{ fill: '#F5F6F8' }}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #ECEEF2', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" fill="#E57373" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </DashboardCard>
  );
};

export default SecondaryChart;
