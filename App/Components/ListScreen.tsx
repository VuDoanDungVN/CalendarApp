import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { ContentData } from "../Data/DataList";

const ListScreen = ({ navigation }: any) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {ContentData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("DetailScreen", { item })}
          >
            <View style={styles.featuredArticleContainer}>
              <View style={styles.featuredArticleContent}>
                <Image
                  source={item.eventImage}
                  style={styles.featuredArticleImage}
                />
                <View style={styles.featuredArticleTextContainer}>
                  <Text
                    style={styles.featuredArticleTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.eventName}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={styles.featuredArticleDescription}
                  >
                    {item.description}
                  </Text>
                  <View style={styles.featuredArticleFooter}>
                    <Text style={styles.featuredArticleAuthor}>
                      {item.author}
                    </Text>
                    <Text style={styles.featuredArticleDate}>{item.date}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  titleCustomer: {
    fontSize: 15,
    color: "#456FE8",
    marginBottom: 10,
  },
  categoriesContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    width: 100,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  recentActivityContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },
  recentActivityText: {
    color: "#456FE8",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  showAllText: {
    color: "#456FE8",
  },
  sliderItem: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  sliderTextContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
    borderRadius: 10,
  },
  sliderTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContent: {
    color: "#fff",
    fontSize: 14,
  },
  popularSection: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  carouselContentContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  paginationContainer: {
    backgroundColor: "transparent",
    paddingVertical: 0,
    marginTop: 10,
    width: 50,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#456FE8",
  },
  paginationInactiveDot: {
    backgroundColor: "#ccc",
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
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ED5E63",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
