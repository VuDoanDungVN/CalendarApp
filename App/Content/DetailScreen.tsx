import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DetailScreen({ route, navigation }: any) {
  const { item } = route.params;
  const [isRegistered, setIsRegistered] = useState(false);
  const [interestedCount, setInterestedCount] = useState(0);

  // Kiểm tra xem sự kiện đã kết thúc chưa
  const isEventExpired = new Date(item.date).getTime() < Date.now();

  const handleInterested = () => {
    if (isEventExpired) {
      Alert.alert("通知", "このイベントは終了しました。");
      return;
    }
    if (isRegistered) {
      Alert.alert("通知", "Bạn đã đăng ký!");
      return;
    }
    setIsRegistered(true);
    setInterestedCount((prevCount) => prevCount + 1);
    Alert.alert("通知", "Bạn đã đăng ký!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.eventContainer}>
        <View>
          <Text style={styles.eventTitle}>イベント名 : {item.name}</Text>
          <Text style={styles.eventLocation}>場所 : {item.location}</Text>
          <Text style={styles.eventDate}>日付 : {item.date}</Text>
        </View>
      </View>
      <View>
        <Image
          source={item.eventImage}
          style={{ width: "100%", height: 200, borderRadius: 10 }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleInterested}
        disabled={isEventExpired || isRegistered}
      >
        <View
          style={[
            styles.interestedButton,
            (isEventExpired || isRegistered) && styles.disabledButton,
          ]}
        >
          {isEventExpired ? (
            <AntDesign name="close" size={24} color="red" />
          ) : null}
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {isEventExpired
              ? "終了"
              : isRegistered
              ? "Đã đăng ký"
              : `参加 (${interestedCount}/100)`}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.eventCard}>
        <Text style={styles.eventLabel}>イベント情報 :</Text>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.eventCard}>
        <Text style={styles.eventLabel}>チケット :</Text>
        <Text>大人 : ¥ {item.ticketsGeneralAdmission}</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
    padding: 10,
  },
  interestedButton: {
    backgroundColor: "#456FE8",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#9da6c2",
    flexDirection: "row",
  },
  eventContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    color: "#456FE8",
  },
  eventLocation: {
    fontSize: 15,
    color: "#5F5F5F",
  },
  eventDate: {
    fontSize: 15,
    color: "#5F5F5F",
  },
  eventCard: {
    backgroundColor: "#f9f9f9",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#c0c6d7",
    padding: 20,
    marginVertical: 5,
  },
  eventLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginVertical: 5,
    color: "#456FE8",
  },
});
