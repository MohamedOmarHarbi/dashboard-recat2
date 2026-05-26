import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2, LayoutGrid, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getCategories, deleteCategory } from '../services/productsService';
import AddCategoryModal from '../components/categories/AddCategoryModal';
import CategoryStatusToggle from '../components/categories/CategoryStatusToggle';
import { safeMap } from '../utils/safeMap';

const Categories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        setCategories(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-text-main tracking-tight">{t('sidebar.categories') || "Categories"}</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">{t('products_module.desc') || "Advanced control over your store's structure and vendor linkage."}</p>
        </div>
        <button 
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg transition-all font-bold text-sm"
        >
          <Plus className="w-4 h-4 stroke-[3px]" />
          {t('products_module.addNewProduct') || "Create Category"}
        </button>
      </div>

      <div className="bg-card-bg rounded-2xl border border-border-soft shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50/50 border-b border-border-soft text-text-muted">
                <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">{t('table.image')}</th>
                <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Category Name</th>
                <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Display Order</th>
                <th className="px-6 py-4 font-bold text-start uppercase tracking-wider text-[10px]">Linked Vendors</th>
                <th className="px-6 py-4 font-bold text-center uppercase tracking-wider text-[10px]">{t('table.status')}</th>
                <th className="px-6 py-4 font-bold text-end uppercase tracking-wider text-[10px]">{t('table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                      <p className="text-sm font-bold text-text-muted tracking-widest uppercase">Syncing categories...</p>
                    </div>
                  </td>
                </tr>
              ) : categories?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                        <LayoutGrid className="w-8 h-8" />
                      </div>
                      <p className="text-lg font-bold text-text-muted">No categories created yet</p>
                    </div>
                  </td>
                </tr>
              ) : (
                safeMap(categories, (cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      {cat?.imageUrl ? (
                        <img 
                          src={cat.imageUrl} 
                          className="w-12 h-12 rounded-lg object-cover border border-border-soft shadow-sm" 
                          alt={cat.name}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-text-main text-base">{cat.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-black text-primary bg-primary/5 w-fit px-3 py-1 rounded-full text-xs">
                        #{cat.displayOrder || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-text-main font-semibold">
                        <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                        <span>{cat?.vendors?.length || 0} Vendors</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CategoryStatusToggle 
                        categoryId={cat.id} 
                        initialStatus={cat.status}
                        onToggle={(newStatus) => {
                          setCategories(prev => prev.map(c => c.id === cat.id ? { ...c, status: newStatus } : c));
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setEditingCategory(cat);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-text-muted hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <AddCategoryModal 
          category={editingCategory}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchCategories();
          }}
        />
      )}
    </div>
  );
};

export default Categories;
