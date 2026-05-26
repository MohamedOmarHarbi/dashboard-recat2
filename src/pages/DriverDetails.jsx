import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Phone, MapPin, Star, Package, CheckCircle, 
  Clock, TrendingUp, Bike, ShieldCheck, Mail, Globe, 
  Power, AlertCircle, Loader2, Wallet, DollarSign, History
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getDriverById, updateDriverOnlineStatus } from '../services/driversService';
import { getOrdersByDriver } from '../services/ordersService';
import { getDriverSettlementHistory } from '../services/driverSettlementService';
import { resolveDriverStatus } from '../utils/resolveDriverStatus';
import { calculateDriverEarningsByFilter, getSettlementStats } from '../utils/calculateDriverEarningsByDate';
import DriverStatusBadge from '../components/drivers/DriverStatusBadge';
import DriverOrdersTable from '../components/drivers/DriverOrdersTable';
import DateFilter from '../components/common/DateFilter';
import DriverSettlementSummary from '../components/drivers/DriverSettlementSummary';
import DriverShiftSettlementPanel from '../components/drivers/DriverShiftSettlementPanel';
import DriverSettlementHistoryTable from '../components/drivers/DriverSettlementHistoryTable';
import { safeMap } from '../utils/safeMap';

const DriverDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [orders, setOrders] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [selectedRange, setSelectedRange] = useState('today');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [driverData, ordersData, historyData] = await Promise.all([
        getDriverById(id),
        getOrdersByDriver(id),
        getDriverSettlementHistory(id)
      ]);
      setDriver(driverData);
      setOrders(ordersData);
      setSettlements(historyData);
    } catch (error) {
      console.error("Error fetching driver details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleOnlineToggle = async () => {
    setIsToggling(true);
    try {
      const newOnlineState = !driver.isOnline;
      await updateDriverOnlineStatus(driver.id, newOnlineState);
      setDriver(prev => ({ ...prev, isOnline: newOnlineState }));
    } catch (error) {
      console.error("Error toggling online status:", error);
    } finally {
      setIsToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-black text-text-muted uppercase tracking-widest">{t('drivers.syncing')}</p>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="p-12 text-center">
        <p className="text-xl font-bold text-text-main">Driver not found</p>
        <button onClick={() => navigate('/drivers')} className="mt-4 text-primary hover:underline">{t('customers.back')}</button>
      </div>
    );
  }

  const currentStatus = resolveDriverStatus(driver);
  const earningsToday = calculateDriverEarningsByFilter(orders, 'today');
  const earningsSelected = calculateDriverEarningsByFilter(orders, selectedRange);
  const settlementStats = getSettlementStats(orders);
  
  const activeOrders = orders.filter(o => o.id === driver.activeOrderId);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/drivers')}
            className="p-2.5 bg-white border border-border-soft rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-text-muted" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">{t('drivers.profile')}</h1>
            <p className="text-sm text-text-muted font-medium flex items-center gap-2">
              {t('drivers.operationalMetrics')}
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              ID: {driver.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-1.5 bg-white border border-border-soft rounded-2xl shadow-sm">
          <div className="px-3 py-1.5 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${driver.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
            <span className="text-[10px] font-black text-text-main uppercase tracking-widest">{driver.isOnline ? t('drivers.onlineNow') : 'Offline'}</span>
          </div>
          <button 
            onClick={handleOnlineToggle}
            disabled={isToggling}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              driver.isOnline 
                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            }`}
          >
            {isToggling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Power className="w-3.5 h-3.5" />}
            {driver.isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Profile & Security */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-border-soft shadow-sm p-8 text-center flex flex-col items-center">
            <div className="relative mb-4">
              {driver.photoUrl ? (
                <img src={driver.photoUrl} alt={driver.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-3xl font-black shadow-inner">
                  {driver.name.charAt(0)}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1">
                <DriverStatusBadge status={currentStatus} />
              </div>
            </div>
            
            <h2 className="text-xl font-black text-text-main">{driver.name}</h2>
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-xs text-text-muted font-bold flex items-center justify-center gap-1.5">
                <Mail className="w-3 h-3" />
                {driver.email}
              </p>
              <p className="text-xs text-text-muted font-bold flex items-center justify-center gap-1.5">
                <Phone className="w-3 h-3" />
                {driver.phone}
              </p>
            </div>
            
            <div className="mt-6 w-full pt-6 border-t border-border-soft flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-muted uppercase">Primary Zone</span>
                <div className="flex items-center gap-1.5 font-bold text-text-main text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {driver.zone}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-muted uppercase">{t('drivers.avgRating')}</span>
                <div className="flex items-center gap-1.5 font-bold text-amber-500 text-sm">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {driver.rating}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div className="p-2 bg-white/10 rounded-lg">
                <Wallet className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Finance Panel</span>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Earnings Today</p>
                <h3 className="text-2xl font-black text-white">EGP {earningsToday.toFixed(2)}</h3>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Period Balance ({selectedRange})</p>
                <h3 className="text-2xl font-black text-emerald-400">EGP {earningsSelected.toFixed(2)}</h3>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button className="w-full py-3 bg-primary text-white rounded-xl text-xs font-black shadow-lg hover:bg-primary-hover transition-all uppercase tracking-widest">
                Pay Driver Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Ledger & Settlements */}
        <div className="lg:col-span-9 space-y-8">
          <DriverShiftSettlementPanel 
            driver={driver} 
            orders={orders} 
            onSettled={fetchData} 
          />

          <DriverSettlementSummary stats={settlementStats} />

          {/* Active Orders Section */}
          <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border-soft bg-gray-50/30 flex items-center justify-between">
              <h3 className="text-sm font-black text-text-main uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                {t('drivers.activeAssignment')}
              </h3>
            </div>
            <div className="p-8">
              {activeOrders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safeMap(activeOrders, order => (
                    <div key={order.id} className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Current Order</p>
                          <p className="text-lg font-black text-indigo-700">{order.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{t('table.amount')}</p>
                        <p className="text-lg font-black text-indigo-700">EGP {order.amount?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-3">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-text-muted font-bold italic">{t('drivers.noActiveOrders')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Orders History & Ledger */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-sm font-black text-text-main uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {t('drivers.performanceLedger')}
              </h3>
              <DateFilter selectedRange={selectedRange} onRangeChange={setSelectedRange} />
            </div>

            <DriverOrdersTable 
              orders={orders} 
              onUpdate={fetchData} 
            />
          </div>

          {/* Settlement History */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-text-main uppercase tracking-widest flex items-center gap-2">
              <History className="w-4 h-4 text-primary" />
              {t('drivers.settlementArchive')}
            </h3>
            <DriverSettlementHistoryTable settlements={settlements} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Activity = ({ className }) => <TrendingUp className={className} />;

export default DriverDetails;
