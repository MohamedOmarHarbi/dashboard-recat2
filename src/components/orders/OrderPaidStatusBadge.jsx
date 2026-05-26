import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

const OrderPaidStatusBadge = ({ isPaid }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider border shadow-sm ${
      isPaid 
        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
        : 'bg-rose-50 text-rose-600 border-rose-100'
    }`}>
      {isPaid ? (
        <>
          <CheckCircle2 className="w-3 h-3" />
          Settled / Paid
        </>
      ) : (
        <>
          <Clock className="w-3 h-3" />
          Pending Cash
        </>
      )}
    </div>
  );
};

export default OrderPaidStatusBadge;
