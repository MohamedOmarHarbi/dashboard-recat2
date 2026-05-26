import React, { useState, useEffect } from 'react';
import { X, Loader2, Check } from 'lucide-react';
import { addCategory, updateCategory } from '../../services/productsService';
import { getVendors } from '../../services/vendorsService';
import CategoryImageUploader from './CategoryImageUploader';
import { safeMap } from '../../utils/safeMap';

const AddCategoryModal = ({ category, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    imageUrl: category?.imageUrl || '',
    vendors: category?.vendors || [],
    displayOrder: category?.displayOrder || 1,
    status: category?.status || 'Active'
  });
  
  const [vendorsList, setVendorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingVendors, setFetchingVendors] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      setFetchingVendors(true);
      try {
        const data = await getVendors();
        setVendorsList(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setFetchingVendors(false);
      }
    };
    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (category?.id) {
        await updateCategory({ ...category, ...formData });
      } else {
        await addCategory(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving category:", error);
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

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border-soft overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-soft bg-gray-50/50">
          <h3 className="text-lg font-black text-text-main">
            {category ? 'Edit Category' : 'Add New Category'}
          </h3>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            <CategoryImageUploader 
              imageUrl={formData.imageUrl} 
              onImageChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))} 
            />

            <div>
              <label className="block text-sm font-bold text-text-main mb-2">Category Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full bg-input-bg border border-border-soft rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                placeholder="e.g. Electronics, Fast Food..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-text-main mb-2">Display Order</label>
                <input 
                  type="number" 
                  value={formData.displayOrder}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) }))}
                  required
                  min="1"
                  className="w-full bg-input-bg border border-border-soft rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
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
                {fetchingVendors ? (
                  <div className="p-4 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                ) : (
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
                    {(!vendorsList || vendorsList.length === 0) && (
                      <div className="p-4 text-center text-xs text-text-muted">No vendors found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border-soft flex items-center gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-border-soft text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-70 text-sm"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {category ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
