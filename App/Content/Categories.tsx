import { View, Text } from "react-native";
import React from "react";

const Categories = ({ route }: any) => {
  const { categories } = route.params;
  return (
    <View>
      <Text>{categories.categories}</Text>
    </View>
  );
};

export default Categories;
