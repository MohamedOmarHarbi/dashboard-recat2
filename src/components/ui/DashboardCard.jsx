import React from 'react';

const DashboardCard = ({ title, action, children }) => {
  return (
    <div className="bg-card-bg border border-border-soft rounded-xl shadow-sm p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-main">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
