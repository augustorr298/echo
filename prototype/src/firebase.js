// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Check if all required environment variables are available
const hasValidConfig = 
  process.env.REACT_APP_FIREBASE_API_KEY &&
  process.env.REACT_APP_FIREBASE_AUTH_DOMAIN &&
  process.env.REACT_APP_FIREBASE_PROJECT_ID;

let app = null;
let db = null;
let auth = null;
let analytics = null;

if (hasValidConfig && !firebaseConfig.apiKey.includes('your_')) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firestore
    db = getFirestore(app);
    
    // Initialize Auth
    auth = getAuth(app);
    
    // Initialize Analytics (only in production)
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      analytics = getAnalytics(app);
    }
    
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
  }
} else {
  console.log('🔧 Firebase configuration not found or incomplete, running in offline mode');
  console.log('Please update your .env file with your Firebase credentials');
}

// Helper function to check if Firebase is ready
export const isFirebaseReady = () => !!app && !!db && !!auth;

export { db, auth, analytics };
