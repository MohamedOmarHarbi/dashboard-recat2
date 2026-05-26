import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Truck, Loader2, Mail, Lock } from 'lucide-react';

const Login = () => {
  const { t } = useTranslation();
  console.log("Rendering page: Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-border-soft rounded-2xl shadow-xl p-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary p-3 rounded-2xl shadow-lg mb-4">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-text-main tracking-tight">{t('auth.loginTitle')}</h1>
          <p className="text-sm text-text-muted mt-2">{t('auth.loginDesc')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider ps-1">{t('auth.email')}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  className="w-full ps-10 pe-4 py-3 bg-input-bg border border-border-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="admin@delivery.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider ps-1">{t('auth.password')}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  className="w-full ps-10 pe-4 py-3 bg-input-bg border border-border-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('auth.signingIn')}</span>
              </>
            ) : (
              <span>{t('auth.signIn')}</span>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-xs text-text-muted">
            &copy; 2026 Delivery Admin Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
