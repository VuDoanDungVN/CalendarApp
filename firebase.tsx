import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  initializeFirestore,
} from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkBR04aL_q6plFnKAOZ2oag47fxvD-ssI",
  authDomain: "eventapp-75f24.firebaseapp.com",
  projectId: "eventapp-75f24",
  storageBucket: "eventapp-75f24.firebasestorage.app",
  messagingSenderId: "805095932537",
  appId: "1:805095932537:web:e44275ef8abb2b00138aa8",
  measurementId: "G-RD4XNBB9Z7",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firebase Storage
const storage = getStorage(app);

/**
 * Upload an image to Firebase Storage and save the URL to Firestore
 * @param {string} uri - Image URI
 * @param {string} userId - User ID
 */
const uploadImage = async (uri: string, userId: string) => {
  try {
    // Convert URI to blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create a reference in Firebase Storage
    const storageRef = ref(storage, `profile_images/${userId}.jpg`);

    // Upload the blob to Firebase Storage
    await uploadBytes(storageRef, blob);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Image uploaded successfully:", downloadURL);

    // Save the download URL to Firestore
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { profileImageUrl: downloadURL }, { merge: true });
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

/**
 * Pick an image from the gallery and upload it
 * @param {string} userId - User ID
 */
const pickImage = async (userId: string) => {
  try {
    // Request permission to access the gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Open the gallery to pick an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      await uploadImage(result.assets[0].uri, userId);
    }
  } catch (error) {
    console.error("Error picking image:", error);
  }
};

/**
 * Reauthenticate a user
 * @param {string} currentPassword - The user's current password
 */
export const reauthenticateUser = async (currentPassword: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  // Generate credential with the current password
  const credential = EmailAuthProvider.credential(user.email!, currentPassword);

  // Reauthenticate user with the credential
  await reauthenticateWithCredential(user, credential);
};

/**
 * Change the password of the authenticated user
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 */
const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    // Reauthenticate the user first
    await reauthenticateUser(currentPassword);

    // Update the password
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");

    await updatePassword(user, newPassword);
    console.log("Password updated successfully");
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export const changeProfile = async (name: string) => {
  try {
    console.log("Start changeProfile");
    const user = auth.currentUser;

    if (!user) {
      console.log("No authenticated user found");
      throw new Error("No authenticated user found");
    }

    console.log("User authenticated");
    await updateProfile(user, { displayName: name });
    console.log("Firebase Authentication displayName updated successfully");

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, { displayName: name }, { merge: true });
    console.log("Firestore user document updated successfully");
  } catch (error: any) {
    console.log("Error in changeProfile:", error.message);
    throw error; // Đảm bảo lỗi được ném ra ngoài để catch được trong handleUpdateProfile
  }
};

// Export necessary functionalities
export { auth, db, storage, uploadImage, pickImage, changePassword };
