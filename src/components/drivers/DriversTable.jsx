import React from 'react';
import { Eye, MapPin, Phone, Star, Package, Home, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import DriverStatusBadge from './DriverStatusBadge';
import { resolveDriverStatus } from '../../utils/resolveDriverStatus';
import { calculateDriverDailyEarnings } from '../../utils/calculateDriverDailyEarnings';
import { safeMap } from '../../utils/safeMap';

const DriversTable = ({ drivers, onStatusChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50/50 border-b border-border-soft text-text-muted">
              <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Driver Profile</th>
              <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Zone & Address</th>
              <th className="px-6 py-4 font-bold text-center uppercase tracking-wider text-[10px]">Status</th>
              <th className="px-6 py-4 font-bold text-center uppercase tracking-wider text-[10px]">Earnings Today</th>
              <th className="px-6 py-4 font-bold text-center uppercase tracking-wider text-[10px]">Active Orders</th>
              <th className="px-6 py-4 font-bold text-center uppercase tracking-wider text-[10px]">Rating</th>
              <th className="px-6 py-4 font-bold text-end uppercase tracking-wider text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {safeMap(drivers, (driver) => {
              const currentStatus = resolveDriverStatus(driver);
              const earningsToday = calculateDriverDailyEarnings(driver?.id);
              
              return (
                <tr key={driver.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {driver?.photoUrl ? (
                        <img 
                          src={driver.photoUrl} 
                          className="w-10 h-10 rounded-full object-cover border border-border-soft shadow-sm" 
                          alt={driver.name}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black shadow-inner">
                          {driver?.name?.charAt(0) || '?'}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-text-main">{driver?.name}</p>
                          <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 text-text-muted rounded border border-border-soft font-black uppercase">
                            ID: {driver?.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-text-muted font-bold">
                          <Phone className="w-2.5 h-2.5" />
                          {driver?.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-text-main font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{driver?.zone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-text-muted font-bold overflow-hidden max-w-[200px] truncate">
                        <Home className="w-3 h-3 flex-shrink-0" />
                        <span>{driver?.address || "No address provided"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <DriverStatusBadge status={currentStatus} />
                      <div className="flex items-center gap-1 text-[8px] font-bold text-text-muted">
                        <div className={`w-1.5 h-1.5 rounded-full ${driver?.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                        {driver?.isOnline ? 'ONLINE' : 'OFFLINE'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-xs ${
                      earningsToday > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                      <Wallet className="w-3 h-3" />
                      EGP {earningsToday.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex flex-col items-center gap-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full font-black text-xs">
                        <Package className="w-3 h-3" />
                        {driver?.activeOrderId ? 1 : 0}
                      </div>
                      {driver?.activeOrderId && (
                        <span className="text-[9px] font-bold text-indigo-400 tracking-tighter uppercase">{driver.activeOrderId}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1 text-amber-500 font-black">
                        <Star className="w-3 h-3 fill-current" />
                        {driver?.rating}
                      </div>
                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-tighter">Excellent</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/drivers/${driver?.id}`}
                        className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriversTable;
