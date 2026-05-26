import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const MainLayout = () => {
  const { i18n } = useTranslation();
  
  return (
    <div className="flex h-screen w-full bg-page-bg overflow-hidden" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <Sidebar />

      {/* Main content container */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
