import React from 'react';
import { Wallet, Package, TrendingUp } from 'lucide-react';
import { calculateDriverDailyEarnings, getCompletedOrdersCountToday } from '../../utils/calculateDriverDailyEarnings';

const DriverDailyEarningsCard = ({ driverId }) => {
  const earnings = calculateDriverDailyEarnings(driverId);
  const ordersCount = getCompletedOrdersCountToday(driverId);

  return (
    <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12 blur-xl"></div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md">
            <Wallet className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
            <TrendingUp className="w-3 h-3" />
            Live Balance
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black text-emerald-100 uppercase tracking-[0.2em] mb-1">Total Earnings Today</p>
          <h3 className="text-3xl font-black">EGP {earnings.toFixed(2)}</h3>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-100" />
            <span className="text-xs font-bold">{ordersCount} Completed Tasks</span>
          </div>
          <span className="text-[10px] font-medium opacity-80 italic">Settlement pending</span>
        </div>
      </div>
    </div>
  );
};

export default DriverDailyEarningsCard;
