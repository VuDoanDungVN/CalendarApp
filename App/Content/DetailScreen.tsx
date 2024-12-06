import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function DetailScreen({ route, navigation }: any) {
  const { item } = route.params;

  // Hàm mở bản đồ mặc định của thiết bị
  const handleOpenMap = () => {
    const mapOptions = {
      latitude: item.latitude,
      longitude: item.longitude,
      zoom: 15,
      query: item.address || "Event location",
    };

    // URL động tùy vào nền tảng
    const url =
      Platform.OS === "ios"
        ? `maps://?ll=${mapOptions.latitude},${
            mapOptions.longitude
          }&q=${encodeURIComponent(mapOptions.query)}`
        : `geo:${mapOptions.latitude},${
            mapOptions.longitude
          }?q=${encodeURIComponent(mapOptions.query)}`;

    Linking.openURL(url).catch(() =>
      Alert.alert("エラー", "地図アプリを開くことができません。")
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.eventContainer}>
          <Text
            style={styles.eventTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.eventName}
          </Text>
          <Text
            style={styles.eventLocation}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            場所 : {item.address}
          </Text>
          <Text style={styles.eventDate}>日付 : {item.date}</Text>
          <Text>時間 : {item.time}</Text>
        </View>
        <View>
          <Image
            source={item.eventImage}
            style={{ width: "100%", height: 200, borderRadius: 10 }}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.eventTitle}> マップビュー :</Text>
        </View>
        <View>
          {/* Hiển thị Google Maps */}
          <TouchableOpacity style={styles.mapContainer} onPress={handleOpenMap}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: item.latitude,
                longitude: item.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              {/* Thêm Marker */}
              <Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.eventName}
                description={item.address}
              />
            </MapView>
          </TouchableOpacity>
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventLabel}>イベント情報 :</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventLabel}>チケット :</Text>
          <Text>大人 : {item.ticketsGeneralAdmission}</Text>
          <Text>子供 : {item.ticketsChildren}</Text>
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventLabel}>そこに行く方法 :</Text>
          <Text>{item.howToGetThere}</Text>
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventLabel}>追加情報 :</Text>
          <Text>{item.additionalInfo}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF", // Nền trắng sạch
    flex: 1,
    padding: 10,
  },
  mapContainer: {
    borderRadius: 10,
    overflow: "hidden", // Giúp góc map hiển thị bo tròn
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: 5,
  },
  interestedButton: {
    backgroundColor: "#2979FF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#BDBDBD",
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  eventContainer: {
    flexDirection: "column",
    gap: 5,
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565C0",
  },
  eventLocation: {
    fontSize: 14,
    color: "#424242",
  },
  eventDate: {
    fontSize: 14,
    color: "#424242",
  },
  eventCard: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E0E0E0",
    padding: 10,
    marginVertical: 5,
  },
  eventLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1976D2",
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
