import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, CheckCircle } from 'lucide-react';
import { exportOrdersToCSV } from '../../utils/exportOrdersCSV';
import { cn } from '../../utils/cn';

const ExportOrdersButton = ({ ordersData, selectedOrders, onNotify }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleExportAll = () => {
    try {
      const safeData = Array.isArray(ordersData) ? ordersData : [];
      if (safeData.length === 0) {
        onNotify?.("No orders to export");
        setIsOpen(false);
        return;
      }
      exportOrdersToCSV(safeData, `orders-export-all-${getTodayDate()}.csv`);
      onNotify?.("Orders exported successfully");
      setIsOpen(false);
    } catch (err) {
      console.error("Export failed:", err);
      onNotify?.("Export failed. Please try again.");
      setIsOpen(false);
    }
  };

  const handleExportSelected = () => {
    try {
      const safeSelected = Array.isArray(selectedOrders) ? selectedOrders : [];
      if (safeSelected.length === 0) return;
      const safeData = Array.isArray(ordersData) ? ordersData : [];
      const selectedData = safeData.filter(order => safeSelected.includes(order?.id));
      exportOrdersToCSV(selectedData, `orders-export-selected-${getTodayDate()}.csv`);
      onNotify?.("Selected orders exported successfully");
      setIsOpen(false);
    } catch (err) {
      console.error("Export selected failed:", err);
      onNotify?.("Export failed. Please try again.");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-border-soft rounded-lg text-sm font-medium text-text-main hover:bg-gray-50 transition-all shadow-sm"
      >
        <Download className="w-4 h-4 text-text-muted" />
        Export
        <ChevronDown className={cn("w-4 h-4 text-text-muted transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-border-soft rounded-xl shadow-lg z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
          <button
            onClick={handleExportAll}
            className="w-full text-start px-4 py-2 text-sm text-text-main hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            Export All Orders
          </button>
          <button
            onClick={handleExportSelected}
            disabled={(selectedOrders?.length ?? 0) === 0}
            className={cn(
              "w-full text-start px-4 py-2 text-sm transition-colors flex items-center gap-2",
              (selectedOrders?.length ?? 0) === 0
                ? "text-text-muted cursor-not-allowed opacity-50" 
                : "text-text-main hover:bg-gray-50"
            )}
          >
            Export Selected ({selectedOrders?.length ?? 0})
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportOrdersButton;
