import React from 'react';
import { cn } from '../../utils/cn';

const statuses = [
  { label: 'Active', value: 'Active', color: 'bg-emerald-500' },
  { label: 'Inactive', value: 'Inactive', color: 'bg-slate-400' },
  { label: 'Busy', value: 'Busy', color: 'bg-amber-500' },
  { label: 'Closed', value: 'Closed', color: 'bg-rose-500' }
];

const VendorStatusToggle = ({ currentStatus, onStatusChange }) => {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-page-bg rounded-lg border border-border-soft w-fit">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => onStatusChange(status.value)}
          className={cn(
            "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
            currentStatus === status.value 
              ? `${status.color} text-white shadow-sm scale-105` 
              : "text-text-muted hover:bg-white hover:text-text-main"
          )}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default VendorStatusToggle;
