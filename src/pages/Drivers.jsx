import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Loader2, Bike, MapPin, Activity, Package, Wallet, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getDrivers } from '../services/driversService';
import DriversTable from '../components/drivers/DriversTable';
import AddDriverModal from '../components/drivers/AddDriverModal';
import { resolveDriverStatus } from '../utils/resolveDriverStatus';
import { calculateDriverDailyEarnings, getCompletedOrdersCountToday } from '../utils/calculateDriverDailyEarnings';
import { safeMap } from '../utils/safeMap';

const Drivers = () => {
  const { t } = useTranslation();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  const zones = [...new Set(safeMap(drivers, d => d.zone))];

  const filteredDrivers = drivers?.filter(driver => {
    const currentStatus = resolveDriverStatus(driver);
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         driver.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || currentStatus === statusFilter;
    const matchesZone = !zoneFilter || driver.zone === zoneFilter;
    return matchesSearch && matchesStatus && matchesZone;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">{t('drivers.title')}</h1>
            <p className="text-sm text-text-muted mt-1 font-medium text-balance">{t('drivers.desc')}</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg transition-all font-bold text-sm"
        >
          <Plus className="w-4 h-4 stroke-[3px]" />
          {t('drivers.addDriver')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <StatItem 
          icon={Activity} 
          label={t('drivers.onlineNow')} 
          value={drivers.filter(d => d.isOnline).length} 
          color="bg-emerald-50 text-emerald-600" 
        />
        <StatItem 
          icon={Package} 
          label={t('drivers.activeTasks')} 
          value={drivers.filter(d => d.activeOrderId).length} 
          color="bg-indigo-50 text-indigo-600" 
        />
        <StatItem 
          icon={Wallet} 
          label={t('drivers.estDailyPayout')} 
          value={`EGP ${drivers.reduce((acc, d) => acc + calculateDriverDailyEarnings(d.id), 0).toFixed(0)}`} 
          color="bg-amber-50 text-amber-600" 
        />
        <StatItem 
          icon={TrendingUp} 
          label={t('drivers.avgRating')} 
          value={(drivers.reduce((acc, d) => acc + (d.rating || 0), 0) / (drivers.length || 1)).toFixed(1)} 
          color="bg-rose-50 text-rose-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card-bg rounded-2xl border border-border-soft shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border-soft flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
              <div className="relative w-full md:max-w-md group">
                <Search className="w-4 h-4 absolute inset-y-0 start-3.5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder={t('drivers.searchPlaceholder')}
                  className="w-full ps-10 pe-4 py-2.5 bg-input-bg border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select 
                  className="w-full md:w-36 bg-white border border-border-soft rounded-lg px-3 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer shadow-sm font-bold"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">{t('drivers.allStatuses') || "All Statuses"}</option>
                  <option value="Available">{t('vendors_module.activeOnly') || "Available"}</option>
                  <option value="On Delivery">{t('dispatch.onDelivery') || "On Delivery"}</option>
                  <option value="Offline">{t('vendors_module.inactiveOnly') || "Offline"}</option>
                  <option value="Suspended">{t('customers_module.blockedOnly') || "Suspended"}</option>
                </select>
                <select 
                  className="w-full md:w-36 bg-white border border-border-soft rounded-lg px-3 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer shadow-sm font-bold"
                  value={zoneFilter}
                  onChange={(e) => setZoneFilter(e.target.value)}
                >
                  <option value="">{t('drivers.allZones')}</option>
                  {safeMap(zones, z => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="py-24 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-sm font-black text-text-muted tracking-widest uppercase">{t('drivers.syncing')}</p>
              </div>
            ) : filteredDrivers?.length === 0 ? (
              <div className="py-24 flex flex-col items-center gap-4">
                <Bike className="w-16 h-16 text-gray-200" />
                <p className="text-lg font-bold text-text-muted">{t('drivers.noDrivers')}</p>
              </div>
            ) : (
              <DriversTable 
                drivers={filteredDrivers} 
                onStatusChange={(id, newStatus) => {
                  setDrivers(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
                }}
              />
            )}
          </div>
        </div>

        {/* Earnings Summary Side Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border-soft bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-black text-sm uppercase tracking-widest">{t('drivers.payoutsToday')}</h3>
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="divide-y divide-border-soft max-h-[600px] overflow-y-auto">
              {safeMap(drivers, (driver) => {
                const earnings = calculateDriverDailyEarnings(driver.id);
                const orders = getCompletedOrdersCountToday(driver.id);
                
                return (
                  <div key={driver.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black">
                        {driver.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{driver.name}</p>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-tighter">{orders} {t('drivers.ordersCompleted')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-black ${earnings > 0 ? 'text-emerald-600' : 'text-text-muted'}`}>
                        EGP {earnings.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 bg-gray-50 border-t border-border-soft">
              <button className="w-full py-3 bg-white border border-border-soft text-text-main rounded-xl text-xs font-black shadow-sm hover:shadow-md transition-all uppercase tracking-widest">
                {t('finance.payoutReport')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddDriverModal 
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-border-soft shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black text-text-main">{value}</p>
    </div>
  </div>
);

export default Drivers;
