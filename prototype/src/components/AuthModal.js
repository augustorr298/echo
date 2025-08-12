import React, { useState } from 'react';
import authService from '../services/AuthService';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await authService.signIn(formData.email, formData.password);
      } else {
        // Sign up
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Las contraseñas no coinciden');
        }
        await authService.signUp(formData.email, formData.password, formData.displayName);
      }
      
      onAuthSuccess();
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required={!isLogin}
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-500 hover:bg-violet-600 disabled:bg-violet-300 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-violet-600 hover:text-violet-700 text-sm"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>

        <div className="mt-4 text-xs text-slate-500 text-center">
          {!isLogin && 'Te enviaremos un email de verificación después del registro.'}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
