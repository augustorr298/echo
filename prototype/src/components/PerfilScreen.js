import React, { useState, useEffect } from 'react';
import { User, Settings, BarChart3, Shield, LogOut, Edit3, Save, X } from './icons';
import authService from '../services/AuthService';
import AuthModal from './AuthModal';
import { getUserPreferences, saveUserPreferences, getUserInterventionStats, getUserAssessments } from './firestoreHelpers';

const PerfilScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [preferences, setPreferences] = useState({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ displayName: '' });

  useEffect(() => {
    // Initialize auth and get user data
    const unsubscribe = authService.initialize((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        loadUserData();
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const loadUserData = async () => {
    try {
      // Load user preferences
      const userPrefs = await getUserPreferences();
      setPreferences(userPrefs);

      // Load user stats
      const stats = await getUserInterventionStats();
      setUserStats(stats);

      // Set edit form data
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setEditForm({ displayName: currentUser.displayName || '' });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setUserStats(null);
      setPreferences({});
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Update display name in Firebase Auth
      const currentUser = authService.getCurrentUser();
      if (currentUser && editForm.displayName.trim()) {
        await currentUser.updateProfile({
          displayName: editForm.displayName.trim()
        });
        
        // Update local state
        setUser({ ...currentUser, displayName: editForm.displayName.trim() });
      }
      
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const togglePreference = async (key) => {
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key]
    };
    
    setPreferences(newPreferences);
    
    try {
      await saveUserPreferences(newPreferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Hace poco';
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long'
      });
    } catch {
      return 'Hace poco';
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center animate-fade-in">
        <div className="animate-spin w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-slate-500 mt-4">Cargando perfil...</p>
      </div>
    );
  }

  // Not authenticated - show login prompt
  if (!user) {
    return (
      <div className="p-6 space-y-6 text-center animate-fade-in">
        <div className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
          <User className="w-12 h-12 text-violet-600" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Tu Perfil</h1>
          <p className="text-slate-500 mb-6">
            Inicia sesión para acceder a tu perfil personalizado y guardar tu progreso
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </button>
          
          <div className="text-sm text-slate-500">
            <p>✅ Guarda tu progreso</p>
            <p>✅ Personaliza tu experiencia</p>
            <p>✅ Accede desde cualquier dispositivo</p>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={() => {
            setShowAuthModal(false);
            loadUserData();
          }}
        />
      </div>
    );
  }

  // Authenticated - show full profile
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Profile Header */}
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-full w-24 h-24 mx-auto flex items-center justify-center text-white text-2xl font-bold">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          {user.emailVerified && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>

        <div>
          {isEditingProfile ? (
            <div className="flex items-center gap-2 justify-center">
              <input
                type="text"
                value={editForm.displayName}
                onChange={(e) => setEditForm({ displayName: e.target.value })}
                className="text-xl font-bold text-slate-800 bg-transparent border-b-2 border-violet-500 text-center focus:outline-none"
                placeholder="Tu nombre"
              />
              <button
                onClick={handleSaveProfile}
                className="text-green-600 hover:text-green-700"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-slate-500 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-center">
              <h1 className="text-xl font-bold text-slate-800">
                {user.displayName || 'Usuario de ECHO'}
              </h1>
              <button
                onClick={() => setIsEditingProfile(true)}
                className="text-slate-500 hover:text-violet-600"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <p className="text-slate-500 text-sm">{user.email}</p>
          <p className="text-slate-400 text-xs">
            Miembro desde {formatDate(user.metadata?.creationTime)}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {userStats && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/90 p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-violet-600">{userStats.totalSessions || 0}</div>
            <div className="text-sm text-slate-500">Sesiones de calma</div>
          </div>
          <div className="bg-white/90 p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round((userStats.totalMinutes || 0) / 60)}h</div>
            <div className="text-sm text-slate-500">Tiempo dedicado</div>
          </div>
        </div>
      )}

      {/* Preferences Section */}
      <div className="bg-white/90 rounded-xl shadow-sm p-5">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Preferencias
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Notificaciones</span>
            <button
              onClick={() => togglePreference('notifications')}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.notifications ? 'bg-violet-500' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Modo oscuro</span>
            <button
              onClick={() => togglePreference('darkMode')}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.darkMode ? 'bg-violet-500' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.darkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-700">Compartir progreso</span>
            <button
              onClick={() => togglePreference('shareProgress')}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.shareProgress ? 'bg-violet-500' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.shareProgress ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-white/90 rounded-xl shadow-sm p-5">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Cuenta
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Email verificado</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.emailVerified ? 'Verificado' : 'Pendiente'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Último acceso</span>
            <span className="text-slate-500 text-sm">
              {formatDate(user.metadata?.lastSignInTime)}
            </span>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        Cerrar Sesión
      </button>
    </div>
  );
};

export default PerfilScreen;
