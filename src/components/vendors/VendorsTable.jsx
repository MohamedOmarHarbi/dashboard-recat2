import React from 'react';
import { Star, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';
import VendorStatusToggle from './VendorStatusToggle';

const VendorsTable = ({ vendors, onEdit, onDelete, onStatusChange }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Inactive': return 'bg-slate-50 text-slate-700 border-slate-200';
      case 'Busy': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Closed': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-start text-sm whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50/50 border-b border-border-soft text-text-muted">
            <th className="px-6 py-4 font-semibold text-start">Logo</th>
            <th className="px-6 py-4 font-semibold text-start">Vendor Name</th>
            <th className="px-6 py-4 font-semibold text-start">Category</th>
            <th className="px-6 py-4 font-semibold text-start">Phone</th>
            <th className="px-6 py-4 font-semibold text-center">Orders</th>
            <th className="px-6 py-4 font-semibold text-center">Products</th>
            <th className="px-6 py-4 font-semibold text-start">Rating</th>
            <th className="px-6 py-4 font-semibold text-start">Status Control</th>
            <th className="px-6 py-4 font-semibold text-end">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-soft">
          {vendors?.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4">
                <img 
                  src={vendor.logo} 
                  alt={vendor.name} 
                  className="w-10 h-10 rounded-xl object-cover border border-border-soft shadow-sm"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-bold text-text-main">{vendor.name}</span>
                  <span className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">ID: VND-{vendor.id.toString().padStart(3, '0')}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                  {vendor.category}
                </span>
              </td>
              <td className="px-6 py-4 font-medium text-text-muted">{vendor.phone}</td>
              <td className="px-6 py-4 text-center font-bold text-text-main">{vendor.orders}</td>
              <td className="px-6 py-4 text-center font-bold text-text-main">{vendor.products}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded w-fit border border-amber-100">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-black">{vendor.rating}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <VendorStatusToggle 
                  currentStatus={vendor.status} 
                  onStatusChange={(newStatus) => onStatusChange(vendor.id, newStatus)} 
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(vendor)} className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(vendor.id)} className="p-2 text-text-muted hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-text-muted hover:text-text-main hover:bg-page-bg rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {!vendors?.length && (
            <tr>
              <td colSpan="9" className="px-6 py-12 text-center text-text-muted font-medium italic">
                No vendors found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorsTable;
