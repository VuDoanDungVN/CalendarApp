import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, pickImage } from "../../firebase"; // Đảm bảo đường dẫn đúng

const ProfileScreen = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setProfileImageUrl(userDoc.data().profileImageUrl);
        }
      }
    };

    fetchProfileImage();
  }, [user]);

  const handlePickImage = async () => {
    if (user) {
      await pickImage(user.uid);
      // Sau khi tải lên hình ảnh, lấy lại URL hình ảnh từ Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setProfileImageUrl(userDoc.data().profileImageUrl);
      }
    }
  };

  return (
    <View style={styles.container}>
      {profileImageUrl ? (
        <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
      ) : (
        <Text>{user?.photoURL}</Text>
      )}
      <TouchableOpacity onPress={handlePickImage} style={styles.button}>
        <Text style={styles.buttonText}>Change Profile Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#456FE8",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
