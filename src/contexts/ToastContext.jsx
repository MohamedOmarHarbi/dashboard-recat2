import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Toast from '../components/ui/Toast';

const ToastContext = createContext();

export let showGlobalSuccess = () => {};
export let showGlobalError = () => {};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const showSuccess = useCallback((message) => showToast(message, 'success'), [showToast]);
  const showError = useCallback((message) => showToast(message, 'error'), [showToast]);

  useEffect(() => {
    showGlobalSuccess = showSuccess;
    showGlobalError = showError;
  }, [showSuccess, showError]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
      <div className="fixed top-8 right-8 z-[9999] flex flex-col gap-3">
        {toasts?.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
