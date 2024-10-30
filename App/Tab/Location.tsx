import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Location() {
  return (
    <View style={styles.main}>
      <View>
        <Image
          source={require("../../assets/slide/okinawa map.png")}
          style={styles.mapImage}
        />
        <View style={styles.kunigami}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/slide/Kunigami.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nago}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/slide/nago.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.onna}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/slide/onna.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.naha}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/slide/naha.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.zamami}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/slide/zamami.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tokashiki}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/slide/tokashiki.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#96C6CF",
    flex: 1,
  },
  mapImage: {
    width: 420,
    height: 700,
  },
  locationImage: {
    width: 100,
    height: 40,
  },
  kunigami: {
    position: "absolute",
    top: 30,
    right: 20,
  },
  nago: {
    position: "absolute",
    top: 150,
    right: 120,
  },
  onna: {
    position: "absolute",
    top: 235,
    left: 85,
  },
  naha: {
    position: "absolute",
    top: 410,
    left: 3,
  },
  zamami: {
    position: "absolute",
    top: 405,
    right: 120,
  },
  tokashiki: {
    position: "absolute",
    top: 470,
    right: 40,
  },
});
