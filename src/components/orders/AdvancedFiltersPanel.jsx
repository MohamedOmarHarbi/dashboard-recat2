import React from 'react';
import { Calendar, CreditCard, Tag, DollarSign, RotateCcw, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const AdvancedFiltersPanel = ({ filters, setFilters, onReset, onApply }) => {
  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const paymentMethods = ['All', 'Credit Card', 'Cash', 'PayPal', 'Bank Transfer'];
  const statuses = ['Delivered', 'Pending', 'Processing', 'Cancelled'];

  const toggleStatus = (status) => {
    const newList = filters.statusList.includes(status)
      ? filters.statusList.filter(s => s !== status)
      : [...filters.statusList, status];
    handleChange('statusList', newList);
  };

  return (
    <div className="bg-white border border-border-soft rounded-xl p-5 shadow-sm animate-in slide-in-from-top-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Date Range */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> Date Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="w-full bg-input-bg border border-border-soft rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
              value={filters.fromDate}
              onChange={(e) => handleChange('fromDate', e.target.value)}
            />
            <span className="text-text-muted text-xs font-bold">TO</span>
            <input
              type="date"
              className="w-full bg-input-bg border border-border-soft rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
              value={filters.toDate}
              onChange={(e) => handleChange('toDate', e.target.value)}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5" /> Payment Method
          </label>
          <select
            className="w-full bg-input-bg border border-border-soft rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 outline-none appearance-none cursor-pointer"
            value={filters.paymentMethod}
            onChange={(e) => handleChange('paymentMethod', e.target.value)}
          >
            {paymentMethods?.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Status Multi-select */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <Tag className="w-3.5 h-3.5" /> Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statuses?.map(s => (
              <button
                key={s}
                onClick={() => toggleStatus(s)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all border",
                  filters.statusList.includes(s)
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-gray-50 border-border-soft text-text-muted hover:border-gray-300"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Range */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5" /> Amount Range
          </label>
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">$</span>
              <input
                type="number"
                placeholder="Min"
                className="w-full bg-input-bg border border-border-soft rounded-lg pl-6 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                value={filters.minAmount}
                onChange={(e) => handleChange('minAmount', e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">$</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full bg-input-bg border border-border-soft rounded-lg pl-6 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                value={filters.maxAmount}
                onChange={(e) => handleChange('maxAmount', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 mt-6 pt-4 border-t border-border-soft">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={onApply}
          className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
        >
          <Check className="w-4 h-4" /> Apply Filters
        </button>
      </div>
    </div>
  );
};

export default AdvancedFiltersPanel;
