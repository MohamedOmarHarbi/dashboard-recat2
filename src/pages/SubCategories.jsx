import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Loader2, Layers, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getSubCategories, deleteSubCategory } from '../services/subCategoriesService';
import { getCategories } from '../services/productsService';
import SubCategoriesTable from '../components/categories/SubCategoriesTable';
import AddSubCategoryModal from '../components/categories/AddSubCategoryModal';
import { safeMap } from '../utils/safeMap';

const SubCategories = () => {
  const { t } = useTranslation();
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subs, cats] = await Promise.all([
        getSubCategories(),
        getCategories()
      ]);
      setSubCategories(subs);
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      try {
        await deleteSubCategory(id);
        setSubCategories(prev => prev.filter(s => s.id !== id));
      } catch (error) {
        console.error("Error deleting section:", error);
      }
    }
  };

  const filteredData = subCategories?.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || sub.categoryId === parseInt(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-text-main tracking-tight">{t('form.subCategory')}</h1>
          <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span>Sections are sub-level classifications inside each category.</span>
          </div>
        </div>
        <button 
          onClick={() => {
            setEditingSubCategory(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg transition-all font-bold text-sm"
        >
          <Plus className="w-4 h-4 stroke-[3px]" />
          Create Section
        </button>
      </div>

      <div className="bg-card-bg rounded-2xl border border-border-soft shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border-soft flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search sections..."
              className="w-full ps-10 pe-4 py-2.5 bg-input-bg border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select 
              className="w-full md:w-48 bg-white border border-border-soft rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer shadow-sm font-bold"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Filter by {t('form.category')}</option>
              {safeMap(categories, (cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button className="p-2.5 bg-white border border-border-soft text-text-muted hover:text-text-main rounded-lg shadow-sm transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-black text-text-muted tracking-widest uppercase">Syncing sections...</p>
          </div>
        ) : filteredData?.length === 0 ? (
          <div className="py-24 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
              <Layers className="w-8 h-8" />
            </div>
            <p className="text-lg font-bold text-text-muted">
              {searchTerm || categoryFilter ? "No results found for your filters" : "No sections created yet"}
            </p>
          </div>
        ) : (
          <SubCategoriesTable 
            subCategories={filteredData} 
            categories={categories}
            onEdit={(sub) => {
              setEditingSubCategory(sub);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
            onStatusChange={(id, newStatus) => {
              setSubCategories(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
            }}
          />
        )}
      </div>

      {isModalOpen && (
        <AddSubCategoryModal 
          subCategory={editingSubCategory}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default SubCategories;
