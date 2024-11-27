import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import FirstScreen from "./App/Components/FirstScreen";
import LoginScreen from "./App/Auth/LoginScreen";
import RegisterScreen from "./App/Auth/RegisterScreen";
import HomeScreen from "./App/Components/HomeScreen";
import Content from "./App/Content/DetailScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Search from "./App/Tab/Search";
import Location from "./App/Tab/Location";
import CalendarScreen from "./App/Tab/Calendar";
import ListScreen from "./App/Components/ListScreen";
import CategoriesScreen from "./App/Content/Categories";
import CategoryScreen from "./App/Location/CategoryScreen";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, pickImage } from "./firebase";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = ({ props, navigation }: any) => {
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
    <DrawerContentScrollView {...props}>
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
                <Text style={styles.optionSubtitle}>
                  General, password, etc.
                </Text>
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
    </DrawerContentScrollView>
  );
};

// Drawer Profile and Menu
const ProfileScreenWithDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "ホーム" }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{ title: "検索" }}
      />
      <Drawer.Screen
        name="Location"
        component={Location}
        options={{ title: "地図" }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: "カレンダー" }}
      />
    </Drawer.Navigator>
  );
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName:
            | React.ComponentProps<typeof MaterialIcons>["name"]
            | undefined;

          if (route.name === "Home") {
            iconName = "dashboard";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Location") {
            iconName = "location-on";
          } else if (route.name === "Calendar") {
            iconName = "calendar-month";
          } else if (route.name === "Profile") {
            iconName = "supervised-user-circle";
          }
          return iconName ? (
            <MaterialIcons name={iconName} size={30} color={color} />
          ) : null;
        },
        tabBarStyle: {
          borderRadius: 10,
        },
        tabBarActiveTintColor: "#456FE8",
        tabBarInactiveTintColor: "#8e8e93",
      })}
    >
      <Tab.Screen
        name="Home"
        component={ProfileScreenWithDrawer}
        options={{ title: "ホーム", headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ title: "検索" }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{ title: "地図" }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: "カレンダー" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={Content}
          options={{ title: "イベント情報", headerBackTitle: "戻る" }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: "", headerBackTitle: "" }}
        />
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={{ title: "", headerBackTitle: "" }}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{ title: "すべて", headerBackTitle: "" }}
        />
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{ title: "イベント情報", headerBackTitle: "" }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
            headerBackTitle: "",
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
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
    top: "40%",
    left: "45%",
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
