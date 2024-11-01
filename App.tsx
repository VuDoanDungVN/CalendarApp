import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FirstScreen from "./App/Components/FirstScreen";
import LoginScreen from "./App/Auth/LoginScreen";
import RegisterScreen from "./App/Auth/RegisterScreen";
import HomeScreen from "./App/Components/HomeScreen";
import Content from "./App/Content/DetailScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Search from "./App/Tab/Search";
import Location from "./App/Tab/Location";
import Profile from "./App/Tab/Profile";
import Categories from "./App/Content/Categories";
import CalendarScreen from "./App/Tab/Calendar";
import ListScreen from "./App/Components/ListScreen";
import CategoriesScreen from "./App/Content/Categories";
import CategoryScreen from "./App/Location/CategoryScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName:
            | React.ComponentProps<typeof MaterialIcons>["name"]
            | undefined;

          if (route.name === "HomeScreen") {
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
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "ホーム" }}
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
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "ユーザー" }}
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
          options={{ title: "イベント情報", headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: "", headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={{ title: "", headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{ title: "すべて", headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{ title: "イベント情報", headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
