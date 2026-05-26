import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { updateOrder } from '../../services/ordersService';
import { showGlobalSuccess, showGlobalError } from '../../contexts/ToastContext';

const EditOrderModal = ({ isOpen, onClose, order, onSave }) => {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setCustomer(order.customer || '');
      setDate(order.date || '');
      // Ensure we convert numeric amount to string safely for editing
      setAmount(order.amount !== undefined ? String(order.amount) : '');
      setPaymentMethod(order.paymentMethod || 'Credit Card');
      setStatus(order.status || 'Pending');
    }
  }, [order, isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.trim()) {
      showGlobalError("Customer name is required");
      return;
    }
    if (!date) {
      showGlobalError("Order date is required");
      return;
    }
    if (amount === '' || isNaN(parseFloat(amount))) {
      showGlobalError("A valid order amount is required");
      return;
    }

    setLoading(true);
    try {
      // Parse amount as number if it originally was a number
      const parsedAmount = typeof order?.amount === 'number' ? parseFloat(amount) : amount;
      
      const updatedOrder = {
        ...order,
        customer,
        date,
        amount: parsedAmount,
        paymentMethod,
        status
      };

      await updateOrder(updatedOrder);
      onSave(updatedOrder);
      onClose();
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-border-soft pb-4">
          <h2 className="text-lg font-bold text-text-main">Edit Order {order?.id}</h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-text-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
              Customer Name
            </label>
            <input 
              type="text" 
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-3 py-2 bg-input-bg border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
              placeholder="e.g. Ahmed Hassan"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                Order Date
              </label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-input-bg border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                Amount
              </label>
              <input 
                type="text" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-input-bg border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
                placeholder="e.g. 120.00"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                Payment Method
              </label>
              <select 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border-soft mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border-soft rounded-lg text-sm font-medium text-text-main hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderModal;
