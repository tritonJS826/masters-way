import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.FIREBASE_DATABASE_URL,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
};

const secondaryFirebaseConfig = {
  apiKey: import.meta.env.AUTH_FIREBASE_API_KEY,
  authDomain: import.meta.env.AUTH_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.AUTH_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.AUTH_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.AUTH_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.AUTH_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const secondaryApp = initializeApp(secondaryFirebaseConfig, "secondary");

export const db = getDatabase();