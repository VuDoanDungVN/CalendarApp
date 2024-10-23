import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth, Auth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8hj9ZODCcvbBsDPxknRiAmcP4zFZgBvo",
  authDomain: "loginapp-6447a.firebaseapp.com",
  projectId: "loginapp-6447a",
  storageBucket: "loginapp-6447a",
  messagingSenderId: "849150971302",
  appId: "1:849150971302:web:b5042d823c23c5f1ee9367",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
