import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Save, X, UploadCloud, Loader2, MapPin, Phone, Tag } from 'lucide-react';
import { addVendor } from '../services/vendorsService';

const AddVendor = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addVendor(formData);
      navigate('/vendors');
    } catch (error) {
      console.error("Error adding vendor:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-text-main tracking-tight">{t('vendors.registerNew')}</h1>
          <p className="text-sm text-text-muted mt-0.5 font-medium">{t('vendors.registerNewDesc')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/vendors')}
            className="flex items-center gap-2 px-5 py-2.5 border border-border-soft text-text-main rounded-lg hover:bg-gray-50 transition-all font-bold text-sm"
          >
            <X className="w-4 h-4" />
            {t('form.discard')}
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg shadow-md transition-all font-bold text-sm disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {t('form.saveVendor')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-bold text-text-main mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              Store Information
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">{t('form.vendorName') || "Vendor Name"}</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-input-bg rounded-lg border border-border-soft px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" 
                    placeholder={t('form.vendorName') || "e.g. Burger Palace"} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">{t('form.category') || "Category"}</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-input-bg rounded-lg border border-border-soft px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                  >
                    <option value="">{t('products_module.allCategories') || "Select Category"}</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">{t('form.phone') || "Phone Number"}</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-input-bg rounded-lg border border-border-soft ps-10 pe-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" 
                      placeholder="01xxxxxxxxx" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">{t('vendors_module.allStatuses') || "Initial Status"}</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-input-bg rounded-lg border border-border-soft px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                  >
                    <option value="Active">{t('vendors_module.activeOnly') || "Active"}</option>
                    <option value="Inactive">{t('vendors_module.inactiveOnly') || "Inactive"}</option>
                    <option value="Busy">{t('vendors_module.busy') || "Busy"}</option>
                    <option value="Closed">{t('vendors_module.closed') || "Closed"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-2">{t('form.address') || "Store Address"}</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-text-muted" />
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3" 
                    className="w-full bg-input-bg rounded-lg border border-border-soft ps-10 pe-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none" 
                    placeholder={t('form.address') || "Enter full physical address..."}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-bold text-text-main mb-6">Store Logo</h3>
            <div className="border-2 border-dashed border-border-soft rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-page-bg hover:border-primary/40 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-text-main">Upload Logo</p>
              <p className="text-xs text-text-muted mt-1 font-medium">PNG, JPG up to 1MB</p>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-border-soft">
              <h4 className="text-xs font-black text-text-muted uppercase tracking-widest mb-2">Tips</h4>
              <p className="text-[11px] text-text-muted leading-relaxed">A high-quality logo helps customers identify the store more easily in the app.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVendor;
