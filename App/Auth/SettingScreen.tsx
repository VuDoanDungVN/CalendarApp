import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { changePassword, changeProfile } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMessageName, setErrorMessageName] = useState<string>("");
  const [successMessageName, setSuccessMessageName] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [successMessagePass, setSuccessMessagePass] = useState<string>("");
  const navigation = useNavigation();

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessagePassword("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessagePassword("Passwords do not match!");
      return;
    }
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccessMessagePass("Password updated successfully");
    } catch (error: any) {
      setErrorMessagePassword(error.message || "Failed to update password");
    }
  };

  const handleUpdateProfile = async () => {
    setErrorMessageName("");
    setSuccessMessageName("");
    if (!displayName) {
      setErrorMessageName("Please fill in all fields");
      return;
    }

    try {
      setSuccessMessageName("Profile updated successfully");
      await changeProfile(displayName);
      setDisplayName("");
      setErrorMessageName("");
      navigation.goBack();
    } catch (error: any) {
      setErrorMessageName(error.message || "Failed to update profile");
      console.log("Error in handleUpdateProfile:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 5, color: "#5d50ad" }}>名前 :</Text>
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TouchableOpacity onPress={handleUpdateProfile}>
        <View style={styles.loginButton}>
          <Feather name="save" size={20} color="#fff" />
          <Text style={styles.loginButtonText}>Update Profile</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.errorMessageContainer}>
        {errorMessageName !== "" && (
          <Text style={styles.errorMessage}>{errorMessageName}</Text>
        )}
      </View>

      {successMessageName !== "" && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessage}>{successMessageName}</Text>
        </View>
      )}

      <Text style={{ marginVertical: 5, color: "#5d50ad" }}>パスワード :</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity onPress={handleChangePassword}>
        <View style={styles.loginButton}>
          <Feather name="save" size={20} color="#fff" />
          <Text style={styles.loginButtonText}>Update Password</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.errorMessageContainer}>
        {errorMessagePassword !== "" && (
          <Text style={styles.errorMessage}>{errorMessagePassword}</Text>
        )}
      </View>

      {successMessagePass !== "" && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessage}>{successMessagePass}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  errorMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
  },
  successMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  successMessage: {
    color: "green", // Màu sắc cho thông báo thành công
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    gap: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 15,
  },
});
