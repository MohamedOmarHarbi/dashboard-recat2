import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProducts, deleteProduct, getCategories } from '../services/productsService';
import ProductsTable from '../components/products/ProductsTable';

const Products = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const filteredProducts = products?.filter(product => {
    const name = typeof product.name === 'object' ? (product.name?.[i18n.language] || product.name?.en) : product.name;
    const category = typeof product.category === 'object' ? (product.category?.[i18n.language] || product.category?.en) : product.category;
    
    const matchesSearch = name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory || (typeof product.category === 'object' && product.category.en === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg p-6 rounded-xl border border-border-soft shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-text-main">{t('products_module.title')}</h1>
          <p className="text-sm text-text-muted mt-1.5">{t('products_module.desc')}</p>
        </div>
        <Link 
          to="/products/add" 
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg shadow-sm transition-all font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          {t('products_module.addProduct')}
        </Link>
      </div>

      <div className="bg-card-bg rounded-xl border border-border-soft shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border-soft flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder={t('products_module.searchPlaceholder')}
              className="w-full ps-10 pe-4 py-2.5 bg-input-bg border border-border-soft rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                className="w-full md:w-48 appearance-none bg-white border border-border-soft rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">{t('products_module.allCategories')}</option>
                {categories?.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-medium text-text-muted">{t('products_module.loading')}</p>
          </div>
        ) : (
          <ProductsTable 
            products={filteredProducts} 
            onDelete={handleDelete}
            onEdit={(product) => navigate(`/products/edit/${product.id}`)}
            onView={(id) => navigate(`/products/${id}`)}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
