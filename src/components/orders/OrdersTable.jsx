import React, { useState, useEffect } from 'react';
import { Eye, Pencil, Bike } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StatusBadge from '../ui/StatusBadge';
import StatusDropdown from './StatusDropdown';
import OrderDetailsModal from './OrderDetailsModal';
import AssignDriverModal from './AssignDriverModal';
import PaymentStatusBadge from './PaymentStatusBadge';
import EditOrderModal from './EditOrderModal';
import { getOrderById, updateOrderStatus } from '../../services/ordersService';
import { cn } from '../../utils/cn';
import { safeMap } from '../../utils/safeMap';

const OrdersTable = ({ ordersData, setOrdersData, selectedOrders, setSelectedOrders }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [assignOrderId, setAssignOrderId] = useState(null);
  const [highlightedOrderId, setHighlightedOrderId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const handleEditClick = (order) => {
    setEditOrder(order);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (updatedOrder) => {
    setOrdersData(prev => prev?.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  if (!ordersData?.length) return null;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(safeMap(ordersData, order => order?.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectRow = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };

  const isAllSelected = (ordersData || []).length > 0 && (selectedOrders || []).length === (ordersData || []).length;

  const handleView = async (orderId) => {
    setModalLoading(true);
    setIsModalOpen(true);
    try {
      const details = await getOrderById(orderId);
      setSelectedOrder(details);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleAssignClick = (orderId) => {
    setAssignOrderId(orderId);
    setIsAssignModalOpen(true);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrdersData(prev => prev?.map(order => 
        order?.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      // Trigger highlight animation
      setHighlightedOrderId(orderId);
      setTimeout(() => setHighlightedOrderId(null), 1000);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Callback for OrderDetailsModal to refresh data after payment verification
  const handleOrderUpdate = (updatedOrder) => {
    setOrdersData(prev => prev?.map(order => 
      order?.id === updatedOrder?.id ? updatedOrder : order
    ));
    setSelectedOrder(updatedOrder);
  };

  return (
    <div className="bg-white border border-border-soft rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        {!ordersData?.length ? null : (
        <table className="w-full text-sm text-left rtl:text-right">
          <thead>
            <tr className="bg-gray-50 border-b border-border-soft text-text-muted">
              <th className="px-6 py-4">
                <input 
                  type="checkbox" 
                  className="rounded border-border-soft text-primary focus:ring-primary/30 cursor-pointer"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">{t('table.orderId')}</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">{t('table.customer')}</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">{t('table.date')}</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">{t('table.total')}</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">{t('table.paymentStatus')}</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">{t('table.status')}</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right rtl:text-left">{t('table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {ordersData?.map((order) => (
              <tr 
                key={order?.id} 
                className={cn(
                  "transition-all duration-500",
                  highlightedOrderId === order?.id ? "bg-green-50" : "hover:bg-gray-50",
                  selectedOrders?.includes(order?.id) && "bg-primary/5"
                )}
              >
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-border-soft text-primary focus:ring-primary/30 cursor-pointer"
                    checked={selectedOrders?.includes(order?.id)}
                    onChange={() => handleSelectRow(order?.id)}
                  />
                </td>
                <td className="px-6 py-4 font-medium text-text-main">{order?.id}</td>
                <td className="px-6 py-4 text-text-main">{order?.customer}</td>
                <td className="px-6 py-4 text-text-muted">{order?.date}</td>
                <td className="px-6 py-4 font-semibold text-text-main">{order?.amount}</td>
                <td className="px-6 py-4 text-center">
                  <PaymentStatusBadge status={order?.paymentStatus} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={order?.status} minimal={true} />
                    <StatusDropdown 
                      status={order?.status} 
                      onChange={(newStatus) => handleStatusChange(order?.id, newStatus)} 
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-text-muted">
                    <button 
                      onClick={() => handleAssignClick(order?.id)}
                      className="p-2 hover:bg-indigo-50 rounded-lg hover:text-indigo-600 transition-colors"
                      title="Assign Driver"
                    >
                      <Bike className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleView(order?.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg hover:text-primary transition-colors"
                      title={t('table.viewDetails')}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditClick(order)}
                      className="p-2 hover:bg-gray-100 rounded-lg hover:text-primary transition-colors" 
                      title={t('table.editOrder')}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      <OrderDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        order={selectedOrder} 
        loading={modalLoading}
        onUpdate={handleOrderUpdate}
      />

      <EditOrderModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        order={editOrder} 
        onSave={handleEditSave}
      />

      {isAssignModalOpen && (
        <AssignDriverModal 
          orderId={assignOrderId}
          onClose={() => setIsAssignModalOpen(false)}
          onSuccess={(driverId) => {
            setIsAssignModalOpen(false);
            // Optionally update local order state to show assigned status
            setOrdersData(prev => prev.map(o => 
              o.id === assignOrderId ? { ...o, driverId, status: 'Shipped' } : o
            ));
          }}
        />
      )}
    </div>
  );
};

export default OrdersTable;
