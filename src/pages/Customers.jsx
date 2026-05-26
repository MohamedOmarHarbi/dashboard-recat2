import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Loader2, Calendar, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getCustomers, deleteCustomer, updateCustomerStatus } from '../services/customersService';
import CustomersTable from '../components/customers/CustomersTable';
import CustomerPaymentsPanel from '../components/customers/CustomerPaymentsPanel';
import { ordersList } from '../utils/mockOrdersList';
import { cn } from '../utils/cn';

const Customers = () => {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All'); // 'All', 'Today', 'OrdersToday'

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        setCustomers(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      await updateCustomerStatus(id, newStatus);
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (error) {
       fetchCustomers();
    }
  };

  const filteredCustomers = customers?.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         customer.phone.includes(searchTerm) || 
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    
    let matchesDate = true;
    const todayStr = new Date().toISOString().split('T')[0];
    
    if (dateFilter === 'Today') {
      matchesDate = customer.joinedAt === todayStr;
    } else if (dateFilter === 'OrdersToday') {
      const customerHasOrderToday = ordersList.some(order => 
        order.customer === customer.name && order.date === todayStr
      );
      matchesDate = customerHasOrderToday;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">{t('customers_module.title')}</h1>
            <p className="text-sm text-text-muted mt-0.5 font-medium">{t('customers_module.desc')}</p>
          </div>
        </div>
      </div>

      {/* Quick Filters Panel */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-border-soft shadow-sm">
        <button 
          onClick={() => setDateFilter('All')}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-bold transition-all border",
            dateFilter === 'All' ? "bg-primary text-white border-primary shadow-md" : "bg-white text-text-muted border-border-soft hover:bg-gray-50"
          )}
        >
          {t('customers_module.all')}
        </button>
        <button 
          onClick={() => setDateFilter('Today')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border",
            dateFilter === 'Today' ? "bg-primary text-white border-primary shadow-md" : "bg-white text-text-muted border-border-soft hover:bg-gray-50"
          )}
        >
          <Calendar className="w-4 h-4" />
          {t('customers_module.today')}
        </button>
        <button 
          onClick={() => setDateFilter('OrdersToday')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border",
            dateFilter === 'OrdersToday' ? "bg-primary text-white border-primary shadow-md" : "bg-white text-text-muted border-border-soft hover:bg-gray-50"
          )}
        >
          <ShoppingBag className="w-4 h-4" />
          {t('customers_module.withOrdersToday')}
        </button>
      </div>

      <CustomerPaymentsPanel />

      <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border-soft flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder={t('customers_module.searchPlaceholder')}
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
              <option value="All">{t('customers_module.allStatuses')}</option>
              <option value="Active">{t('customers_module.activeOnly')}</option>
              <option value="Blocked">{t('customers_module.blockedOnly')}</option>
            </select>
            <button className="p-2.5 bg-white border border-border-soft text-text-muted hover:text-text-main rounded-lg shadow-sm transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-black text-text-muted tracking-widest uppercase">{t('customers_module.syncing')}</p>
          </div>
        ) : (
          <CustomersTable 
            customers={filteredCustomers} 
            onDelete={handleDelete}
            onStatusToggle={handleStatusToggle}
          />
        )}
      </div>
    </div>
  );
};

export default Customers;
