import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Shadows from "@/constants/Shadows";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import { Link, useSegments } from "expo-router";

const NearbyServiceItem = ({ item }) => {
  const segement = useSegments();

  return (
    <Link href={`/${segement[0]}/home/${item.id}}`} asChild>
      <TouchableOpacity style={styles.container} onPress={() => {}}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://veterinary.rossu.edu/sites/g/files/krcnkv416/files/styles/atge_default_md/public/2021-08/blog-veterinary-vet-school-requirements-to-know_herom.jpg?itok=ppqCvyru",
            }}
            resizeMode='contain'
            style={styles.logoImage}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.serviceName} numberOfLines={1}>
            {item.name}
          </Text>

          <Text>haha</Text>
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
