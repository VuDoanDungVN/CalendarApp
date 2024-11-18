import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { ContentData } from "../Data/DataList";

const CategoriesScreen = ({ route }: any) => {
  const { category } = route.params;

  // Lọc dữ liệu từ ContentData
  const filteredData = ContentData.filter(
    (item) => item.categories === category
  );

  return (
    <View style={styles.container}>
      {/* Hiển thị tên danh mục */}
      <Text style={styles.title}>カテゴリー: {category}</Text>

      {/* Kiểm tra nếu không có dữ liệu */}
      {filteredData.length === 0 ? (
        <Text style={styles.noDataText}>データがありません。</Text>
      ) : (
        // Hiển thị danh sách sự kiện
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Image source={item.eventImage} style={styles.eventImage} />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{item.eventName}</Text>
                <Text style={styles.eventDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={styles.eventDate}>
                  {item.date} {item.time}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#456FE8",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#9d9d9d",
    marginTop: 20,
  },
  eventItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#456FE8",
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: "#9d9d9d",
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 14,
    color: "#456FE8",
  },
});
