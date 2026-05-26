import React from 'react';
import { cn } from '../../utils/cn';

const StatusBadge = ({ status, minimal = false }) => {
  const statusConfig = {
    delivered: {
      dot: 'bg-green-500',
      text: 'text-green-700',
      label: 'Delivered',
    },
    pending: {
      dot: 'bg-amber-500',
      text: 'text-amber-700',
      label: 'Pending',
    },
    processing: {
      dot: 'bg-blue-500',
      text: 'text-blue-700',
      label: 'Processing',
    },
    cancelled: {
      dot: 'bg-red-500',
      text: 'text-red-700',
      label: 'Cancelled',
    },
  };

  const statusKey = typeof status === 'string' 
    ? status.toLowerCase() 
    : (status?.en ? status.en.toLowerCase() : 'pending');

  const config = statusConfig[statusKey] || statusConfig.pending;

  if (minimal) {
    return <span className={cn('w-2.5 h-2.5 rounded-full shrink-0', config.dot)} title={config.label} />;
  }

  return (
    <div className={cn('inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap', config.text)}>
      <span className={cn('w-2 h-2 rounded-full', config.dot)} />
      {config.label}
    </div>
  );
};

export default StatusBadge;
