import React, { useState } from 'react';
import { 
  Lock, Wallet, CheckCircle, AlertTriangle, 
  Loader2, ArrowRightCircle, ShieldCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { closeDriverShift } from '../../services/driverSettlementService';
import { calculateDriverPendingCash, calculateDriverFeesPending } from '../../utils/calculateDriverPendingCash';

const DriverShiftSettlementPanel = ({ driver, orders, onSettled }) => {
  const { t } = useTranslation();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const pendingCash = calculateDriverPendingCash(orders);
  const pendingFees = calculateDriverFeesPending(orders);
  const unpaidCount = orders.filter(o => !o.isPaid && o.status === 'Delivered').length;
  const totalFees = orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + (o.driverFee || 0), 0);

  const handleCloseShift = async () => {
    setIsClosing(true);
    try {
      await closeDriverShift(driver.id, driver.name);
      setIsConfirming(false);
      if (onSettled) onSettled();
    } catch (error) {
      console.error("Shift closure failed:", error);
    } finally {
      setIsClosing(false);
    }
  };

  if (unpaidCount === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-emerald-900 font-black text-sm uppercase tracking-widest">{t('settlement.shiftClear')}</h4>
            <p className="text-emerald-700/70 text-xs font-bold mt-0.5">{t('settlement.shiftClearDesc')}</p>
          </div>
        </div>
        <div className="hidden sm:block">
          <span className="text-[10px] font-black text-emerald-600/40 uppercase tracking-[0.3em]">{t('settlement.verifiedSettlement')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-black tracking-tight">{t('settlement.title')}</h3>
          </div>
          <p className="text-slate-400 text-xs font-medium">{t('settlement.desc')}</p>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center md:text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('settlement.pendingCollection')}</p>
            <p className="text-2xl font-black text-amber-400">EGP {pendingCash.toLocaleString()}</p>
          </div>
          <div className="w-px h-10 bg-white/10"></div>
          <div className="text-center md:text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('settlement.unpaidFees')}</p>
            <p className="text-2xl font-black text-white">EGP {pendingFees.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border-b border-border-soft flex flex-wrap items-center gap-6">
        <Stat icon={CheckCircle} label={t('settlement.settledToday')} value={orders.filter(o => o.isPaid && o.status === 'Delivered').length} color="text-emerald-500" />
        <Stat icon={AlertTriangle} label={t('settlement.unsettledOrders')} value={unpaidCount} color="text-amber-500" />
        <Stat icon={Wallet} label={t('settlement.totalShiftFees')} value={`EGP ${totalFees.toLocaleString()}`} color="text-indigo-500" />
      </div>

      <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          {t('settlement.confirmSettlement')}
        </p>
        
        {isConfirming ? (
          <div className="flex items-center gap-2 w-full sm:w-auto animate-in slide-in-from-right-4 duration-200">
            <button 
              onClick={() => setIsConfirming(false)}
              className="px-6 py-3 bg-white border border-border-soft text-text-muted hover:text-text-main rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            >
              {t('form.discard')}
            </button>
            <button 
              onClick={handleCloseShift}
              disabled={isClosing}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-200 transition-all"
            >
              {isClosing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              {t('settlement.confirmSettlement')}
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsConfirming(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl transition-all group"
          >
            {t('settlement.closeShift')}
            <ArrowRightCircle className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

const Stat = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3">
    <div className={`p-2 rounded-lg bg-white shadow-sm border border-border-soft ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-[10px] font-black text-text-muted uppercase tracking-tighter">{label}</p>
      <p className="text-sm font-black text-text-main">{value}</p>
    </div>
  </div>
);

export default DriverShiftSettlementPanel;
