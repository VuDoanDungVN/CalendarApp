import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const CategoryScreen = ({ route, navigation }: any) => {
  const { filteredData } = route.params;

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailScreen", { item })}
    >
      <View style={styles.featuredArticleContainer}>
        <View style={styles.featuredArticleContent}>
          <Image source={item.eventImage} style={styles.featuredArticleImage} />
          <View style={styles.featuredArticleTextContainer}>
            <Text style={styles.featuredArticleTitle}>{item.eventName}</Text>
            <Text numberOfLines={2} style={styles.featuredArticleDescription}>
              {item.description}
            </Text>
            <View style={styles.featuredArticleFooter}>
              <Text style={styles.featuredArticleAuthor}>{item.author}</Text>
              <Text style={styles.featuredArticleDate}>
                {item.time} {item.date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.eventName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  featuredArticleContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  featuredArticleContent: {
    flexDirection: "row",
  },
  featuredArticleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  featuredArticleTextContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  featuredArticleTitle: {
    color: "#456FE8",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  featuredArticleDescription: {
    color: "#9d9d9d",
    marginBottom: 20,
    fontSize: 14,
  },
  featuredArticleFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featuredArticleAuthor: {
    color: "#456FE8",
    fontSize: 14,
  },
  featuredArticleDate: {
    color: "#456FE8",
    fontSize: 14,
  },
});

export default CategoryScreen;
