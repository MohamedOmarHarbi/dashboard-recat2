import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/productsService';
import { updateFeaturedCategories } from '../../services/homeLayoutService';
import { Check, Loader2, X, Tag } from 'lucide-react';
import { safeMap } from '../../utils/safeMap';

const FeaturedCategoriesSelector = ({ initialSelectedIds }) => {
  const [categories, setCategories] = useState([]);
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds || []);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
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
    fetchCategories();
  }, []);

  const toggleCategory = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFeaturedCategories(selectedIds);
    } catch (error) {
      console.error("Error updating featured categories:", error);
    } finally {
      setSaving(false);
    }
  };

  const selectedCategories = categories.filter(c => selectedIds.includes(c.id));

  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-text-main">Featured Categories</h3>
            <p className="text-xs text-text-muted font-medium">Select categories to highlight on the app's main screen.</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-70 flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Changes
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {safeMap(selectedCategories, (cat) => (
          <div 
            key={cat.id} 
            className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary border border-primary/20 rounded-full text-xs font-bold animate-in zoom-in-95"
          >
            {cat.name}
            <button onClick={() => toggleCategory(cat.id)} className="hover:text-primary-hover transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {selectedIds.length === 0 && !loading && (
          <p className="text-sm text-text-muted italic">No categories selected</p>
        )}
      </div>

      <div className="border border-border-soft rounded-xl overflow-hidden bg-page-bg/30">
        {loading ? (
          <div className="p-10 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : (
          <div className="max-h-60 overflow-y-auto divide-y divide-border-soft">
            {safeMap(categories, (cat) => (
              <label 
                key={cat.id}
                className="flex items-center justify-between p-4 hover:bg-white cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {cat.imageUrl && (
                    <img src={cat.imageUrl} className="w-8 h-8 rounded object-cover" alt="" />
                  )}
                  <span className="text-sm font-bold text-text-main">{cat.name}</span>
                </div>
                <div 
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    selectedIds.includes(cat.id) ? 'bg-primary border-primary' : 'border-border-soft'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCategory(cat.id);
                  }}
                >
                  {selectedIds.includes(cat.id) && <Check className="w-4 h-4 text-white stroke-[3px]" />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={selectedIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCategoriesSelector;
