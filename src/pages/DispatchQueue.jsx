import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutList, RefreshCw, Loader2, Search } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

// Components
import DispatchQueueSummary from '../components/dispatch/DispatchQueueSummary';
import DispatchQueueTable from '../components/dispatch/DispatchQueueTable';

// Services/Utils
import { getOrders, updateOrderDriver } from '../services/ordersService';
import { getDrivers } from '../services/driversService';
import { groupOrdersByDispatchStatus } from '../utils/groupOrdersByDispatchStatus';

const DispatchQueue = () => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    
    try {
      const [ordersData, driversData] = await Promise.all([
        getOrders(),
        getDrivers()
      ]);
      setOrders(ordersData || []);
      setDrivers(driversData || []);
    } catch (error) {
      console.error("Failed to fetch dispatch data:", error);
      showError("Connection failed. Retrying...");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [showError]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh hook (15 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(true);
    }, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleAssign = async (order) => {
    // In a real app, this would open a driver selection modal
    // For this mock, we'll assign the first available driver
    const availableDriver = drivers?.find(d => !d.activeOrderId && d.isOnline);
    if (!availableDriver) {
      showError("No available online drivers found.");
      return;
    }

    try {
      await updateOrderDriver(order.id, availableDriver.id);
      showSuccess(`Order ${order.id} assigned to ${availableDriver.name}`);
      fetchData(true);
    } catch (err) {
      showError("Assignment failed.");
    }
  };

  const handleReassign = async (order) => {
    showSuccess(`Reassignment triggered for ${order.id}`);
    // Mock logic
    fetchData(true);
  };

  const groupedOrders = groupOrdersByDispatchStatus(orders);
  
  const filteredOrders = orders?.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-black text-text-muted tracking-widest uppercase">Initializing Dispatch Stream...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-border-soft shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <LayoutList className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">{t('dispatch.title') || "Dispatch Queue"}</h1>
            <p className="text-sm text-text-muted mt-0.5 font-medium">{t('dispatch.desc') || "Real-time order distribution and workflow monitoring."}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder={t('customers_module.searchPlaceholder') || "Search queue..."} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-page-bg border border-border-soft rounded-xl text-xs font-bold w-64 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
          <button 
            onClick={() => fetchData()}
            className="p-2.5 bg-white border border-border-soft text-text-muted hover:text-primary rounded-xl transition-all relative"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing && <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-ping"></span>}
          </button>
        </div>
      </div>

      <DispatchQueueSummary groups={groupedOrders} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-text-main flex items-center gap-2">
            Live Stream
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </h2>
        </div>
        <DispatchQueueTable 
          orders={filteredOrders} 
          drivers={drivers}
          onAssign={handleAssign}
          onReassign={handleReassign}
        />
      </div>
    </div>
  );
};

export default DispatchQueue;
