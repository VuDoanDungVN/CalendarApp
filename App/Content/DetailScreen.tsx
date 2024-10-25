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

export default function DetailScreen({ route, navigation }: any) {
  const { item } = route.params;
  const [interested, setInterested] = useState(0);

  const handleInterested = () => {
    setInterested((prevInterested) => prevInterested + 1);

    if (item.date) {
      // Kiểm tra nếu item.date tồn tại
      navigation.navigate("Calendar", { selectedDate: item.date });
      console.log("Đã truyền ngày sự kiện:", item.date);
    } else {
      Alert.alert("Lỗi", "Ngày sự kiện không hợp lệ.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.eventContainer}>
        <View style={styles.eventDate}>
          <Text style={styles.eventDateText}>{item.date}</Text>
          <Text style={styles.eventDateSeparator}></Text>
          <Text style={styles.eventDateText}>{item.sort}</Text>
        </View>
        <View>
          <Text style={styles.eventLine}></Text>
        </View>
        <View>
          <Text style={styles.eventTitle}>{item.eventName}</Text>
          <Text style={styles.eventLocation}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={item.eventImage} style={styles.eventImage} />
      </View>
      <Text style={styles.separator}></Text>
      <View style={styles.attendanceContainer}>
        <View style={styles.attendanceBox}>
          <Text style={styles.attendanceText}>{interested}/100</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={handleInterested}>
        <View style={styles.interestedButton}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
            Interested
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

// CSS styles giữ nguyên như cũ, không cần sửa đổi thêm

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 5,
  },
  headerText: {
    fontSize: 15,
    padding: 10,
  },
  calendarContent: {
    backgroundColor: "#f9f9f9",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#c0c6d7",
    marginVertical: 5,
    shadowColor: "#000",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 100,
    padding: 10,
    margin: 5,
  },
  calendarBox: {
    paddingVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginHorizontal: 15,
  },
  calendarCard: {
    gap: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 15,
    fontWeight: "600",
  },
  numberText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#5D5D5D",
  },
  separator: {
    backgroundColor: "#c0c6d7",
    height: 0.5,
    margin: 10,
  },
  eventContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  eventDate: {
    backgroundColor: "#456FE8",
    height: 70,
    width: 70,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  eventDateText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  eventDateSeparator: {
    backgroundColor: "#fff",
    height: 0.5,
    width: 50,
  },
  eventLine: {
    backgroundColor: "#DADADA",
    height: 50,
  },
  eventLocation: {
    fontSize: 15,
    color: "#5F5F5F",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
    gap: 10,
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
  },
  attendanceContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  attendanceBox: {
    backgroundColor: "#456FE8",
    height: 50,
    width: 100,
    borderRadius: 10,
    gap: 5,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  attendanceText: {
    fontSize: 20,
    color: "#fff",
  },
  attendanceSeparator: {
    backgroundColor: "#fff",
    height: 0.5,
    width: 80,
  },
  attendanceNumbers: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  attendanceNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  attendanceDetails: {
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    gap: 10,
  },
  attendanceLabel: {
    fontSize: 15,
    color: "#5E5E5E",
    fontWeight: "600",
  },
  attendanceImages: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  attendanceImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  attendanceMore: {
    backgroundColor: "#456FE8",
    height: 50,
    width: 50,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  attendanceMoreText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
  },
  interestedButton: {
    backgroundColor: "#456FE8",
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
  centeredView: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 15,
    color: "red",
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
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
  },
  eventDetail: {
    fontSize: 15,
    fontWeight: "300",
    marginVertical: 5,
  },
});
