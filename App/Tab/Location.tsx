import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ContentData } from "../Data/DataList";
export default function Location({ navigation }: any) {
  const handleNavigateToCategory = (category: string) => {
    const filteredData = ContentData.filter(
      (item) => item.categories === category
    );
    navigation.navigate("CategoryScreen", { filteredData });
  };

  return (
    <View style={styles.main}>
      <View>
        <Image
          source={require("../../assets/slide/okinawa map.png")}
          style={styles.mapImage}
        />
        <View style={styles.kunigami}>
          <TouchableOpacity
            onPress={() => handleNavigateToCategory("Kunigami")}
          >
            <Image
              source={require("../../assets/slide/Kunigami.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nago}>
          <TouchableOpacity onPress={() => handleNavigateToCategory("Nago")}>
            <Image
              source={require("../../assets/slide/nago.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.onna}>
          <TouchableOpacity onPress={() => handleNavigateToCategory("Onna")}>
            <Image
              source={require("../../assets/slide/onna.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.naha}>
          <TouchableOpacity onPress={() => handleNavigateToCategory("Naha")}>
            <Image
              source={require("../../assets/slide/naha.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.zamami}>
          <TouchableOpacity onPress={() => handleNavigateToCategory("Zamami")}>
            <Image
              source={require("../../assets/slide/zamami.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tokashiki}>
          <TouchableOpacity
            onPress={() => handleNavigateToCategory("Tokashiki")}
          >
            <Image
              source={require("../../assets/slide/tokashiki.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.miyako}>
          <TouchableOpacity onPress={() => handleNavigateToCategory("Miyako")}>
            <Image
              source={require("../../assets/slide/miyako.png")}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.ishigaki}>
          <TouchableOpacity onPress={() => handleNavigateToCategory("Miyako")}>
            <Image
              source={require("../../assets/slide/ishigaki.png")}
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
  miyako: {
    position: "absolute",
    top: 510,
    right: 180,
  },
  ishigaki: {
    position: "absolute",
    top: 555,
    right: 100,
  },
});
