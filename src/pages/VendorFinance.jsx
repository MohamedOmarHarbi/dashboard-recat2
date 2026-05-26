import React, { useState, useEffect } from 'react';
import { 
  DollarSign, ShoppingCart, Percent, TrendingUp, 
  ArrowUpRight, Download, Calendar, Store, Wallet,
  Loader2, Search
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { vendors } from '../utils/mockVendors';
import { calculateVendorFinanceSummary } from '../utils/calculateVendorSettlement';
import { safeMap } from '../utils/safeMap';

const VendorFinance = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredVendors = vendors?.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMarketStats = vendors.reduce((acc, v) => {
    const summary = calculateVendorFinanceSummary(v.id);
    return {
      sales: acc.sales + summary.totalSales,
      commission: acc.commission + summary.totalCommission,
      payouts: acc.payouts + summary.netEarnings
    };
  }, { sales: 0, commission: 0, payouts: 0 });

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-black text-text-muted uppercase tracking-widest">{t('vendors.loading')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-8 rounded-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="relative z-10 space-y-2">
          <h1 className="text-3xl font-black tracking-tight">{t('finance.title')}</h1>
          <p className="text-slate-400 text-sm font-medium">{t('finance.desc')}</p>
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all font-bold text-xs backdrop-blur-md">
            <Calendar className="w-4 h-4" />
            {t('customers_module.today') || "Current Period"}
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg transition-all font-bold text-xs">
            <Download className="w-4 h-4" />
            {t('finance.payoutReport') || "Payout Report"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label={t('finance.marketSales')} 
          value={`EGP ${totalMarketStats.sales.toLocaleString()}`} 
          icon={ShoppingCart} 
          trend="+12.5%" 
          color="bg-blue-500" 
        />
        <StatCard 
          label={t('finance.platformCommission')} 
          value={`EGP ${totalMarketStats.commission.toLocaleString()}`} 
          icon={Percent} 
          trend="+8.2%" 
          color="bg-indigo-500" 
        />
        <StatCard 
          label={t('finance.vendorPayouts')} 
          value={`EGP ${totalMarketStats.payouts.toLocaleString()}`} 
          icon={Wallet} 
          trend="+15.1%" 
          color="bg-emerald-500" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-soft bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-black text-text-main flex items-center gap-2">
            <Store className="w-5 h-5 text-primary" />
            {t('finance.ledger')}
          </h3>
          <div className="relative w-full md:max-w-xs group">
            <Search className="w-4 h-4 absolute inset-y-0 start-3.5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder={t('finance.searchVendors')}
              className="w-full ps-10 pe-4 py-2 bg-white border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-border-soft text-text-muted uppercase text-[10px] font-black tracking-widest">
                <th className="px-6 py-4 text-start">{t('vendors.title')}</th>
                <th className="px-6 py-4 text-center">{t('finance.commissionRate')}</th>
                <th className="px-6 py-4 text-center">{t('orders.title')}</th>
                <th className="px-6 py-4 text-center">{t('finance.grossSales')}</th>
                <th className="px-6 py-4 text-center">{t('finance.platformCommission')}</th>
                <th className="px-6 py-4 text-end">{t('finance.netPayout')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {safeMap(filteredVendors, (vendor) => {
                const summary = calculateVendorFinanceSummary(vendor.id);
                return (
                  <tr key={vendor.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-border-soft overflow-hidden">
                          <img src={vendor.logo} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-text-main">{vendor.name}</p>
                          <p className="text-[10px] text-text-muted font-bold">{vendor.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg font-black text-[10px] border border-amber-100 uppercase">
                        {(vendor.commissionRate * 100).toFixed(0)}% Fee
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-text-main">
                      {summary.totalOrders}
                    </td>
                    <td className="px-6 py-4 text-center font-black text-text-main">
                      EGP {summary.totalSales.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center font-black text-rose-500">
                      - EGP {summary.totalCommission.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-end">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl font-black text-xs border border-emerald-100">
                        EGP {summary.netEarnings.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm space-y-4">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl text-white ${color} shadow-lg shadow-current/20`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-tighter">
        <ArrowUpRight className="w-3 h-3" />
        {trend}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-2xl font-black text-text-main">{value}</h4>
    </div>
  </div>
);

export default VendorFinance;
