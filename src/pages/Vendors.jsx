import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Filter, Loader2, Store } from 'lucide-react';
import { getVendors, deleteVendor, toggleVendorStatus } from '../services/vendorsService';
import VendorsTable from '../components/vendors/VendorsTable';

const Vendors = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const data = await getVendors();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await deleteVendor(id);
        setVendors(prev => prev.filter(v => v.id !== id));
      } catch (error) {
        console.error("Error deleting vendor:", error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await toggleVendorStatus(id, newStatus);
      setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const filteredVendors = vendors?.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         vendor.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">{t('vendors_module.title')}</h1>
            <p className="text-sm text-text-muted mt-0.5 font-medium">{t('vendors_module.desc')}</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/vendors/add')}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg shadow-md transition-all font-bold text-sm"
        >
          <Plus className="w-4 h-4" />
          {t('vendors_module.addNew')}
        </button>
      </div>

      <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border-soft flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder={t('vendors_module.searchPlaceholder')}
              className="w-full ps-10 pe-4 py-2.5 bg-input-bg border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select 
              className="w-full md:w-48 bg-white border border-border-soft rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer shadow-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">{t('vendors_module.allStatuses')}</option>
              <option value="Active">{t('vendors_module.activeOnly')}</option>
              <option value="Inactive">{t('vendors_module.inactiveOnly')}</option>
              <option value="Busy">{t('vendors_module.busy')}</option>
              <option value="Closed">{t('vendors_module.closed')}</option>
            </select>
            <button className="p-2.5 bg-white border border-border-soft text-text-muted hover:text-text-main rounded-lg shadow-sm transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-bold text-text-muted tracking-tight uppercase">{t('vendors_module.loading')}</p>
          </div>
        ) : (
          <VendorsTable 
            vendors={filteredVendors} 
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={(vendor) => navigate(`/vendors/edit/${vendor.id}`)}
          />
        )}
      </div>
    </div>
  );
};

export default Vendors;
