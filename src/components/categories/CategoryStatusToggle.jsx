import React, { useState } from 'react';
import { toggleCategoryStatus } from '../../services/productsService';
import { Loader2 } from 'lucide-react';

const CategoryStatusToggle = ({ categoryId, initialStatus, onToggle }) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleCategoryStatus(categoryId);
      const newStatus = status === 'Active' ? 'Hidden' : 'Active';
      setStatus(newStatus);
      if (onToggle) onToggle(newStatus);
    } catch (error) {
      console.error("Error toggling status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${
        status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'
      } ${loading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          status === 'Active' ? 'translate-x-6' : 'translate-x-1'
        } flex items-center justify-center`}
      >
        {loading && <Loader2 className="w-2.5 h-2.5 text-slate-400 animate-spin" />}
      </span>
    </button>
  );
};

export default CategoryStatusToggle;
