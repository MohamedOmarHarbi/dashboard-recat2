import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const OrdersFilters = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-border-soft shadow-sm">
      <div className="relative w-full max-w-md group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by customer name or order ID..."
          className="w-full pl-10 pr-4 py-2.5 bg-input-bg border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OrdersFilters;
