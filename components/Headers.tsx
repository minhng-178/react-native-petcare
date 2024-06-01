import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Images from "@/constants/Images";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/apis/brand";
import Loader from "./Loader";

const cateTypes = [
  { name: "Thú y", image: Images.vet },
  { name: "Spa", image: Images.spa },
  { name: "Chăm sóc", image: Images.grooming },
];

const Headers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryPress = (categoryName: string) => {
    setActiveCategory((prevActiveCategory) =>
      prevActiveCategory === categoryName ? null : categoryName
    );
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={""}
            onChangeText={() => {}}
            placeholder='Tìm dịch vụ bạn cần ở đây'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <FontAwesome name='search' style={styles.searchBtnImage} size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.textHeader}>Danh Mục</Text>
      <View style={styles.tabsContainer}>
        <FlatList
          data={cateTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategoryPress(item.name)}
              activeOpacity={0.9}
              style={[
                styles.tab,
                {
                  borderColor:
                    activeCategory === item.name
                      ? Colors.light.secondary
                      : Colors.light.gray2,
                },
              ]}
            >
              <View>
                <Image source={item.image} style={styles.categoryImage} />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeCategory === item.name
                          ? Colors.light.secondary
                          : Colors.light.gray2,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ columnGap: Sizes.xxLarge }}
          horizontal
        />
      </View>

      <Text style={styles.textHeader}>Thương hiệu nổi bật</Text>
      <View style={styles.tabsContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.tab, { borderColor: Colors.light.lightWhite }]}
            >
              <View>
                <Image
                  source={{
                    uri: item.image || Images.petPlaceholder,
                  }}
                  style={styles.brandImage}
                  resizeMode='cover'
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ columnGap: Sizes.xxLarge }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: Sizes.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: Colors.light.white,
    marginRight: Sizes.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.medium,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: Sizes.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: Colors.light.primary,
    borderRadius: Sizes.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    color: Colors.light.white,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: Sizes.large,
    marginRight: Sizes.small,
    marginTop: Sizes.medium,
    color: Colors.light.primary,
  },
  tabsContainer: {
    width: "100%",
    marginTop: Sizes.medium,
    alignItems: "center",
  },
  tab: {
    paddingVertical: Sizes.small / 2,
    paddingHorizontal: Sizes.small,
    borderRadius: Sizes.medium,
    borderWidth: 1,
  },
  tabText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: Sizes.small,
  },
  categoryImage: {
    alignSelf: "center",
    aspectRatio: 1,
  },
  brandImage: {
    alignSelf: "center",
    aspectRatio: 1,
    width: 200,
    borderRadius: Sizes.small,
  },
});
