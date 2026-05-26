import React, { useState, useEffect } from 'react';
import { X, Loader2, Check, ChevronRight } from 'lucide-react';
import { addSubCategory, updateSubCategory } from '../../services/subCategoriesService';
import { getCategories } from '../../services/productsService';
import { getVendors } from '../../services/vendorsService';
import CategoryImageUploader from './CategoryImageUploader';
import { safeMap } from '../../utils/safeMap';

const AddSubCategoryModal = ({ subCategory, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: subCategory?.name || '',
    categoryId: subCategory?.categoryId || '',
    imageUrl: subCategory?.imageUrl || '',
    vendors: subCategory?.vendors || [],
    status: subCategory?.status || 'Active'
  });
  
  const [categories, setCategories] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        const [cats, vends] = await Promise.all([
          getCategories(),
          getVendors()
        ]);
        setCategories(cats);
        setVendorsList(vends);
      } catch (error) {
        console.error("Error fetching dependencies:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) return;
    
    setLoading(true);
    try {
      if (subCategory?.id) {
        await updateSubCategory({ ...subCategory, ...formData });
      } else {
        await addSubCategory(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving section:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVendor = (vendorId) => {
    setFormData(prev => ({
      ...prev,
      vendors: prev.vendors.includes(vendorId)
        ? prev.vendors.filter(id => id !== vendorId)
        : [...prev.vendors, vendorId]
    }));
  };

  const selectedCategory = categories.find(c => c.id === formData.categoryId);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border-soft overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-soft bg-gray-50/50">
          <div className="space-y-0.5">
            <h3 className="text-lg font-black text-text-main">
              {subCategory ? 'Edit Category Section' : 'Add New Section'}
            </h3>
            {formData.categoryId && (
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                <span>{selectedCategory?.name || 'Category'}</span>
                <ChevronRight className="w-2.5 h-2.5" />
                <span className="text-primary">{formData.name || 'New Section'}</span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {initialLoading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm font-bold text-text-muted">Loading options...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <CategoryImageUploader 
                imageUrl={formData.imageUrl} 
                onImageChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))} 
              />

              <div>
                <label className="block text-sm font-bold text-text-main mb-2">Section Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-input-bg border border-border-soft rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="e.g. Pizza, Smartphones, Skin Care..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Parent Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: parseInt(e.target.value) }))}
                    required
                    className="w-full bg-input-bg border border-border-soft rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {safeMap(categories, (cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Status</label>
                  <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
                    {['Active', 'Hidden'].map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, status }))}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                          formData.status === status ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-main'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-2">Assign Vendors</label>
                <div className="border border-border-soft rounded-xl overflow-hidden bg-page-bg/50">
                  <div className="max-h-40 overflow-y-auto divide-y divide-border-soft">
                    {safeMap(vendorsList, (vendor) => (
                      <label 
                        key={vendor.id}
                        className="flex items-center justify-between p-3 hover:bg-white cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-text-muted uppercase">
                            {vendor.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-text-main">{vendor.name}</span>
                        </div>
                        <div 
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            formData.vendors.includes(vendor.id) ? 'bg-primary border-primary' : 'border-border-soft'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleVendor(vendor.id);
                          }}
                        >
                          {formData.vendors.includes(vendor.id) && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={formData.vendors.includes(vendor.id)}
                          onChange={() => toggleVendor(vendor.id)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border-soft flex items-center gap-3 bg-gray-50/50">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-border-soft text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading || !formData.name.trim() || !formData.categoryId}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-70 text-sm"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {subCategory ? 'Update Section' : 'Create Section'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
