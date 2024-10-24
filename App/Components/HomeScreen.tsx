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
import { ContentData, DataList } from "../Data/DataList";
import Carousel, { Pagination } from "react-native-snap-carousel";

const HomeScreen = ({ navigation }: any) => {
  const { width: screenWidth } = Dimensions.get("window");
  const [user, setUser] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        Alert.alert("Logout", "Bạn đã đăng xuất.");
        navigation.replace("LoginScreen");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  // Slider Data
  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailScreen", { item })}
      >
        <View style={styles.sliderItem}>
          <Image source={item.image} style={styles.sliderImage} />
          <View style={styles.sliderTextContainer}>
            <Text style={styles.sliderTitle}>{item.title}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.sliderContent}
            >
              {item.eventDescription}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <View>
            <Text style={styles.titleCustomer}>
              Hi, {user ? user.displayName : "Guest"}
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ContentData.map((categories, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("Categories", { categories })
                }
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
            <Text style={styles.recentActivityText}>Recent Activity</Text>
            <Text style={styles.showAllText}>Show all</Text>
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
            <Pagination
              dotsLength={ContentData.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotStyle={styles.paginationDot}
              inactiveDotStyle={styles.paginationInactiveDot}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.8}
            />
          </View>
          <View style={styles.recentActivityContainer}>
            <Text style={styles.recentActivityText}>Featured article</Text>
            <Text style={styles.showAllText}>Show all</Text>
          </View>
          {ContentData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("DetailScreen", { item })}
            >
              <View style={styles.featuredArticleContainer}>
                <View style={styles.featuredArticleContent}>
                  <Image
                    source={item.image}
                    style={styles.featuredArticleImage}
                  />
                  <View style={styles.featuredArticleTextContainer}>
                    <Text style={styles.featuredArticleTitle}>
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={styles.featuredArticleDescription}
                    >
                      {item.eventDescription}
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

          <View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  titleCustomer: {
    fontSize: 15,
    color: "#456FE8",
    marginBottom: 10,
  },
  categoriesContainer: {
    backgroundColor: "#F0F4FF",
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
    backgroundColor: "#F0F4FF",
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
