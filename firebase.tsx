import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth, Auth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg3rMnaKE2w2AxspSqWsvPdcE-NFptsUI",
  authDomain: "calendarapp-occ.firebaseapp.com",
  projectId: "calendarapp-occ",
  storageBucket: "calendarapp-occ.appspot.com",
  messagingSenderId: "552088738570",
  appId: "1:552088738570:web:b8091e9dce889f85ce38f3",
  measurementId: "G-ZQQF9JPQWW",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db , storage };