import React from 'react';
import { cn } from '../../utils/cn';

const StatusDropdown = ({ status, onChange }) => {
  const statuses = ['Delivered', 'Pending', 'Processing', 'Cancelled'];

  const getStatusColor = (s) => {
    switch (s.toLowerCase()) {
      case 'delivered': return 'text-green-600';
      case 'pending': return 'text-amber-600';
      case 'processing': return 'text-blue-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="relative inline-block w-full min-w-[130px]">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "appearance-none w-full bg-white border border-border-soft rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer",
          getStatusColor(status)
        )}
      >
        {statuses?.map((s) => (
          <option key={s} value={s} className="text-text-main font-normal">
            {s}
          </option>
        ))}
      </select>
      {/* Custom arrow icon for the native select */}
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-text-muted">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default StatusDropdown;
