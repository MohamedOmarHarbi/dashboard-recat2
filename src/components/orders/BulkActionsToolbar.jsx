import React from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const BulkActionsToolbar = ({ selectedOrders, onStatusChange, onDelete }) => {
  const hasSelection = selectedOrders.length > 0;

  if (!hasSelection) return null;

  return (
    <div className="sticky top-0 z-20 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="bg-white border border-border-soft rounded-lg px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">
            {selectedOrders.length}
          </span>
          <span className="text-sm font-medium text-text-main">
            {selectedOrders.length === 1 ? 'Order selected' : 'Orders selected'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <select
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none bg-gray-50 border border-border-soft rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>Update Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>

          <button
            onClick={onDelete}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;
