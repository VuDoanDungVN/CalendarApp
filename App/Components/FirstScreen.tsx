import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function FirstScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Welcome to Okinawa</Text>
          <Text style={styles.text}>
            Engage your audience with language that's simple & easy to
            understand
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <View style={styles.buttonWhite}>
              <Text style={styles.buttonTextBlue}>Register</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <View style={styles.buttonBlue}>
              <Text style={styles.buttonTextWhite}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: 300,
    alignItems: "flex-start",
  },
  textTitle: {
    color: "#fff",
    fontSize: 50,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    fontSize: 15,
    textAlign: "left",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    gap: 20,
  },
  buttonWhite: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#456FE8",
  },
  buttonBlue: {
    backgroundColor: "#456FE8",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextBlue: {
    color: "#005270",
  },
  buttonTextWhite: {
    color: "#fff",
  },
});
