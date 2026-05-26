import React, { useState, useEffect } from 'react';
import { X, Loader2, Bike, User, MapPin } from 'lucide-react';
import { getDrivers, assignOrderToDriver } from '../../services/driversService';
import { safeMap } from '../../utils/safeMap';

const AssignDriverModal = ({ orderId, onClose, onSuccess }) => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      setFetching(true);
      try {
        const data = await getDrivers();
        // Only show Online drivers or drivers with fewer than 3 active orders
        setDrivers(data.filter(d => d.status !== 'Suspended' && d.status !== 'Offline'));
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchDrivers();
  }, []);

  const handleAssign = async () => {
    if (!selectedDriverId) return;
    setLoading(true);
    try {
      await assignOrderToDriver(selectedDriverId, orderId);
      onSuccess(selectedDriverId);
    } catch (error) {
      console.error("Error assigning driver:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedDriver = drivers.find(d => d.id === parseInt(selectedDriverId));

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border-soft overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-soft bg-gray-50/50">
          <h3 className="text-lg font-black text-text-main flex items-center gap-2">
            <Bike className="w-5 h-5 text-primary" />
            Dispatch Order {orderId}
          </h3>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-text-main mb-3">Select Available Driver</label>
            {fetching ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                <select
                  value={selectedDriverId}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                  className="w-full bg-input-bg border border-border-soft rounded-xl px-4 py-3 text-sm text-text-main font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                >
                  <option value="">Choose a driver...</option>
                  {safeMap(drivers, (d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.status}) - {d.zone}
                    </option>
                  ))}
                </select>
                
                {selectedDriver && (
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 font-bold text-text-main text-sm">
                        <User className="w-4 h-4 text-primary" />
                        {selectedDriver.name}
                      </div>
                      <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded shadow-sm text-primary uppercase">
                        {selectedDriver.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-text-muted">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {selectedDriver.zone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Bike className="w-3.5 h-3.5" />
                        {selectedDriver.activeOrders} active orders
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-border-soft text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleAssign}
              disabled={loading || !selectedDriverId}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-70 text-sm"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Assign Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignDriverModal;
