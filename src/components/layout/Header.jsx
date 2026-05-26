import React from 'react';
import { Search, Bell, Moon, Languages, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleLang = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-border-soft flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-text-main">{t('dashboard')}</h2>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-page-bg rounded-lg border border-border-soft">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{user?.name || 'User'}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center bg-input-bg border border-border-soft rounded-lg px-3 py-2 w-48 lg:w-80 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all">
          <Search className="w-4 h-4 text-text-muted me-2" />
          <input type="text" placeholder={t('search')} className="bg-transparent border-none outline-none text-sm text-text-main w-full placeholder:text-text-muted" />
        </div>

        <button onClick={toggleLang} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-page-bg text-text-main hover:bg-gray-100 rounded-lg transition-colors font-medium text-xs sm:text-sm border border-border-soft">
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
        </button>

        <button className="p-2 text-text-muted hover:text-text-main hover:bg-page-bg rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40">
          <Moon className="w-5 h-5" />
        </button>
        <button className="p-2 text-text-muted hover:text-text-main hover:bg-page-bg rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary/40">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
        </button>
        
        <div className="h-6 w-px bg-border-soft mx-1"></div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          title={t('header.logout')}
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
export default Header;
