import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth, Auth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import thêm doc và setDoc
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

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

const uploadImage = async (uri: string, userId: string) => {
  try {
    // Lấy blob từ URI của hình ảnh
    const response = await fetch(uri);
    const blob = await response.blob();

    // Tạo tham chiếu đến Firebase Storage
    const storageRef = ref(storage, `profile_images/${userId}.jpg`);

    // Tải lên hình ảnh
    await uploadBytes(storageRef, blob);

    // Lấy URL tải xuống của hình ảnh
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Image uploaded successfully:", downloadURL);

    // Lưu URL tải xuống vào Firestore
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { profileImageUrl: downloadURL }, { merge: true });
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

const pickImage = async (userId: string) => {
  // Yêu cầu quyền truy cập thư viện ảnh
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
    return;
  }

  // Mở thư viện ảnh để chọn hình ảnh
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    // Tải lên hình ảnh đã chọn
    await uploadImage(result.assets[0].uri, userId);
  }
};

export { auth, db, storage, uploadImage, pickImage };
