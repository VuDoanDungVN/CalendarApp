import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ContentData } from "../Data/DataList";

const CategoriesScreen = ({ route }) => {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>カテゴリー名: {category.categories}</Text>
      <View style={styles.eventItem}>
        <Text style={styles.eventTitle}>{category.name}</Text>
        <Text>{category.categories}</Text> {/* Đảm bảo nằm trong <Text> */}
      </View>
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
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
