import React from 'react';
import { cn } from '../../utils/cn';

const CustomerStatusToggle = ({ currentStatus, onStatusToggle }) => {
  const isActive = currentStatus === 'Active';

  return (
    <button
      onClick={() => onStatusToggle(isActive ? 'Blocked' : 'Active')}
      className={cn(
        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm border",
        isActive 
          ? "bg-emerald-500 border-emerald-400 text-white hover:bg-emerald-600" 
          : "bg-rose-500 border-rose-400 text-white hover:bg-rose-600"
      )}
    >
      {currentStatus}
    </button>
  );
};

export default CustomerStatusToggle;
