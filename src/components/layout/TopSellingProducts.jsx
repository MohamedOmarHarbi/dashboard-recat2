import React, { useState, useEffect } from 'react';
import DashboardCard from '../ui/DashboardCard';
import { getTopSellingProducts } from '../../services/productsService';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TopSellingProducts = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const data = await getTopSellingProducts();
        setTopProducts(data);
      } catch (error) {
        console.error("Failed to fetch top products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  if (!topProducts) return null;

  const actionButton = (
    <button className="text-sm text-primary font-medium hover:underline">
      {t('products.viewAll')}
    </button>
  );

  return (
    <DashboardCard title={t('products.topSelling')} action={actionButton}>
      <div className="flex flex-col min-h-[300px] justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <p className="text-xs text-text-muted">{t('products.loading')}</p>
          </div>
        ) : (
          topProducts?.map((product) => {
            const productName = typeof product?.name === 'object' ? (product?.name?.[lang] || product?.name?.en) : product?.name;
            const safeName = productName || "Unknown Product";
            
            return (
              <div 
                key={product.id} 
                className="flex items-center justify-between py-3 border-b last:border-none"
              >
                <div className="flex items-center">
                  {/* Product avatar placeholder */}
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-text-muted uppercase">
                    {typeof safeName === "string" ? safeName.charAt(0) : "P"}
                  </div>
                  
                  <div className="flex flex-col ml-3 rtl:mr-3 rtl:ml-0">
                    <span className="text-sm font-semibold text-text-main">
                      {safeName}
                    </span>
                    <span className="text-xs text-text-muted">
                      {typeof product?.sales === 'object' ? (product.sales?.[i18n.language] || product.sales?.en) : product?.sales}
                    </span>
                  </div>
                </div>

                <div className="text-sm font-semibold text-text-main">
                  {product.revenue || product.price}
                </div>
              </div>
            );
          })
        )}
      </div>
    </DashboardCard>
  );
};

export default TopSellingProducts;
