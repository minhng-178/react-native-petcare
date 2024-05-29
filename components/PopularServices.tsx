import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import PopularServiceItem from "./PopularServiceItem";

const data = [
  {
    id: 1,
    name: "Haircut",
    rating: 4.5,
    location: "uchiha madara",
    image: "",
  },
];

const PopularServices = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dịch vụ nổi tiếng</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => <PopularServiceItem item={item} />}
          contentContainerStyle={{ columnGap: Sizes.medium }}
          horizontal
        />
      </View>
    </View>
  );
};

export default PopularServices;

const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Sizes.large,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  headerBtn: {
    fontSize: Sizes.medium,
    color: Colors.light.gray,
  },
  cardsContainer: {
    marginTop: Sizes.medium,
  },
});
