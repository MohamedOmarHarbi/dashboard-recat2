import { Eye, Trash2, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CustomerStatusToggle from './CustomerStatusToggle';

const CustomersTable = ({ customers, onDelete, onStatusToggle }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-start text-sm whitespace-nowrap rtl:text-end">
        <thead>
          <tr className="bg-gray-50/50 border-b border-border-soft text-text-muted uppercase text-[10px] tracking-widest">
            <th className="px-6 py-4 font-black text-start rtl:text-end">{t('table.name')}</th>
            <th className="px-6 py-4 font-black text-start rtl:text-end">{t('table.contact')}</th>
            <th className="px-6 py-4 font-black text-center">{t('table.orders')}</th>
            <th className="px-6 py-4 font-black text-start rtl:text-end">{t('table.totalSpent')}</th>
            <th className="px-6 py-4 font-black text-start rtl:text-end">{t('table.joinedDate')}</th>
            <th className="px-6 py-4 font-black text-start rtl:text-end">{t('table.status')}</th>
            <th className="px-6 py-4 font-black text-end rtl:text-start">{t('table.actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-soft">
          {customers?.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xs border border-primary/20 shadow-sm">
                    {customer.name.charAt(0)}
                  </div>
                  <span className="font-bold text-text-main">{customer.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Phone className="w-3 h-3" /> {customer.phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Mail className="w-3 h-3" /> {customer.email}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="font-black text-text-main">{customer.orders}</span>
              </td>
              <td className="px-6 py-4 font-black text-emerald-600">
                EGP {customer.totalSpent.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-text-muted font-medium">
                {customer.joinedAt}
              </td>
              <td className="px-6 py-4">
                <CustomerStatusToggle 
                  currentStatus={customer.status} 
                  onStatusToggle={(newStatus) => onStatusToggle(customer.id, newStatus)} 
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => navigate(`/customers/${customer.id}`)}
                    className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(customer.id)}
                    className="p-2 text-text-muted hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {!customers?.length && (
            <tr>
              <td colSpan="7" className="px-6 py-12 text-center text-text-muted font-medium italic">
                {t('table.noCustomers')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
