import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, pickImage } from "../../firebase"; // Đảm bảo đường dẫn đúng
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProfileScreen = ({ navigation }: any) => {
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

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            {profileImageUrl ? (
              <Image
                source={{ uri: profileImageUrl }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.emptyImageContainer}>
                <Entypo name="user" size={50} color="gray" />
              </View>
            )}
            <TouchableOpacity
              onPress={handlePickImage}
              style={styles.cameraIconContainer}
            >
              <Entypo name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{user?.displayName}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.optionContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="notifications" size={24} color="#9da6c2" />
            </View>
            <View>
              <Text style={styles.optionTitle}>Notifications</Text>
              <Text style={styles.optionSubtitle}>Turn on notifications</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.optionContainer}>
            <View style={styles.iconContainer}>
              <AntDesign name="lock1" size={24} color="#9da6c2" />
            </View>
            <View>
              <Text style={styles.optionTitle}>Privacy</Text>
              <Text style={styles.optionSubtitle}>Privacy settings</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.optionContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="settings" size={24} color="#9da6c2" />
            </View>
            <View>
              <Text style={styles.optionTitle}>Settings</Text>
              <Text style={styles.optionSubtitle}>General, password, etc.</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePickImage}>
          <View style={styles.profileEditProfile}>
            <Text style={styles.buttonText}>Edit profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.profileLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  profileContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  imageContainer: {
    position: "relative",
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  emptyImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 12,
    padding: 5,
  },
  userInfoContainer: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  optionContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: "#f5f7fa",
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  profileEditProfile: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  profileLogout: {
    backgroundColor: "#dd3333",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
