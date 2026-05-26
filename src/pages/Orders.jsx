import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import OrdersFilters from '../components/orders/OrdersFilters';
import OrdersTable from '../components/orders/OrdersTable';
import OrdersPagination from '../components/orders/OrdersPagination';
import BulkActionsToolbar from '../components/orders/BulkActionsToolbar';
import ExportOrdersButton from '../components/orders/ExportOrdersButton';
import AdvancedFiltersPanel from '../components/orders/AdvancedFiltersPanel';
import OrdersStats from '../components/orders/OrdersStats';
import { getOrders } from '../services/ordersService';
import { CheckCircle, SlidersHorizontal, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

const Orders = () => {
  const { t } = useTranslation();
  console.log("Rendering page: Orders");
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrdersData(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const [advFilters, setAdvFilters] = useState({
    fromDate: '',
    toDate: '',
    paymentMethod: 'All',
    statusList: [],
    minAmount: '',
    maxAmount: ''
  });

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleResetFilters = () => {
    setAdvFilters({
      fromDate: '',
      toDate: '',
      paymentMethod: 'All',
      statusList: [],
      minAmount: '',
      maxAmount: ''
    });
    setSearchTerm('');
  };

  const filteredOrders = useMemo(() => {
    return (ordersData || []).filter(order => {
      // Search filter
      const safeCustomer = typeof order?.customer === 'string' ? order.customer.toLowerCase() : '';
      const safeOrderId = typeof order?.id === 'string' ? order.id.toLowerCase() : String(order?.id || '').toLowerCase();
      const safeSearch = typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '';

      const matchesSearch = safeCustomer.includes(safeSearch) || safeOrderId.includes(safeSearch);

      // Date filter
      const orderDate = new Date(order?.date);
      const matchesFromDate = !advFilters?.fromDate || orderDate >= new Date(advFilters.fromDate);
      const matchesToDate = !advFilters?.toDate || orderDate <= new Date(advFilters.toDate);

      // Payment method filter
      const matchesPayment = advFilters?.paymentMethod === 'All' || order?.paymentMethod === advFilters?.paymentMethod;

      // Status filter
      const matchesStatus = (advFilters?.statusList || []).length === 0 || advFilters?.statusList?.includes(order?.status);

      // Amount filter
      const amount = typeof order?.amount === 'number' 
        ? order.amount 
        : parseFloat(String(order?.amount || '0').replace('$', '').replace(',', ''));
      const matchesMinAmount = !advFilters?.minAmount || amount >= parseFloat(advFilters?.minAmount);
      const matchesMaxAmount = !advFilters?.maxAmount || amount <= parseFloat(advFilters?.maxAmount);

      return matchesSearch && matchesFromDate && matchesToDate && matchesPayment && matchesStatus && matchesMinAmount && matchesMaxAmount;
    });
  }, [ordersData, searchTerm, advFilters]);

  const handleBulkStatusUpdate = (newStatus) => {
    setOrdersData(prev => prev?.map(order =>
      selectedOrders?.includes(order?.id) ? { ...order, status: newStatus } : order
    ));
    setSelectedOrders([]); // Clear selection after action
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${(selectedOrders || []).length} orders?`)) {
      setOrdersData(prev => (prev || []).filter(order => !selectedOrders?.includes(order?.id)));
      setSelectedOrders([]); // Clear selection after action
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-10 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-page-bg/50 backdrop-blur-sm rounded-xl">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-medium text-text-muted">{t('orders_module.loading')}</p>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-8 z-50 animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium text-sm">{notification}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">{t('orders_module.title')}</h1>
          <p className="text-sm text-text-muted mt-1">{t('orders_module.desc')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all shadow-sm",
              isAdvancedFilterOpen
                ? "bg-primary/10 border-primary text-primary"
                : "bg-white border-border-soft text-text-main hover:bg-gray-50"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {isAdvancedFilterOpen ? t('orders_module.hideFilters') : t('orders_module.advancedFilters')}
          </button>
          <ExportOrdersButton
            ordersData={filteredOrders}
            selectedOrders={selectedOrders}
            onNotify={showNotification}
          />
        </div>
      </div>

      <OrdersStats orders={filteredOrders} />

      <div className="space-y-4">
        <OrdersFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {isAdvancedFilterOpen && (
          <AdvancedFiltersPanel
            filters={advFilters}
            setFilters={setAdvFilters}
            onReset={handleResetFilters}
            onApply={() => setIsAdvancedFilterOpen(false)}
          />
        )}
      </div>

      <div className="flex flex-col gap-4 relative">
        <BulkActionsToolbar
          selectedOrders={selectedOrders}
          onStatusChange={handleBulkStatusUpdate}
          onDelete={handleBulkDelete}
        />

        <OrdersTable
          ordersData={filteredOrders || []}
          setOrdersData={setOrdersData}
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
        />
        <OrdersPagination totalItems={filteredOrders?.length || 0} />
      </div>
    </div>
  );
};

export default Orders;
