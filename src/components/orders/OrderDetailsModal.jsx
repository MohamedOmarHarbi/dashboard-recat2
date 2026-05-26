import React, { useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, CreditCard, ShoppingBag, Loader2, Image as ImageIcon, ExternalLink } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import PaymentScreenshotUploader from './PaymentScreenshotUploader';

const OrderDetailsModal = ({ isOpen, onClose, order, loading, onUpdate }) => {
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

  if (loading || !order) {
    return (
      <div 
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-12 flex flex-col items-center justify-center gap-4 animate-in zoom-in-95 duration-200">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-sm font-medium text-text-muted">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-border-soft pb-4">
          <h2 className="text-xl font-bold text-text-main">Order {order?.id}</h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-text-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Information */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4" /> Customer Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-page-bg p-4 rounded-xl border border-border-soft">
            <div className="flex flex-col gap-1">
              <span className="text-text-muted font-medium">Full Name</span>
              <span className="text-text-main font-semibold">{order?.customerName}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-muted font-medium">Email</span>
              <div className="flex items-center gap-1.5 text-text-main">
                <Mail className="w-3.5 h-3.5" /> {order?.email}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-muted font-medium">Phone</span>
              <div className="flex items-center gap-1.5 text-text-main">
                <Phone className="w-3.5 h-3.5" /> {order?.phone}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-muted font-medium">Address</span>
              <div className="flex items-center gap-1.5 text-text-main">
                <MapPin className="w-3.5 h-3.5" /> {order?.address}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Order Items
          </h3>
          <div className="border border-border-soft rounded-xl overflow-hidden">
            {!order?.items?.length ? null : (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-text-muted border-b border-border-soft">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold text-center">Quantity</th>
                  <th className="px-4 py-3 font-semibold text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {order?.items?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-text-main font-medium">{item?.name}</td>
                    <td className="px-4 py-3 text-center text-text-main">{item?.quantity}</td>
                    <td className="px-4 py-3 text-right text-text-main font-semibold">{item?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>

        {/* Payment Verification / Screenshot */}
        <div className="mt-8 border-t border-border-soft pt-6">
          {order?.paymentScreenshotUrl ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Payment Verification
                </h3>
                <a 
                  href={order.paymentScreenshotUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                >
                  View Full Size <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative group rounded-xl overflow-hidden border border-border-soft bg-page-bg">
                <img 
                  src={order?.paymentScreenshotUrl} 
                  alt="Payment Screenshot"
                  className="w-full h-auto max-h-[300px] object-contain rounded-lg border mt-3"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
              </div>
              
              {/* Allow re-upload if needed */}
              <div className="pt-2">
                <button 
                  onClick={() => onUpdate({ ...order, paymentScreenshotUrl: null })}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Remove & Re-upload
                </button>
              </div>
            </div>
          ) : (
            <PaymentScreenshotUploader 
              orderId={order?.id} 
              onUploadSuccess={(url) => {
                if (onUpdate) {
                  onUpdate({ ...order, paymentScreenshotUrl: url });
                }
              }} 
            />
          )}
        </div>
        </div>

        {/* Summary */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-xl border border-border-soft">
          <div className="flex gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Payment Method</span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-text-main">
                <CreditCard className="w-4 h-4" /> {order?.paymentMethod}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Status</span>
              <StatusBadge status={order?.status} />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Amount</span>
            <span className="text-2xl font-black text-primary">{order?.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
