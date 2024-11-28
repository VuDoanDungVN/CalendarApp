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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SettingScreen from "./App/Auth/SettingScreen";
import EditProfileScreen from "./App/Auth/EditProfile";
import { ContentData } from "./App/Data/DataList";

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
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [nearestEvent, setNearestEvent] = useState<Event | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Tìm sự kiện gần nhất
    const upcomingEvents = ContentData.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= currentDate; // Chỉ lọc các sự kiện từ ngày hiện tại trở đi
    });

    // Tìm sự kiện có ngày gần nhất
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
      // Hiển thị thông tin sự kiện gần nhất trong Alert
      Alert.alert(
        "最新のイベント",
        `イベント名: ${nearestEvent.eventName}\n日付: ${nearestEvent.date}\nタイム: ${nearestEvent.time}\n場所: ${nearestEvent.location}\nイベント情報: ${nearestEvent.description}`,
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
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfileScreen")}
                >
                  <View style={styles.profileEditProfile}>
                    <Text style={styles.buttonText}>Show profile</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleNotificationsPress}>
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
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingScreen")}
          >
            <View style={styles.optionContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="settings" size={24} color="#9da6c2" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Password</Text>
                <Text style={styles.optionSubtitle}>
                  General, password, etc.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 350 }}>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.profileLogout}>
              <Text style={styles.buttonTextLogout}>Logout</Text>
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
          options={{ title: "イベント情報", headerBackTitle: "" }}
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
    padding: 5,
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 10,
  },
  profileLogout: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 5,
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
