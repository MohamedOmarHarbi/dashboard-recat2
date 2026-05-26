import React from 'react';

const Badge = ({ variant, children }) => {
  const getStyles = () => {
    switch (variant) {
      case 'success':
        return { span: 'bg-green-50 text-green-700', dot: 'bg-green-500' };
      case 'warning':
        return { span: 'bg-orange-50 text-orange-700', dot: 'bg-orange-500' };
      case 'danger':
        return { span: 'bg-red-50 text-red-700', dot: 'bg-red-500' };
      default:
        return { span: 'bg-gray-50 text-gray-700', dot: 'bg-gray-500' };
    }
  };

  const styles = getStyles();

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles.span}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${styles.dot}`}></span>
      {children}
    </span>
  );
};

export default Badge;
