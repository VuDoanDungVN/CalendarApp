import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ContentData } from "../Data/DataList";

const Search = ({ navigation }: any) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Bước 1
  const [filteredResults, setFilteredResults] = useState(ContentData); // Bước 2
  const [hasSearched, setHasSearched] = useState(false);
  const handleSearch = () => {
    // Bước 3
    if (!searchQuery.trim()) {
      setErrorMessage("キーワードで検索してください。");
      setTimeout(() => {
        setErrorMessage("");
        setSearchQuery("");
        setFilteredResults(ContentData);
        setHasSearched(false);
      }, 5000);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const results = ContentData.filter((item) =>
        item.eventName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
      setHasSearched(true);
      if (results.length === 0) {
        setErrorMessage("データがありません");
        setTimeout(() => {
          setErrorMessage("");
          setSearchQuery("");
          setFilteredResults(ContentData);
          setHasSearched(false);
        }, 5000);
      } else {
        setErrorMessage("");
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: "#fff", borderRadius: 5 }}>
        <TextInput
          placeholder="検索..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setHasSearched(false);
          }}
          onSubmitEditing={handleSearch}
          style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 10 }}
        />
      </View>
      <TouchableOpacity onPress={handleSearch}>
        <View style={styles.searchButton}>
          <Text style={styles.searchButtonText}>
            {isLoading ? "検索中..." : "検索"}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
      {hasSearched && (
        <View style={styles.resultsContainer}>
          {filteredResults.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("DetailScreen", { item })}
            >
              <View key={index} style={styles.resultItem}>
                <Image source={item.eventImage} style={styles.resultImage} />
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultTitle}>{item.eventName}</Text>
                  <Text numberOfLines={2} style={styles.resultContent}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  searchButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  resultsContainer: {
    marginTop: 5,
  },
  resultItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  resultTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  resultTitle: {
    color: "#456FE8",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContent: {
    color: "#9d9d9d",
    fontSize: 14,
  },
  errorMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  errorMessage: {
    color: "red",
  },
});
