// Test script to verify environment variables are loaded
console.log('Environment Variables Test:');
console.log('NEXT_PUBLIC_FIREBASE_API_KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'LOADED' : 'MISSING');
console.log('NEXT_PUBLIC_FIREBASE_PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'LOADED' : 'MISSING');
console.log('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'LOADED' : 'MISSING');

// Check if we can import Firebase
try {
  const { storage, db } = require('./src/lib/firebase');
  console.log('Firebase initialization: SUCCESS');
  console.log('Storage instance:', !!storage);
  console.log('Firestore instance:', !!db);
} catch (error) {
  console.error('Firebase initialization error:', error.message);
}
