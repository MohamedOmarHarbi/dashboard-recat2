import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLoading } from '../../contexts/LoadingContext';

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 border border-border-soft">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-sm font-bold text-text-main tracking-tight uppercase">Processing Request...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
