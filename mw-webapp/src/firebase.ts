import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
// import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBMIAbcvbUOpSIOQIm7tS7S3pVoDIlLtBg",
  authDomain: "masters-way.firebaseapp.com",
  databaseURL: "https://masters-way-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "masters-way",
  storageBucket: "masters-way.appspot.com",
  messagingSenderId: "772004885666",
  appId: "1:772004885666:web:08d1c51678039b51c513fb",
};

export const app = initializeApp(firebaseConfig);

// export const StartFirebase = () => {
//   return getDatabase(app);
// };

export const db = getDatabase();
// const db = app.firestore();
// export {db};