import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, RefreshCw, Download } from 'lucide-react';

// Components
import FinanceSummaryCards from '../components/finance/FinanceSummaryCards';
import VendorFinanceTable from '../components/finance/VendorFinanceTable';
import DriverFinanceTable from '../components/finance/DriverFinanceTable';
import UnpaidOrdersPanel from '../components/finance/UnpaidOrdersPanel';
import DateFilter from '../components/common/DateFilter';

// Contexts
import { useToast } from '../contexts/ToastContext';

// Services/Utils
import { getOrders } from '../services/ordersService';
import { getVendors } from '../services/vendorsService';
import { getDrivers } from '../services/driversService';
import { calculatePlatformRevenue } from '../utils/calculatePlatformRevenue';
import { calculateDriversRevenue } from '../utils/calculateDriversRevenue';
import { calculateVendorsRevenue } from '../utils/calculateVendorsRevenue';

const FinanceDashboard = () => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [dateRange, setDateRange] = useState('today');

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    setLoading(true);
    try {
      const [ordersData, vendorsData, driversData] = await Promise.all([
        getOrders(),
        getVendors(),
        getDrivers()
      ]);
      
      setOrders(ordersData || []);
      setVendors(vendorsData || []);
      setDrivers(driversData || []);
      
      showSuccess(t('finance.dataUpdated') || 'Finance data updated');
    } catch (error) {
      console.error("Failed to fetch finance data:", error);
      showError('Failed to sync financial records');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    return orders?.filter(order => {
      if (dateRange === 'today') return order.date === today;
      if (dateRange === 'yesterday') return order.date === yesterday;
      if (dateRange === 'last7days') {
        const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
        return new Date(order.date) >= sevenDaysAgo;
      }
      return true; // All
    });
  }, [orders, dateRange]);

  const summaryData = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      platformRevenueToday: calculatePlatformRevenue(orders, today),
      driversEarningsToday: calculateDriversRevenue(orders, today),
      vendorsEarningsToday: calculateVendorsRevenue(orders, today),
      pendingSettlementsCount: orders?.filter(o => !o.isPaid && o.status === 'Delivered').length || 0
    };
  }, [orders]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-border-soft shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">{t('finance.title') || "Finance Overview"}</h1>
            <p className="text-sm text-text-muted mt-0.5 font-medium">{t('finance.desc') || "Platform-wide revenue, earnings, and settlement status."}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchFinanceData}
            className="p-2.5 bg-white border border-border-soft text-text-muted hover:text-primary rounded-xl transition-all"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-border-soft text-text-main hover:bg-gray-50 rounded-xl transition-all font-bold text-sm shadow-sm">
            <Download className="w-4 h-4" />
            {t('table.actions') || "Export"}
          </button>
        </div>
      </div>

      {/* Date Filter */}
      <div className="flex items-center gap-4">
        <DateFilter selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      {/* Summary Cards */}
      <FinanceSummaryCards data={summaryData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settlement Ledger */}
        <div className="lg:col-span-2 space-y-8">
          <VendorFinanceTable vendors={vendors} orders={filteredOrders} />
          <DriverFinanceTable drivers={drivers} orders={filteredOrders} />
        </div>

        {/* Unpaid Alerts */}
        <div className="lg:col-span-1">
          <UnpaidOrdersPanel orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
