import React from "react";
import { Link, useSegments } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Images from "@/constants/Images";
import Shadows from "@/constants/Shadows";

type NearbyServiceItemProps = {
  item: any;
};

const NearbyServiceItem = ({ item }: NearbyServiceItemProps) => {
  const segement = useSegments();

  return (
    <Link href={`/${segement[0]}/home/${item.id}}`} asChild>
      <TouchableOpacity style={styles.container} onPress={() => {}}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: item.image || Images.petPlaceholder,
            }}
            resizeMode='cover'
            style={styles.logoImage}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.serviceName} numberOfLines={1}>
            {item.service_name}
          </Text>

          <Text>{item.brand.brand_name}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default NearbyServiceItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: Sizes.medium,
    borderRadius: Sizes.small,
    backgroundColor: "#FFF",
    ...Shadows.medium,
    shadowColor: Colors.light.white,
    marginVertical: Sizes.xSmall,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: Colors.light.white,
    borderRadius: Sizes.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: Sizes.medium,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: Sizes.medium,
  },
  serviceName: {
    fontSize: Sizes.medium,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
});
