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
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { ContentData } from "../Data/DataList";
import Carousel, { Pagination } from "react-native-snap-carousel";

const HomeScreen = ({ navigation }: any) => {
  const { width: screenWidth } = Dimensions.get("window");
  const [user, setUser] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  // Chuyển hướng theo Categories
  const handleNavigateToCategory = (category: string) => {
    const filteredData = ContentData.filter(
      (item) => item.categories === category
    );
    navigation.navigate("CategoryScreen", { filteredData });
  };

  // Slider Data
  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailScreen", { item })}
      >
        <View style={styles.sliderItem}>
          <Image source={item.eventImage} style={styles.sliderImage} />
          <View style={styles.sliderTextContainer}>
            <Text style={styles.sliderTitle}>{item.eventName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ContentData.map((categories, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleNavigateToCategory(categories.categories)}
              >
                <View style={styles.categoriesContainer}>
                  <Text
                    style={{ color: "#456FE8" }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {categories.categories}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.recentActivityContainer}>
            <Text style={styles.recentActivityText}>最近の活動</Text>
            {/* <Text style={styles.showAllText}>すべて</Text> */}
          </View>
          <View style={styles.popularSection}>
            <Carousel
              layout={"default"}
              data={ContentData}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 60}
              renderItem={_renderItem}
              onSnapToItem={(index) => setActiveSlide(index)}
              contentContainerCustomStyle={styles.carouselContentContainer}
            />
          </View>
          <View style={styles.recentActivityContainer}>
            <Text style={styles.recentActivityText}>注目記事</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ListScreen")}>
              <Text style={styles.showAllText}>すべて</Text>
            </TouchableOpacity>
          </View>
          {ContentData.slice(0, 10).map((item, index) => (
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
                      <Text style={styles.featuredArticleDate}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

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
