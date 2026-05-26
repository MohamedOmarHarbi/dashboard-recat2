import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Box, Tag, Barcode, Layers, DollarSign, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProductById } from '../services/productsService';
import Badge from '../components/ui/Badge';

const ProductDetails = () => {
  console.log("Rendering page: ProductDetails");
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = await getProductById(id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          navigate('/products');
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-medium text-text-muted">Loading product details...</p>
      </div>
    );
  }

  if (!product) return null;

  const getStatusVariant = (status) => {
    switch (status) {
      case 'In Stock':
      case 'متوفر': return 'success';
      case 'Low Stock':
      case 'مخزون منخفض': return 'warning';
      case 'Out of Stock':
      case 'غير متوفر': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div className="flex flex-col gap-2">
          <Link to="/products" className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors w-fit group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            {t('backToProducts')}
          </Link>
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold text-text-main tracking-tight">{product?.name?.[i18n.language] || product?.name?.en}</h1>
            <p className="text-sm text-text-muted mt-1">{t('dashboard')} / {t('products')} / {product?.name?.[i18n.language] || product?.name?.en}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg shadow-sm transition-all font-semibold text-sm">
            <Edit className="w-4 h-4" />
            {t('editProduct')}
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border border-border-soft text-rose-600 bg-white hover:bg-rose-50 rounded-lg transition-all font-semibold text-sm">
            <Trash2 className="w-4 h-4" />
            {t('delete')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Product Description */}
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-border-soft pb-4">
              <div className="p-2 bg-page-bg text-primary rounded-lg"><Box className="w-5 h-5" /></div>
              <h3 className="text-lg font-bold text-text-main">{t('productInfo')}</h3>
            </div>
            <div className="space-y-4">
              <p className="text-text-main leading-relaxed text-base italic border-l-4 border-primary/20 ps-4 py-1 bg-page-bg rounded-r-lg">
                {product?.description?.[i18n.language] || product?.description?.en || ""}
              </p>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-border-soft pb-4">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
              <h3 className="text-lg font-bold text-text-main">{t('pricingDetails')}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-start">
              <div className="p-4 bg-page-bg rounded-xl border border-border-soft">
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest block mb-1">{t('basePrice')}</span>
                <span className="text-2xl font-black text-text-main">{product?.price}</span>
              </div>
              <div className="p-4 bg-page-bg border border-primary/20 rounded-xl">
                <span className="text-xs font-bold text-primary/60 uppercase tracking-widest block mb-1">{t('discountedPrice')}</span>
                <span className="text-2xl font-black text-primary">{product?.price}</span>
                <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-0.5 rounded ml-2">{product?.discount} OFF</span>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">{t('profitMargin')}</span>
                <span className="text-2xl font-black text-emerald-700">35%</span>
              </div>
            </div>
          </div>

          {/* Inventory info */}
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-border-soft pb-4">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Layers className="w-5 h-5" /></div>
              <h3 className="text-lg font-bold text-text-main">{t('inventoryStatus')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="bg-page-bg p-3 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors"><Barcode className="w-5 h-5" /></div>
                  <div>
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">{t('barcodeLabel')}</span>
                    <span className="text-sm font-bold text-text-main">{product?.barcode}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="bg-page-bg p-3 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors"><Tag className="w-5 h-5" /></div>
                  <div>
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">{t('skuLabel')}</span>
                    <span className="text-sm font-bold text-text-main">{product?.sku}</span>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden bg-text-main rounded-xl p-6 text-white flex flex-col justify-center">
                <div className="relative z-10">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">{t('stockLevel')}</span>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-black tracking-tighter">{product?.stock}</span>
                    <span className="text-lg font-bold text-text-muted pb-1">{t('pieces')}</span>
                  </div>
                  <div className="mt-4 w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${product.stock > 50 ? 'bg-emerald-500' : product.stock > 10 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${Math.min(product.stock, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Content Column */}
        <div className="space-y-8">
          
          {/* Main Visual */}
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm overflow-hidden group">
            <div className="p-8 pb-4">
              <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-4">{t('productImage')}</h3>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-page-bg border border-border-soft">
                <img 
                  src={product?.image} 
                  alt={product?.name?.[i18n.language] || product?.name?.en} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
            </div>
            <div className="px-8 py-6 bg-gray-50/80 border-t border-border-soft flex items-center justify-between">
               <span className="text-xs font-bold text-text-muted italic opacity-60">High Resolution Asset</span>
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>

          {/* Metadata Cards */}
          <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm p-8 space-y-6">
            <h3 className="text-sm font-black text-text-muted uppercase tracking-[0.2em] mb-2">{t('productMetadata')}</h3>
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest block">{t('category')}</span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-page-bg text-primary border border-primary/20 shadow-sm">
                {product?.category?.[i18n.language] || product?.category?.en}
              </span>
            </div>

            <div className="space-y-1 pt-4 border-t border-border-soft">
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest block">{t('status')}</span>
              <div className="pt-1">
                <Badge variant={getStatusVariant(product?.status?.en)}>{product?.status?.[i18n.language] || product?.status?.en}</Badge>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
