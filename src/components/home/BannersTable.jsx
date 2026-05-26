import React from 'react';
import { Edit, Trash2, Link as LinkIcon, ExternalLink } from 'lucide-react';
import BannerStatusToggle from './BannerStatusToggle';
import { safeMap } from '../../utils/safeMap';

const BannersTable = ({ banners, categories, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden mt-8">
      <div className="p-5 border-b border-border-soft bg-gray-50/30">
        <h3 className="text-lg font-black text-text-main">Banner Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50/50 border-b border-border-soft text-text-muted">
              <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Banner Image</th>
              <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Linked Category</th>
              <th className="px-6 py-4 font-bold text-center uppercase tracking-wider text-[10px]">Display Order</th>
              <th className="px-6 py-4 font-bold text-center uppercase tracking-wider text-[10px]">Status</th>
              <th className="px-6 py-4 font-bold text-end uppercase tracking-wider text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {safeMap(banners, (banner) => {
              const linkedCat = categories.find(c => c.id === banner.linkedCategoryId);
              
              return (
                <tr key={banner.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    {banner?.imageUrl ? (
                      <div className="relative group/img">
                        <img 
                          src={banner.imageUrl} 
                          className="w-32 h-16 rounded-xl object-cover border border-border-soft shadow-sm" 
                          alt="Banner"
                        />
                        <a 
                          href={banner.imageUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    ) : (
                      <div className="w-32 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-text-main font-bold">
                      <LinkIcon className="w-3.5 h-3.5 text-primary" />
                      {linkedCat?.name || "None"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-black text-xs">
                      {banner.displayOrder}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <BannerStatusToggle 
                      bannerId={banner.id} 
                      initialStatus={banner.status}
                      onToggle={(newStatus) => onStatusChange(banner.id, newStatus)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onEdit(banner)}
                        className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(banner.id)}
                        className="p-2 text-text-muted hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {(!banners || banners.length === 0) && (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-text-muted italic">
                  No banners configured yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannersTable;
