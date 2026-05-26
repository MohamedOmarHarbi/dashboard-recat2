import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const DateFilter = ({ selectedRange, onRangeChange }) => {
  const options = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'last7days', label: 'Last 7 Days' },
    { id: 'custom', label: 'Custom Picker' }
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="relative group">
        <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
          <Calendar className="w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
        </div>
        <select 
          value={selectedRange}
          onChange={(e) => onRangeChange(e.target.value)}
          className="ps-10 pe-10 py-2.5 bg-white border border-border-soft rounded-xl text-xs font-black uppercase tracking-widest text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer shadow-sm appearance-none"
        >
          {options.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 end-0 pe-3.5 flex items-center pointer-events-none">
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
