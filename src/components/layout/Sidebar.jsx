import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Truck, LayoutDashboard, ShoppingCart, Package, Users, 
  BarChart3, AppWindow, Store, LogOut, Layers, 
  LayoutTemplate, Bike, ChevronDown, ChevronRight, BookOpen,
  Wallet, LayoutList, CreditCard, Settings
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isCatalogOpen, setIsCatalogOpen] = useState(true);

  const navLinks = [
    { path: '/', icon: LayoutDashboard, label: t('sidebar.dashboard') },
    { path: '/orders', icon: ShoppingCart, label: t('sidebar.orders') },
    { path: '/vendors', icon: Store, label: t('sidebar.vendors') },
    { path: '/customers', icon: Users, label: t('sidebar.customers') },
    { path: '/drivers', icon: Bike, label: t('sidebar.drivers') },
    { path: '/analytics', icon: BarChart3, label: t('sidebar.analytics') },
    { path: '/finance', icon: Wallet, label: t('sidebar.finance') },
    { path: '/dispatch-queue', icon: LayoutList, label: t('sidebar.dispatch') },
    { path: '/payments-review', icon: CreditCard, label: t('sidebar.payments') },
    { path: '/settings', icon: Settings, label: t('sidebar.settings') },
    { path: '/home-layout', icon: LayoutTemplate, label: t('sidebar.homeLayout') },
  ];

  const catalogLinks = [
    { path: '/products', icon: Package, label: t('sidebar.products') },
    { path: '/categories', icon: AppWindow, label: t('sidebar.categories') },
    { path: '/subcategories', icon: Layers, label: t('form.subCategory') },
  ];

  return (
    <aside className="w-72 bg-sidebar-bg h-full flex flex-col border-r rtl:border-r-0 rtl:border-l border-border-soft">
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="bg-primary p-2 rounded-lg cursor-pointer transition-transform hover:scale-105">
          <Truck className="w-6 h-6 text-white rtl:-scale-x-100" />
        </div>
        <span className="text-xl font-bold tracking-tight text-text-main whitespace-nowrap overflow-hidden">طلبك على السريع</span>
      </div>

      <nav className="px-4 flex-1 overflow-y-auto space-y-1 pb-10">
        {navLinks?.map((link) => (
          <NavLink 
            key={link.path} 
            to={link.path} 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive ? "bg-primary text-white font-medium shadow-sm" : "text-gray-600 hover:bg-white hover:text-text-main"
            }`}
          >
            <link.icon className="w-5 h-5" />
            <span className="text-sm">{link.label}</span>
          </NavLink>
        ))}

        {/* Catalog Group */}
        <div className="pt-4">
          <button 
            onClick={() => setIsCatalogOpen(!isCatalogOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-text-main transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-3 h-3" />
              Catalog
            </div>
            {isCatalogOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3 rtl:rotate-180" />}
          </button>
          
          {isCatalogOpen && (
            <div className="mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
              {catalogLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-primary/10 text-primary font-bold" : "text-gray-500 hover:bg-white hover:text-text-main"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-sm">{link.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="mt-auto border-t border-border-soft p-6 flex items-center justify-between hover:bg-white cursor-pointer transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary overflow-hidden flex items-center justify-center shadow-md">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mostafa" alt="Avatar" className="w-full h-full object-cover"/>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-text-main truncate">{user?.name || 'Guest'}</span>
            <span className="text-xs text-text-muted capitalize">{user?.role || 'admin'}</span>
          </div>
        </div>
        <button className="p-2 text-text-muted hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors group">
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
