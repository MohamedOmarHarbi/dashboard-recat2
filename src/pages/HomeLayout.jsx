import React, { useState, useEffect } from 'react';
import { Plus, LayoutTemplate, Loader2, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getHomeLayout, deleteBanner } from '../services/homeLayoutService';
import { getCategories } from '../services/productsService';
import FeaturedCategoriesSelector from '../components/home/FeaturedCategoriesSelector';
import BannersTable from '../components/home/BannersTable';
import AddBannerModal from '../components/home/AddBannerModal';

const HomeLayout = () => {
  const { t } = useTranslation();
  const [layout, setLayout] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [layoutData, categoriesData] = await Promise.all([
        getHomeLayout(),
        getCategories()
      ]);
      setLayout(layoutData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching home layout:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBanner = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await deleteBanner(id);
        setLayout(prev => ({
          ...prev,
          banners: prev.banners.filter(b => b.id !== id)
        }));
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-black text-text-muted tracking-widest uppercase">Syncing layout configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <LayoutTemplate className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">{t('sidebar.homeLayout')}</h1>
            <p className="text-sm text-text-muted mt-1 font-medium">Customize the mobile app's front page experience for your users.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchData}
            className="p-3 bg-white border border-border-soft text-text-muted hover:text-primary rounded-xl shadow-sm transition-all"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              setEditingBanner(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg transition-all font-bold text-sm"
          >
            <Plus className="w-4 h-4 stroke-[3px]" />
            New Banner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <FeaturedCategoriesSelector initialSelectedIds={layout?.featuredCategories} />
        
        <BannersTable 
          banners={layout?.banners} 
          categories={categories}
          onEdit={(banner) => {
            setEditingBanner(banner);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteBanner}
          onStatusChange={(id, newStatus) => {
            setLayout(prev => ({
              ...prev,
              banners: prev.banners.map(b => b.id === id ? { ...b, status: newStatus } : b)
            }));
          }}
        />
      </div>

      {isModalOpen && (
        <AddBannerModal 
          banner={editingBanner}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default HomeLayout;
