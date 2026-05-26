import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Globe, Bell, Shield, Save } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Settings = () => {
  const { t } = useTranslation();
  const { showSuccess } = useToast();
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    showSuccess("Settings saved successfully");
  };

  const tabs = [
    { id: 'general', label: t('settings.general') || "General", icon: Globe },
    { id: 'notifications', label: t('settings.notifications') || "Notifications", icon: Bell },
    { id: 'security', label: t('settings.security') || "Security", icon: Shield }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">{t('settings.title') || "System Settings"}</h1>
            <p className="text-sm text-text-muted mt-0.5 font-medium">{t('settings.desc') || "Manage platform-wide configurations"}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg transition-all font-bold text-sm"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all font-bold text-sm ${
                activeTab === tab.id 
                  ? "bg-white text-primary border border-primary shadow-sm" 
                  : "text-text-muted hover:bg-white hover:text-text-main"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-2xl border border-border-soft shadow-sm p-8">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-xl font-bold text-text-main">{t('settings.general')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">Platform Name</label>
                  <input type="text" defaultValue="طلبك على السريع" className="w-full px-4 py-3 bg-page-bg border border-border-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">Support Email</label>
                  <input type="email" defaultValue="support@app.com" className="w-full px-4 py-3 bg-page-bg border border-border-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                </div>
              </div>
            </div>
          )}
          {activeTab !== 'general' && (
            <div className="py-20 text-center">
              <p className="text-text-muted italic">Configuration module coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
