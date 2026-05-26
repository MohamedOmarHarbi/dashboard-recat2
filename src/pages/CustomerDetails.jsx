import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingBag, CreditCard, Loader2 } from 'lucide-react';
import { getCustomerById } from '../services/customersService';
import { cn } from '../utils/cn';

const CustomerDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerById(id);
        if (data) {
          setCustomer(data);
        } else {
          navigate('/customers');
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-bold text-text-muted tracking-widest uppercase">{t('customers.profileLoading')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col gap-4">
        <Link to="/customers" className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors w-fit group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t('customers.back')}
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg">
              {customer?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-black text-text-main tracking-tight">{customer?.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className={customer?.status === 'Active' ? 'text-emerald-600 font-bold text-xs' : 'text-rose-600 font-bold text-xs'}>
                  ● {customer?.status}
                </span>
                <span className="text-xs text-text-muted font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {t('customers.joined')} {customer?.joinedAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 space-y-6">
            <h3 className="text-sm font-black text-text-muted uppercase tracking-widest">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-page-bg rounded-lg border border-border-soft">
                <Mail className="w-4 h-4 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text-muted uppercase">Email</span>
                  <span className="text-sm font-semibold text-text-main">{customer?.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-page-bg rounded-lg border border-border-soft">
                <Phone className="w-4 h-4 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text-muted uppercase">Phone</span>
                  <span className="text-sm font-semibold text-text-main">{customer?.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 space-y-6">
            <h3 className="text-sm font-black text-text-muted uppercase tracking-widest">Addresses</h3>
            <div className="space-y-3">
              {customer?.addresses?.map(addr => (
                <div key={addr.id} className="p-4 border border-border-soft rounded-xl hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-primary/10 text-primary rounded-md">{addr.type}</span>
                    <MapPin className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                  <p className="text-sm font-bold text-text-main">{addr.street}</p>
                  <p className="text-xs text-text-muted font-medium mt-1">{addr.city}</p>
                </div>
              ))}
              {!customer?.addresses?.length && <p className="text-xs text-text-muted italic">No addresses saved.</p>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Total Orders</span>
                <span className="text-3xl font-black text-text-main">{customer?.orders}</span>
              </div>
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Total Spent</span>
                <span className="text-3xl font-black text-emerald-600">EGP {customer?.totalSpent?.toLocaleString()}</span>
              </div>
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border-soft">
              <h3 className="text-sm font-black text-text-muted uppercase tracking-widest">{t('customers.orderHistory')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-start text-sm">
                <thead className="bg-gray-50/50 border-b border-border-soft text-text-muted text-[10px] uppercase font-black">
                  <tr>
                    <th className="px-6 py-3 text-start">{t('table.orderId')}</th>
                    <th className="px-6 py-3 text-start">{t('table.date')}</th>
                    <th className="px-6 py-3 text-start">{t('table.total')}</th>
                    <th className="px-6 py-3 text-end">{t('table.status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {customer?.orderHistory?.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-text-main">{order.id}</td>
                      <td className="px-6 py-4 text-text-muted font-medium">{order.date}</td>
                      <td className="px-6 py-4 font-black text-text-main">EGP {order.amount}</td>
                      <td className="px-6 py-4 text-end">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          order.status === 'Delivered' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!customer?.orderHistory?.length && (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-text-muted italic">{t('table.noOrders')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
