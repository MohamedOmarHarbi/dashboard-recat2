import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Toast = ({ message, type = 'success' }) => {
  return (
    <div className={cn(
      "flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl border animate-in slide-in-from-right-8 fade-in duration-300 min-w-[300px]",
      type === 'success' 
        ? "bg-emerald-600 border-emerald-500 text-white" 
        : "bg-rose-600 border-rose-500 text-white"
    )}>
      {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

export default Toast;
