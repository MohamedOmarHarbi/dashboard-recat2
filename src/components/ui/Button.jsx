import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm',
    secondary: 'border border-border-soft bg-white text-text-main hover:bg-gray-50'
  };

  return (
    <button 
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.98]',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
