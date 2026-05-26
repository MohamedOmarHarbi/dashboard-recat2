import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { addBanner, updateBanner } from '../../services/homeLayoutService';
import { getCategories } from '../../services/productsService';
import BannerImageUploader from './BannerImageUploader';
import { safeMap } from '../../utils/safeMap';

const AddBannerModal = ({ banner, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    imageUrl: banner?.imageUrl || '',
    linkedCategoryId: banner?.linkedCategoryId || '',
    displayOrder: banner?.displayOrder || 1,
    status: banner?.status || 'Active'
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setInitialLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (banner?.id) {
        await updateBanner({ ...banner, ...formData });
      } else {
        await addBanner(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving banner:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-border-soft overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-soft bg-gray-50/50">
          <h3 className="text-lg font-black text-text-main">
            {banner ? 'Edit Promotional Banner' : 'Add New Promotional Banner'}
          </h3>
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
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              <BannerImageUploader 
                imageUrl={formData.imageUrl} 
                onImageChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Link to Category</label>
                  <select
                    value={formData.linkedCategoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedCategoryId: parseInt(e.target.value) }))}
                    className="w-full bg-input-bg border border-border-soft rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                  >
                    <option value="">No Link</option>
                    {safeMap(categories, (cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
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
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-2">Banner Status</label>
                <div className="flex items-center gap-3 p-1 bg-gray-100 rounded-xl w-fit">
                  {['Active', 'Hidden'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, status }))}
                      className={`px-6 py-2 text-xs font-black rounded-lg transition-all ${
                        formData.status === status ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-main'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
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
                disabled={loading || !formData.imageUrl}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-70 text-sm"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {banner ? 'Update Banner' : 'Create Banner'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddBannerModal;
