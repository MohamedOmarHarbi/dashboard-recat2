import React from 'react';

const StatCard = ({ icon: Icon, label, value, change }) => {
  const isPositive = typeof change === 'string' && change.startsWith('+');
  const changeColor = isPositive ? 'text-green-600' : (typeof change === 'string' && change.startsWith('-') ? 'text-red-600' : 'text-gray-600');

  return (
    <div className="bg-white border rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-semibold ${changeColor}`}>{change}</span>
      </div>
    </div>
  );
};

export default StatCard;
