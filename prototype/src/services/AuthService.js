// Authentication service for user management
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseReady } from '../firebase';

class AuthService {
  constructor() {
    this.user = null;
    this.loading = true;
  }

  // Initialize auth listener
  initialize(callback) {
    if (!isFirebaseReady()) {
      console.log('Auth service running in offline mode');
      this.loading = false;
      if (callback) callback(null);
      return;
    }

    return onAuthStateChanged(auth, async (user) => {
      this.user = user;
      this.loading = false;
      
      if (user) {
        // Update user's last login
        await this.updateUserData({
          lastLogin: serverTimestamp()
        });
      }
      
      if (callback) callback(user);
    });
  }

  // Sign up with email and password
  async signUp(email, password, displayName) {
    if (!isFirebaseReady()) {
      throw new Error('Firebase not configured. Running in offline mode.');
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      
      // Create user document in Firestore
      await this.createUserProfile(user, { displayName });
      
      // Send email verification
      await sendEmailVerification(user);
      
      return user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    if (!isFirebaseReady()) {
      throw new Error('Firebase not configured. Running in offline mode.');
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Sign out
  async signOut() {
    if (!isFirebaseReady()) {
      this.user = null;
      return;
    }

    try {
      await signOut(auth);
      this.user = null;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(email) {
    if (!isFirebaseReady()) {
      throw new Error('Firebase not configured. Running in offline mode.');
    }

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Create user profile in Firestore
  async createUserProfile(user, additionalData = {}) {
    if (!isFirebaseReady() || !user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || additionalData.displayName || '',
          createdAt: serverTimestamp(),
          emailVerified: user.emailVerified,
          // Mental health app specific fields
          preferences: {
            notifications: true,
            darkMode: false,
            reminderTime: '09:00'
          },
          privacy: {
            analyticsOptIn: true,
            shareProgress: false
          },
          ...additionalData
        };

        await setDoc(userRef, userData);
        console.log('User profile created successfully');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }

  // Update user data
  async updateUserData(data) {
    if (!isFirebaseReady() || !this.user) return;

    try {
      const userRef = doc(db, 'users', this.user.uid);
      await setDoc(userRef, data, { merge: true });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }

  // Get user profile data
  async getUserProfile() {
    if (!isFirebaseReady() || !this.user) return null;

    try {
      const userRef = doc(db, 'users', this.user.uid);
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Handle authentication errors
  handleAuthError(error) {
    const errorMessages = {
      'auth/user-not-found': 'No existe una cuenta con este email.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/email-already-in-use': 'Ya existe una cuenta con este email.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
      'auth/invalid-email': 'Email inválido.',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde.',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet.'
    };

    const message = errorMessages[error.code] || error.message;
    return new Error(message);
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.user;
  }

  // Check if loading
  isLoading() {
    return this.loading;
  }
}

// Create singleton instance
const authService = new AuthService();
export default authService;
