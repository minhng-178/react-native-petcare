import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Shadows from "@/constants/Shadows";

const PopularServiceItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://assets.petco.com/petco/image/upload/f_auto,q_auto:best/vet-services-vetco-total-care-lifestyle-img-800x577",
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.brandName} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.serviceName} numberOfLines={1}>
          Thu y
        </Text>
        <View style={styles.infoWrapper}>
          {/* <Text style={styles.publisher(selectedJob, item)}>
            {item?.job_publisher} -
          </Text> */}
          <Text style={styles.location}> {item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularServiceItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: Sizes.medium,
    paddingBottom: Sizes.medium,
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
  },
  brandName: {
    fontSize: Sizes.xSmall,
    color: "#B3AEC6",
  },
  infoContainer: {
    marginTop: Sizes.small,
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
