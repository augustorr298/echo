import React, { useState, useEffect } from 'react';
import { getUserPreferences, saveUserPreferences } from './firestoreHelpers';
import authService from '../services/AuthService';
import { Moon, Sun, Bell, BellOff, Shield, HelpCircle, LogOut, Trash2, Download } from './icons';

const AjustesScreen = () => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    reminderFrequency: 'daily',
    dataSharing: false,
    autoBackup: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.initialize(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userPrefs = await getUserPreferences();
        setPreferences(prev => ({ ...prev, ...userPrefs }));
      }
      setLoading(false);
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  // Apply dark mode to document - DISABLED FOR NOW
  useEffect(() => {
    // TODO: Re-enable when dark mode is fully implemented across all components
    // if (preferences.darkMode) {
    //   document.documentElement.classList.add('dark');
    // } else {
    //   document.documentElement.classList.remove('dark');
    // }
  }, [preferences.darkMode]);

  const updatePreference = async (key, value) => {
    if (!user || saving) return;
    
    setSaving(true);
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    
    try {
      await saveUserPreferences(newPrefs);
    } catch (error) {
      console.error('Error saving preferences:', error);
      // Revert on error
      setPreferences(preferences);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      await authService.signOut();
    }
  };

  const ToggleSwitch = ({ enabled, onToggle, disabled = false }) => (
    <button
      onClick={onToggle}
      disabled={disabled || saving}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-violet-500' : 'bg-slate-300'
      } ${disabled || saving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingItem = ({ icon: Icon, title, description, children, onClick, isButton = false }) => (
    <div 
      className={`bg-white/80 p-4 rounded-2xl shadow-sm ${
        isButton ? 'cursor-pointer hover:bg-white/90 transition-colors' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-slate-600" />
          <div>
            <span className="font-semibold text-slate-700">{title}</span>
            {description && (
              <p className="text-xs text-slate-500 mt-0.5">{description}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6 space-y-4 animate-fade-in">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Ajustes</h1>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-slate-200/50 p-4 rounded-2xl animate-pulse h-16" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 animate-fade-in min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Ajustes</h1>
      
      {/* Appearance */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-700 mb-2">Apariencia</h2>
        
        <SettingItem
          icon={preferences.darkMode ? Moon : Sun}
          title="Modo Oscuro"
          description="Próximamente - Interfaz más suave para los ojos"
        >
          <ToggleSwitch
            enabled={preferences.darkMode}
            onToggle={() => updatePreference('darkMode', !preferences.darkMode)}
            disabled={true}
          />
        </SettingItem>
      </div>

      {/* Notifications */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-700 mb-2">Notificaciones</h2>
        
        <SettingItem
          icon={preferences.notifications ? Bell : BellOff}
          title="Recordatorios"
          description="Recibe notificaciones para cuidar tu bienestar"
        >
          <ToggleSwitch
            enabled={preferences.notifications}
            onToggle={() => updatePreference('notifications', !preferences.notifications)}
          />
        </SettingItem>

        <SettingItem
          icon={Bell}
          title="Frecuencia de Recordatorios"
          description="Con qué frecuencia quieres recibir recordatorios"
        >
          <select
            value={preferences.reminderFrequency}
            onChange={(e) => updatePreference('reminderFrequency', e.target.value)}
            disabled={!preferences.notifications || saving}
            className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm border-0 focus:ring-2 focus:ring-violet-500"
          >
            <option value="never">Nunca</option>
            <option value="daily">Diario</option>
            <option value="weekly">Semanal</option>
            <option value="custom">Personalizado</option>
          </select>
        </SettingItem>
      </div>

      {/* Privacy & Data */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-700 mb-2">Privacidad y Datos</h2>
        
        <SettingItem
          icon={Shield}
          title="Compartir Datos Anónimos"
          description="Ayuda a mejorar la app compartiendo estadísticas anónimas"
        >
          <ToggleSwitch
            enabled={preferences.dataSharing}
            onToggle={() => updatePreference('dataSharing', !preferences.dataSharing)}
          />
        </SettingItem>

        <SettingItem
          icon={Download}
          title="Respaldo Automático"
          description="Guarda tus datos de forma segura en la nube"
        >
          <ToggleSwitch
            enabled={preferences.autoBackup}
            onToggle={() => updatePreference('autoBackup', !preferences.autoBackup)}
          />
        </SettingItem>
      </div>

      {/* Support & Account */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-700 mb-2">Soporte</h2>
        
        <SettingItem
          icon={HelpCircle}
          title="Ayuda y Soporte"
          description="Obtén ayuda o reporta un problema"
          isButton={true}
          onClick={() => window.open('mailto:support@echoapp.com')}
        />

        <SettingItem
          icon={LogOut}
          title="Cerrar Sesión"
          description="Sal de tu cuenta de forma segura"
          isButton={true}
          onClick={handleSignOut}
        />
      </div>

      {/* Danger Zone */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-red-600 mb-2">Zona de Riesgo</h2>
        
        <SettingItem
          icon={Trash2}
          title="Eliminar Cuenta"
          description="Elimina permanentemente tu cuenta y todos los datos"
          isButton={true}
          onClick={() => {
            if (window.confirm('¿Estás completamente seguro? Esta acción no se puede deshacer.')) {
              alert('Función de eliminación de cuenta en desarrollo');
            }
          }}
        />
      </div>

      {/* App Info */}
      <div className="pt-6 text-center border-t border-slate-200">
        <p className="text-xs text-slate-400">
          Echo v1.0.0 • Hecho con 💜 para tu bienestar
        </p>
      </div>
    </div>
  );
};

export default AjustesScreen;
