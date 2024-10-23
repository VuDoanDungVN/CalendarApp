import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";

const HomeScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  });

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
      <Text style={{ color: "#836b61" }}>
        Xin chào, {user ? user.displayName : "Khách"}
      </Text>
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
