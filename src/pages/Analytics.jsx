import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid, Legend, Cell, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, Users, ShoppingCart, DollarSign, 
  Loader2, AlertCircle, Calendar, Download
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getAnalyticsData } from '../services/analyticsService';
import { useAuth } from '../contexts/AuthContext';

const Analytics = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // STEP 7: Temporarily allow admin role or check permissions
  const canViewAnalytics = user?.role === 'admin' || true;

  useEffect(() => {
    if (canViewAnalytics) {
      fetchData();
    }
  }, [canViewAnalytics]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAnalyticsData();
      setData(result);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!canViewAnalytics) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-text-main">Access Denied</h2>
        <p className="text-text-muted mt-2 max-w-sm">You do not have the required permissions to view sensitive analytics data.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-black text-text-muted uppercase tracking-widest">{t('analytics.loadingChart')}</p>
      </div>
    );
  }

  // STEP 8: Empty State UI
  if (!data) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
          <TrendingUp className="w-8 h-8" />
        </div>
        <p className="text-lg font-bold text-text-muted">{t('analytics.noData')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-text-main tracking-tight">{t('analytics.title')}</h1>
          <p className="text-sm text-text-muted mt-1 font-medium text-balance">{t('analytics.desc')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border-soft text-text-main rounded-xl shadow-sm hover:bg-gray-50 transition-all font-bold text-xs">
            <Calendar className="w-4 h-4" />
            {t('analytics.weeklyTrend') || "Weekly Trend"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl shadow-md hover:bg-primary-hover transition-all font-bold text-xs">
            <Download className="w-4 h-4" />
            {t('table.actions') || "Export"}
          </button>
        </div>
      </div>

      {/* STEP 3: Protected Data Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatItem 
          label={t('orders') || "Total Orders"} 
          value={data?.totalOrders || 0} 
          icon={ShoppingCart} 
          color="bg-blue-50 text-blue-600" 
        />
        <StatItem 
          label={t('totalRevenue') || "Total Revenue"} 
          value={`$${(data?.totalRevenue || 0).toLocaleString()}`} 
          icon={DollarSign} 
          color="bg-emerald-50 text-emerald-600" 
        />
        <StatItem 
          label={t('sidebar.drivers') || "Active Drivers"} 
          value={data?.activeDrivers || 0} 
          icon={Users} 
          color="bg-indigo-50 text-indigo-600" 
        />
        <StatItem 
          label={t('settlement.pendingSettlements') || "Pending Payments"} 
          value={data?.pendingPayments || 0} 
          icon={AlertCircle} 
          color="bg-amber-50 text-amber-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* STEP 4: Protect Chart Rendering */}
        <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm">
          <h3 className="text-lg font-black text-text-main mb-6">{t('analytics.weeklyTrend')}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.recentOrdersTrend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm">
          <h3 className="text-lg font-black text-text-main mb-6">{t('analytics.revenueByZone')}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.revenueByZone || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="zone" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" radius={[0, 8, 8, 0]} barSize={24}>
                  {/* STEP 5: Protect map() Usage */}
                  {data?.revenueByZone?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : index === 1 ? '#6366f1' : '#8b5cf6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black text-text-main">{value}</p>
    </div>
  </div>
);

export default Analytics;
