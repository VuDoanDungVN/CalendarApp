import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { auth } from "../../firebase";

const HomeScreen = ({ navigation }: any) => {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        Alert.alert("Logout", "Bạn đã đăng xuất.");
        navigation.replace("LoginScreen");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HomeScreen</Text>
      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ED5E63",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
