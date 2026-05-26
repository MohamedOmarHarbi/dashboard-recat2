import { Edit, Trash2, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProductsTable = ({ products, onEdit, onDelete, onView }) => {
  const { t, i18n } = useTranslation();

  const getStatusStyle = (status) => {
    const s = typeof status === 'object' ? status.en : status;
    switch (s) {
      case 'In Stock': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Low Stock': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Out of Stock': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-start text-sm whitespace-nowrap rtl:text-end">
        <thead>
          <tr className="bg-gray-50/50 border-b border-border-soft text-text-muted">
            <th className="px-6 py-4 font-semibold text-start rtl:text-end">{t('table.image')}</th>
            <th className="px-6 py-4 font-semibold text-start rtl:text-end">{t('table.productName')}</th>
            <th className="px-6 py-4 font-semibold text-start rtl:text-end">{t('table.category')}</th>
            <th className="px-6 py-4 font-semibold text-start rtl:text-end">{t('table.price')}</th>
            <th className="px-6 py-4 font-semibold text-start rtl:text-end">{t('table.status')}</th>
            <th className="px-6 py-4 font-semibold text-end rtl:text-start">{t('table.actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-soft">
          {products?.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4">
                <img 
                  src={product.image} 
                  alt="" 
                  className="w-12 h-12 rounded-lg object-cover border border-border-soft shadow-sm"
                />
              </td>
              <td className="px-6 py-4">
                <span className="font-semibold text-text-main">
                  {typeof product.name === 'object' ? (product.name?.[i18n.language] || product.name?.en) : product.name}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  {typeof product.category === 'object' ? (product.category?.[i18n.language] || product.category?.en) : product.category}
                </span>
              </td>
              <td className="px-6 py-4 font-bold text-text-main">
                {product.price}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(product.status)}`}>
                  {typeof product.status === 'object' ? (product.status?.[i18n.language] || product.status?.en) : product.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onView(product.id)}
                    className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onEdit(product)}
                    className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(product.id)}
                    className="p-2 text-text-muted hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products?.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-10 text-center text-text-muted font-medium">
                {t('table.noProducts')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
