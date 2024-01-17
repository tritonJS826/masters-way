import {getAnalytics, logEvent as logEventFirebase} from "firebase/analytics";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {env} from "src/utils/env/env";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/**
 * Available analytics events
 */
export enum Analytics {
  ERROR = "ERROR",
  PROMISE_REJECTION = "PROMISE_REJECTION"
}

/**
 * Log event to A
 */
export const logEvent = (event: Analytics, metadata: object) => logEventFirebase(analytics, event, metadata);

export const db = getFirestore(app);
export const provider = new GoogleAuthProvider().setCustomParameters({prompt: "select_account"});
export const auth = getAuth();
