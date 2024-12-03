import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import SettingScreen from "./App/Auth/SettingScreen";
import EditProfileScreen from "./App/Auth/EditProfile";
import { ContentData } from "./App/Data/DataList";
import PrivacyScreen from "./App/Components/Privacy";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Event = {
  categories: string;
  author: string;
  eventImage: any;
  eventName: string;
  description: string;
  date: string;
  time: string;
  location: string;
  ticketsGeneralAdmission: string;
  ticketsChildren: string;
  howToGetThere: string;
  additionalInfo: string;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = ({ props, navigation }: any) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [nearestEvent, setNearestEvent] = useState<Event | null>(null);
  const user = auth.currentUser;

  useEffect(() => {
    const currentDate = new Date();
    const upcomingEvents = ContentData.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= currentDate;
    });

    if (upcomingEvents.length > 0) {
      const nearest = upcomingEvents.reduce((prev, curr) => {
        const prevDate = new Date(prev.date);
        const currDate = new Date(curr.date);
        return prevDate < currDate ? prev : curr;
      });

      setNearestEvent(nearest);
    }
  }, []);

  const handleNotificationsPress = () => {
    if (nearestEvent) {
      Alert.alert(
        "最新のイベント",
        `イベント名: ${nearestEvent.eventName}\n日付: ${nearestEvent.date}\nタイム: ${nearestEvent.time}\n場所: ${nearestEvent.location}`,
        [{ text: "閉じる" }]
      );
    } else {
      Alert.alert("最近のイベントはありません。");
    }
  };

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
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfileScreen")}
          >
            <View style={styles.profileEditProfile}>
              <Text style={styles.buttonText}>Edit profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <View style={styles.optionContainer}>
            <View style={styles.drawerCard}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="user-alt" size={22} color="#d1d1d1" />
              </View>
              <View>
                <Text style={styles.optionTitle}>アカウント</Text>
              </View>
            </View>
            <View>
              <AntDesign name="right" size={19} color="#d1d1d1" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotificationsPress}>
          <View style={styles.optionContainer}>
            <View style={styles.drawerCard}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="notifications" size={22} color="#d1d1d1" />
              </View>
              <View>
                <Text style={styles.optionTitle}>お知らせ</Text>
              </View>
            </View>
            <View>
              <AntDesign name="right" size={19} color="#d1d1d1" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.optionContainer}>
            <View style={styles.drawerCard}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="comment"
                  size={22}
                  color="#d1d1d1"
                />
              </View>
              <View>
                <Text style={styles.optionTitle}>言語</Text>
              </View>
            </View>
            <View>
              <AntDesign name="right" size={19} color="#d1d1d1" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.optionContainer}>
            <View style={styles.drawerCard}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="logout" size={22} color="#d1d1d1" />
              </View>
              <View>
                <Text style={styles.optionTitle}>ログアウト</Text>
              </View>
            </View>
            <View>
              <AntDesign name="right" size={19} color="#d1d1d1" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Drawer Profile and Menu
const ProfileScreenWithDrawer = () => {
  const [nearestEvent, setNearestEvent] = useState<Event | null>(null);
  const user = auth.currentUser;

  useEffect(() => {
    const currentDate = new Date();
    const upcomingEvents = ContentData.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= currentDate;
    });

    if (upcomingEvents.length > 0) {
      const nearest = upcomingEvents.reduce((prev, curr) => {
        const prevDate = new Date(prev.date);
        const currDate = new Date(curr.date);
        return prevDate < currDate ? prev : curr;
      });

      setNearestEvent(nearest);
    }
  }, []);

  const handleNotificationsPress = () => {
    if (nearestEvent) {
      Alert.alert(
        "最新のイベント",
        `イベント名: ${nearestEvent.eventName}\n日付: ${nearestEvent.date}\nタイム: ${nearestEvent.time}\n場所: ${nearestEvent.location}`,
        [{ text: "閉じる" }]
      );
    } else {
      Alert.alert("通知", "最近のイベントはありません。");
    }
  };
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: "#f0f0f0",
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Ionicons
              name="menu"
              size={28}
              color="#9d9d9d"
              style={{ marginHorizontal: 5 }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleNotificationsPress}>
            <MaterialIcons
              name="notifications"
              size={28}
              color="#9d9d9d"
              style={{ marginHorizontal: 5 }}
            />
            <View
              style={{
                backgroundColor: "#c02727",
                borderRadius: 50,
                width: 8,
                height: 8,
                position: "absolute",
                right: 7,
              }}
            ></View>
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <Text style={{ fontSize: 16, color: "#9d9d9d" }}>
            Wellcome, {user ? user.displayName : "Guest"}
          </Text>
        ),
      })}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "ホーム",
        }}
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
          options={{ headerBackTitle: "戻る", title: "イベント" }}
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
          options={{ title: "", headerBackTitle: "" }}
        />
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{ title: "", headerBackTitle: "" }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitle: "戻る",
            title: "Event",
          }}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{ title: "設定", headerBackTitle: "戻る" }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ title: "プロフィール", headerBackTitle: "戻る" }}
        />
        <Stack.Screen
          name="PrivacyScreen"
          component={PrivacyScreen}
          options={{
            headerBackTitle: "戻る",
            title: "Privacy",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 10,
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
    marginTop: 50,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  optionsContainer: {
    flex: 1,
  },
  logoutContainer: {
    marginTop: 16,
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
    gap: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  drawerCard: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  optionContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: "#f5f7fa",
    padding: 10,
    borderRadius: 50,
    marginRight: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#B0B0B0",
  },
  optionSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  profileEditProfile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 10,
  },
  profileLogout: {
    backgroundColor: "#456FE8",
    textAlign: "center",
    alignContent: "center",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#ed5e63",
    fontSize: 15,
  },
  buttonTextLogout: {
    color: "#fff",
    fontSize: 16,
    height: 50,
  },
  nearestEventContainer: {
    padding: 20,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: "#777",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});
