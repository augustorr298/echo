// Example: Save test results to Firestore
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function saveTestResult(result) {
  try {
    const docRef = await addDoc(collection(db, 'testResults'), {
      ...result,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (e) {
    console.error('Error saving test result:', e);
    throw e;
  }
}
