import React from 'react';
import { Edit, Trash2, Image as ImageIcon, Users, FolderOpen } from 'lucide-react';
import SubCategoryStatusToggle from './SubCategoryStatusToggle';
import { safeMap } from '../../utils/safeMap';

const SubCategoriesTable = ({ subCategories, categories, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50/50 border-b border-border-soft text-text-muted">
              <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Image</th>
              <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Section Name</th>
              <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Parent Category</th>
              <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Vendors Count</th>
              <th className="px-6 py-4 font-bold text-center uppercase tracking-wider text-[10px]">Status</th>
              <th className="px-6 py-4 font-bold text-end uppercase tracking-wider text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {safeMap(subCategories, (sub) => {
              const parentCat = (categories || []).find(c => c.id === sub.categoryId);
              
              return (
                <tr key={sub.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    {sub?.imageUrl ? (
                      <img 
                        src={sub.imageUrl} 
                        className="w-12 h-12 rounded-lg object-cover border border-border-soft shadow-sm" 
                        alt={sub.name}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-text-main text-base">{sub.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-text-muted font-medium">
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>{parentCat?.name || "Uncategorized"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-text-main font-semibold">
                      <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <span>{sub?.vendors?.length || 0} Vendors</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <SubCategoryStatusToggle 
                      subCategoryId={sub.id} 
                      initialStatus={sub.status}
                      onToggle={(newStatus) => onStatusChange(sub.id, newStatus)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onEdit(sub)}
                        className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(sub.id)}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategoriesTable;
