import React, { useState } from 'react';
import { X, Loader2, Bike, Mail, Lock } from 'lucide-react';
import { createDriverAccount } from '../../services/driversService';
import DriverPhotoUploader from './DriverPhotoUploader';

const AddDriverModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    zone: 'Gerga Center',
    photoUrl: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.password) return;
    
    setLoading(true);
    try {
      const newDriver = await createDriverAccount(formData);
      onSuccess(newDriver);
    } catch (error) {
      console.error("Error creating driver account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border-soft overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-soft bg-gray-50/50">
          <div className="space-y-0.5">
            <h3 className="text-lg font-black text-text-main flex items-center gap-2">
              <Bike className="w-5 h-5 text-primary" />
              Create Driver Account
            </h3>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Onboarding & App Credentials</p>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            <DriverPhotoUploader 
              imageUrl={formData.photoUrl} 
              onImageChange={(url) => setFormData(prev => ({ ...prev, photoUrl: url }))} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-text-main mb-2">Driver Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-input-bg border border-border-soft rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="e.g. Mohamed Ali"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-main mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="w-full bg-input-bg border border-border-soft rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="010XXXXXXXX"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-border-soft space-y-4">
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest border-b border-border-soft pb-2">Login Credentials</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-text-muted group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full ps-10 pe-4 py-3 bg-white border border-border-soft rounded-xl text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    placeholder="Email Address"
                  />
                </div>
                <div className="relative group">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-text-muted group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full ps-10 pe-4 py-3 bg-white border border-border-soft rounded-xl text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-bold text-text-main mb-2">Operational Zone</label>
                <select
                  value={formData.zone}
                  disabled
                  className="w-full bg-gray-100 border border-border-soft rounded-xl px-4 py-3 text-sm text-text-muted font-bold cursor-not-allowed"
                >
                  <option value="Gerga Center">Gerga Center</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-bold text-text-main mb-2">Home Address</label>
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  required
                  className="w-full bg-input-bg border border-border-soft rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="Street, Building..."
                />
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                * Operational status is automatically set to <span className="font-black underline">Offline</span> upon creation. 
                Drivers must toggle their status within the mobile application.
              </p>
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
              disabled={loading || !formData.name || !formData.email || !formData.password}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-70 text-sm"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriverModal;
