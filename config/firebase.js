import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import keys from 'expo-constants';

const firebaseConfig = {
  apiKey: keys.manifest.extra.apiKey,
  authDomain: keys.manifest.extra.authDomain,
  projectId: keys.manifest.extra.projectId,
  storageBucket: keys.manifest.extra.storageBucket,
  messagingSenderId: keys.manifest.extra.messagingSenderId,
  appId: keys.manifest.extra.appId,
  databaseURL: keys.manifest.extra.databaseURL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);