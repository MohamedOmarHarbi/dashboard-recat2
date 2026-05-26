import React, { useState, useCallback } from 'react';
import { UploadCloud, CheckCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadPaymentScreenshot } from '../../services/paymentService';
import { useTranslation } from 'react-i18next';
import { showGlobalSuccess } from '../../contexts/ToastContext';

const PaymentScreenshotUploader = ({ orderId, onUploadSuccess }) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      const response = await uploadPaymentScreenshot(orderId, file);
      if (response.success) {
        showGlobalSuccess("Payment screenshot uploaded successfully");
        if (onUploadSuccess) {
          onUploadSuccess(response.paymentScreenshotUrl);
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleUpload(file);
  }, [orderId]);

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    handleUpload(file);
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
        <ImageIcon className="w-4 h-4" /> {t('paymentScreenshot') || 'Payment Verification'}
      </h3>
      
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${isDragging ? 'border-primary bg-primary/5' : 'border-border-soft hover:border-primary/40 bg-page-bg/50'}
          ${isUploading ? 'opacity-70 pointer-events-none' : 'cursor-pointer'}
        `}
      >
        <input 
          type="file" 
          id="payment-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={onFileSelect}
          accept="image/*"
        />
        
        <div className="flex flex-col items-center gap-3">
          {isUploading ? (
            <>
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm font-bold text-text-main">Uploading...</p>
            </>
          ) : (
            <>
              <div className="p-3 bg-white rounded-full shadow-sm text-primary">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-text-main">Upload payment screenshot</p>
                <p className="text-xs text-text-muted font-medium">Drag & drop or click to browse</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentScreenshotUploader;
