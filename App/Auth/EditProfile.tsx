import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function EditProfileScreen({ navigation }: any) {
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

  return (
    <View style={styles.container}>
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
      </View>
      <Text style={{ fontSize: 15, marginVertical: 5 }}>Name :</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        defaultValue={user?.displayName ?? ""}
        editable={false}
      />
      <Text style={{ fontSize: 15, marginVertical: 5 }}>Email Address :</Text>
      <TextInput
        style={styles.input}
        placeholder="YourEmail@domain.com"
        defaultValue={user?.email ?? ""}
        editable={false}
      />
      <Text style={{ fontSize: 15, marginVertical: 5 }}>Phone Number :</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        defaultValue={user?.phoneNumber ?? ""}
        editable={false}
      />
      <TouchableOpacity onPress={() => navigation.navigate("SettingScreen")}>
        <View style={styles.updateButton}>
          <FontAwesome6 name="edit" size={20} color="#fff" />
          <Text style={styles.updateButtonText}>Edit profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    color: "#456FE8",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#456FE8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  emptyImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "43%",
    left: "49%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 12,
    padding: 5,
  },
  updateButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 10,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 15,
  },
});
