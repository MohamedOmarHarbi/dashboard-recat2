export const recentOrders = [
  { id: '#ORD-001', productName: { en: 'Pepperoni Pizza', ar: 'بيتزا بيبيروني' }, customer: { en: 'Ahmed Mahmoud', ar: 'أحمد محمود' }, price: 'EGP 150.00', status: { en: 'Delivered', ar: 'تم التوصيل' }, variant: 'success' },
  { id: '#ORD-002', productName: { en: 'Double Beef Burger', ar: 'برجر لحم مضاعف' }, customer: { en: 'Sarah Khaled', ar: 'سارة خالد' }, price: 'EGP 120.00', status: { en: 'Pending', ar: 'قيد الانتظار' }, variant: 'warning' },
  { id: '#ORD-003', productName: { en: 'Mix Grills Platter', ar: 'طبق مشاوي مشكل' }, customer: { en: 'Mona Ahmed', ar: 'منى أحمد' }, price: 'EGP 250.00', status: { en: 'Cancelled', ar: 'ملغي' }, variant: 'danger' },
  { id: '#ORD-004', productName: { en: 'Large Koshary Box', ar: 'علبة كشري كبير' }, customer: { en: 'Omar Mostafa', ar: 'عمر مصطفى' }, price: 'EGP 45.00', status: { en: 'Delivered', ar: 'تم التوصيل' }, variant: 'success' },
];

export const topSellingProducts = [
  { id: 1, name: { en: 'Pepperoni Pizza', ar: 'بيتزا بيبيروني' }, sales: { en: '1,245 sales', ar: '1,245 مبيعة' }, price: 'EGP 150.00' },
  { id: 2, name: { en: 'Double Beef Burger', ar: 'برجر لحم مضاعف' }, sales: { en: '982 sales', ar: '982 مبيعة' }, price: 'EGP 120.00' },
  { id: 3, name: { en: 'Large Koshary Box', ar: 'علبة كشري كبير' }, sales: { en: '840 sales', ar: '840 مبيعة' }, price: 'EGP 45.00' },
  { id: 4, name: { en: 'Mix Grills Platter', ar: 'طبق مشاوي مشكل' }, sales: { en: '650 sales', ar: '650 مبيعة' }, price: 'EGP 250.00' },
];

export const revenueData = [
  { name: { en: 'Jan', ar: 'يناير' }, total: 12000 },
  { name: { en: 'Feb', ar: 'فبراير' }, total: 21000 },
  { name: { en: 'Mar', ar: 'مارس' }, total: 18000 },
  { name: { en: 'Apr', ar: 'أبريل' }, total: 24000 },
  { name: { en: 'May', ar: 'مايو' }, total: 28000 },
  { name: { en: 'Jun', ar: 'يونيو' }, total: 23000 },
  { name: { en: 'Jul', ar: 'يوليو' }, total: 32000 },
];

export const secondaryChartData = [
  { name: { en: 'Pizza', ar: 'بيتزا' }, value: 8000 },
  { name: { en: 'Burgers', ar: 'برجر' }, value: 6500 },
  { name: { en: 'Koshary', ar: 'كشري' }, value: 4500 },
  { name: { en: 'Grills', ar: 'مشاوي' }, value: 3000 },
];

const sharedDescEn = 'Freshly prepared with the finest ingredients to satisfy your hunger. Quality you can taste in every bite.';
const sharedDescAr = 'حُضّر طازجاً بأجود المكونات لإرضاء جوعك. جودة يمكنك تذوقها في كل قضمة.';

export const productsData = [
  { 
    id: 1, 
    name: { en: 'Pepperoni Pizza', ar: 'بيتزا بيبيروني' }, 
    category: { en: 'Pizza', ar: 'بيتزا' }, 
    price: 'EGP 150.00', 
    stock: 50, 
    status: { en: 'In Stock', ar: 'متوفر' }, 
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=200&auto=format&fit=crop',
    description: { en: sharedDescEn, ar: sharedDescAr },
    sku: 'PIZ-001',
    barcode: 'PZ12345678',
    discount: '10%'
  },
  { 
    id: 2, 
    name: { en: 'Double Beef Burger', ar: 'برجر لحم مضاعف' }, 
    category: { en: 'Burgers', ar: 'برجر' }, 
    price: 'EGP 120.00', 
    stock: 35, 
    status: { en: 'Low Stock', ar: 'مخزون منخفض' }, 
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop',
    description: { en: sharedDescEn, ar: sharedDescAr },
    sku: 'BRG-002',
    barcode: 'BG98765432',
    discount: '5%'
  },
  { 
    id: 3, 
    name: { en: 'Large Koshary Box', ar: 'علبة كشري كبير' }, 
    category: { en: 'Egyptian', ar: 'شرقي' }, 
    price: 'EGP 45.00', 
    stock: 100, 
    status: { en: 'In Stock', ar: 'متوفر' }, 
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=200&auto=format&fit=crop',
    description: { en: sharedDescEn, ar: sharedDescAr },
    sku: 'KSH-003',
    barcode: 'KS45678912',
    discount: '0%'
  },
  { 
    id: 4, 
    name: { en: 'Mix Grills Platter', ar: 'طبق مشاوي مشكل' }, 
    category: { en: 'Grills', ar: 'مشاوي' }, 
    price: 'EGP 250.00', 
    stock: 20, 
    status: { en: 'Low Stock', ar: 'مخزون منخفض' }, 
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=200&auto=format&fit=crop',
    description: { en: sharedDescEn, ar: sharedDescAr },
    sku: 'GRL-004',
    barcode: 'GR32165498',
    discount: '15%'
  },
  { 
    id: 5, 
    name: { en: 'Chicken Shawarma Wrap', ar: 'ساندوتش شاورما دجاج' }, 
    category: { en: 'Wraps', ar: 'سندوتشات' }, 
    price: 'EGP 70.00', 
    stock: 80, 
    status: { en: 'In Stock', ar: 'متوفر' }, 
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=200&auto=format&fit=crop',
    description: { en: sharedDescEn, ar: sharedDescAr },
    sku: 'SHW-005',
    barcode: 'SH74185296',
    discount: '0%'
  },
  { 
    id: 6, 
    name: { en: 'Hawawshi Extra Hot', ar: 'حواوشي حار جداً' }, 
    category: { en: 'Egyptian', ar: 'شرقي' }, 
    price: 'EGP 60.00', 
    stock: 0, 
    status: { en: 'Out of Stock', ar: 'غير متوفر' }, 
    image: 'https://images.unsplash.com/photo-1589135339644-ed0fa6963f4b?q=80&w=200&auto=format&fit=crop',
    description: { en: sharedDescEn, ar: sharedDescAr },
    sku: 'HW-006',
    barcode: 'HW95175346',
    discount: '10%'
  },
];
