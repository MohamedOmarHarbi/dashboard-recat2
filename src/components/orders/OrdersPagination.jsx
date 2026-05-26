import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OrdersPagination = ({ totalItems = 0, itemsPerPage = 10 }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-border-soft rounded-xl shadow-sm">
      <div className="flex flex-1 justify-between sm:hidden">
        <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-text-main bg-white border border-border-soft rounded-lg hover:bg-gray-50 transition-colors">
          Previous
        </button>
        <button className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-text-main bg-white border border-border-soft rounded-lg hover:bg-gray-50 transition-colors">
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-text-muted">
            Showing <span className="font-medium text-text-main">1</span> to <span className="font-medium text-text-main">{Math.min(itemsPerPage, totalItems)}</span> of{' '}
            <span className="font-medium text-text-main">{totalItems}</span> results
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-text-muted">
            Page <span className="font-medium text-text-main">1</span> of <span className="font-medium text-text-main">{totalPages}</span>
          </p>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button className="relative inline-flex items-center rounded-l-lg px-2 py-2 text-text-muted border border-border-soft bg-white hover:bg-gray-50 focus:z-20 transition-colors disabled:opacity-50" disabled>
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white border border-primary bg-primary focus:z-20 transition-colors">
              1
            </button>
            <button className="relative inline-flex items-center rounded-r-lg px-2 py-2 text-text-muted border border-border-soft bg-white hover:bg-gray-50 focus:z-20 transition-colors">
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default OrdersPagination;
