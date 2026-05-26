import React from 'react';
import { cn } from '../../utils/cn';

const PaymentStatusBadge = ({ status }) => {
  const getStatusStyles = (s) => {
    switch (s) {
      case 'Pending Verification':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Verified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={cn(
      "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm whitespace-nowrap",
      getStatusStyles(status)
    )}>
      {status || 'Unknown'}
    </span>
  );
};

export default PaymentStatusBadge;
