import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Images from "@/constants/Images";
import Shadows from "@/constants/Shadows";

type PopularServiceItemProps = {
  item: any;
};

const PopularServiceItem = ({ item }: PopularServiceItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: item.image || Images.petPlaceholder,
          }}
          resizeMode='cover'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.brandName} numberOfLines={1}>
        {item.brand.brand_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.serviceName} numberOfLines={1}>
          {item.service_name}
        </Text>
        <View style={styles.infoWrapper}>
          {/* <Text style={styles.publisher(selectedJob, item)}>
            {item?.job_publisher} -
          </Text> */}
          <Text style={styles.location}> {item.category.category_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularServiceItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: Sizes.xLarge,
    borderRadius: Sizes.medium,
    justifyContent: "space-between",
    ...Shadows.medium,
    shadowColor: Colors.light.white,
  },
  logoContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: Sizes.medium,
  },
  brandName: {
    marginTop: Sizes.xSmall,
    fontSize: Sizes.small,
    color: "#B3AEC6",
  },
  infoContainer: {
    marginTop: Sizes.xSmall,
  },
  serviceName: {
    fontSize: Sizes.large,
    color: Colors.light.primary,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  location: {
    fontSize: Sizes.medium - 2,
    color: "#B3AEC6",
  },
});
