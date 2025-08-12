// Firestore helpers for mental health app data
import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  limit, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseReady } from '../firebase';
import authService from '../services/AuthService';

// Assessment Results
export async function saveAssessmentResult(assessmentData) {
  if (!isFirebaseReady()) {
    console.warn('Firebase not available, saving to localStorage');
    const stored = JSON.parse(localStorage.getItem('assessments') || '[]');
    stored.push({ ...assessmentData, id: Date.now(), timestamp: new Date().toISOString() });
    localStorage.setItem('assessments', JSON.stringify(stored));
    return 'offline-' + Date.now();
  }

  try {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const docRef = await addDoc(collection(db, 'assessments'), {
      userId: user.uid,
      ...assessmentData,
      createdAt: serverTimestamp(),
    });
    
    console.log('Assessment saved:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving assessment:', error);
    throw error;
  }
}

// Intervention Usage (calming tools usage)
export async function saveInterventionUsage(interventionData) {
  if (!isFirebaseReady()) {
    console.warn('Firebase not available, saving to localStorage');
    const stored = JSON.parse(localStorage.getItem('interventions') || '[]');
    stored.push({ ...interventionData, id: Date.now(), timestamp: new Date().toISOString() });
    localStorage.setItem('interventions', JSON.stringify(stored));
    return 'offline-' + Date.now();
  }

  try {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const docRef = await addDoc(collection(db, 'interventions'), {
      userId: user.uid,
      ...interventionData,
      createdAt: serverTimestamp(),
    });
    
    console.log('Intervention usage saved:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving intervention usage:', error);
    throw error;
  }
}

// User Progress Data
export async function saveProgressEntry(progressData) {
  if (!isFirebaseReady()) {
    console.warn('Firebase not available, saving to localStorage');
    const stored = JSON.parse(localStorage.getItem('progress') || '[]');
    stored.push({ ...progressData, id: Date.now(), timestamp: new Date().toISOString() });
    localStorage.setItem('progress', JSON.stringify(stored));
    return 'offline-' + Date.now();
  }

  try {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const docRef = await addDoc(collection(db, 'progress'), {
      userId: user.uid,
      ...progressData,
      createdAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving progress:', error);
    throw error;
  }
}

// Get user's assessment history
export async function getUserAssessments(limitCount = 10) {
  if (!isFirebaseReady()) {
    console.warn('Firebase not available, reading from localStorage');
    return JSON.parse(localStorage.getItem('assessments') || '[]').slice(-limitCount);
  }

  try {
    const user = authService.getCurrentUser();
    if (!user) return [];

    // Simple query without orderBy to avoid index requirement
    const q = query(
      collection(db, 'assessments'),
      where('userId', '==', user.uid),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting assessments:', error);
    return [];
  }
}

// Get user's intervention usage stats
export async function getUserInterventionStats() {
  if (!isFirebaseReady()) {
    console.warn('Firebase not available, reading from localStorage');
    const interventions = JSON.parse(localStorage.getItem('interventions') || '[]');
    // Basic stats from localStorage
    return {
      totalSessions: interventions.length,
      favoriteTools: {},
      weeklyUsage: []
    };
  }

  try {
    const user = authService.getCurrentUser();
    if (!user) return null;

    // Simple query without orderBy to avoid index requirement
    const q = query(
      collection(db, 'interventions'),
      where('userId', '==', user.uid)
    );
    
    const snapshot = await getDocs(q);
    const interventions = snapshot.docs.map(doc => doc.data());
    
    // Process stats
    const stats = {
      totalSessions: interventions.length,
      favoriteTools: {},
      totalMinutes: 0
    };
    
    interventions.forEach(intervention => {
      // Count tool usage
      if (stats.favoriteTools[intervention.tool]) {
        stats.favoriteTools[intervention.tool]++;
      } else {
        stats.favoriteTools[intervention.tool] = 1;
      }
      
      // Sum duration
      if (intervention.duration) {
        stats.totalMinutes += intervention.duration;
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Error getting intervention stats:', error);
    // Return default stats instead of null to prevent UI issues
    return {
      totalSessions: 0,
      favoriteTools: {},
      totalMinutes: 0
    };
  }
}

// Save user preferences
export async function saveUserPreferences(preferences) {
  if (!isFirebaseReady()) {
    console.warn('Firebase not available, saving to localStorage');
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    return;
  }

  try {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { preferences }, { merge: true });
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw error;
  }
}

// Get user preferences
export async function getUserPreferences() {
  if (!isFirebaseReady()) {
    console.warn('Firebase not available, reading from localStorage');
    return JSON.parse(localStorage.getItem('userPreferences') || '{}');
  }

  try {
    const user = authService.getCurrentUser();
    if (!user) return {};

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().preferences || {};
    }
    return {};
  } catch (error) {
    console.error('Error getting preferences:', error);
    return {};
  }
}

// Get recent interventions for activity feed
export async function getRecentInterventions(limitCount = 5) {
  if (!isFirebaseReady()) {
    console.warn('Firebase not available');
    return [];
  }

  try {
    const user = authService.getCurrentUser();
    if (!user) return [];

    const q = query(
      collection(db, 'interventions'),
      where('userId', '==', user.uid),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting recent interventions:', error);
    return [];
  }
}
