import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, UploadCloud, Loader2, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getCategories, addProduct } from '../services/productsService';

const AddProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    description: '',
    price: '',
    currency: 'USD',
    colors: [],
    sizes: []
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProduct(formData);
      navigate('/products');
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-text-main">{t('products.addNewProduct')}</h1>
          <p className="text-sm text-text-muted mt-1.5 font-medium">{t('products.addNewProductDesc')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 px-5 py-2.5 border border-border-soft text-text-main rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
          >
            <X className="w-4 h-4" />
            {t('discard')}
          </button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg shadow-sm transition-all font-medium text-sm disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {t('form.saveProduct')}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-text-main mb-6">{t('form.generalInformation')}</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">{t('form.productName')}</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-input-bg rounded-lg border border-border-soft px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" 
                  placeholder="e.g. Wireless Headphones" 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">{t('form.category') || "Category"}</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-input-bg rounded-lg border border-border-soft px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                  >
                    <option value="">{t('products_module.allCategories') || "Select Category"}</option>
                    {categories?.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">{t('form.subCategory') || "Sub-category"}</label>
                  <select 
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full bg-input-bg rounded-lg border border-border-soft px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                  >
                    <option value="">{t('form.subCategory') || "Select Sub-category"}</option>
                    <option value="Audio">Audio</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Gaming">Gaming</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-2">{t('form.description') || "Description"}</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5" 
                  className="w-full bg-input-bg rounded-lg border border-border-soft px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none" 
                  placeholder={t('form.description') || "Describe your product in detail..."}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Pricing and Options */}
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-text-main mb-6">Pricing & Options</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">{t('form.price')}</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full bg-input-bg rounded-lg border border-border-soft ps-4 pe-20 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" 
                      placeholder="0.00" 
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center">
                      <select 
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="h-full py-0 ps-2 pe-7 bg-transparent text-text-muted text-xs font-bold border-transparent rounded-r-lg focus:ring-0 cursor-pointer"
                      >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>EGP</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Colors</label>
                  <select 
                    multiple
                    name="colors"
                    className="w-full bg-input-bg rounded-lg border border-border-soft px-4 py-1 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all h-[42px]"
                  >
                    <option>Black</option>
                    <option>White</option>
                    <option>Silver</option>
                    <option>Blue</option>
                  </select>
                  <p className="text-[10px] text-text-muted mt-1.5 font-medium uppercase tracking-wider">Hold Ctrl to select multiple</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Available Sizes</label>
                <div className="flex flex-wrap gap-3">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Standard'].map(size => (
                    <label key={size} className="flex items-center gap-2 px-4 py-2 border border-border-soft rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input type="checkbox" className="w-4 h-4 text-primary border-border-soft rounded focus:ring-primary/40" />
                      <span className="text-sm font-medium text-text-main">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Image Upload UI Placeholder */}
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-text-main mb-6">Product Images</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border-soft rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-page-bg hover:border-primary/40 transition-all cursor-pointer group">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-text-main">Click to upload main image</p>
                <p className="text-xs text-text-muted mt-1">SVG, PNG, JPG (max 2MB)</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square border-2 border-dashed border-border-soft rounded-xl flex items-center justify-center bg-gray-50/50 hover:bg-white hover:border-primary/40 transition-all cursor-pointer group">
                    <ImageIcon className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-text-muted font-medium">Add up to 4 additional thumbnails for the gallery.</p>
            </div>
          </div>

          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-text-main mb-4">Publishing Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-sm font-semibold text-emerald-700">Visibility</span>
                <span className="px-2 py-1 bg-white text-emerald-700 text-[10px] font-bold rounded border border-emerald-200 uppercase tracking-tighter">Public</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">By publishing this product, it will be immediately available for customers to order across all platforms.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
