import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Button from "@/components/ui/Button";
import Shadows from "@/constants/Shadows";

const PetDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: `Pet #${id}` }} />

      <Image
        style={styles.profileImage}
        source={{ uri: "https://placehold.co/600x400/png" }}
      />
      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors.light.primary,
            marginBottom: Sizes.medium,
            alignItems: "flex-start",
          },
        ]}
      >
        <Text style={styles.name}>Tên thú cưng</Text>
        <Text style={styles.breed}>Chó</Text>
      </View>

      <View style={styles.rowContainer}>
        <FontAwesome
          name='paw'
          size={24}
          style={{ marginRight: 6 }}
          color={"#767676"}
        />
        <Text style={styles.textHeader}>Về thú cưng</Text>
      </View>
      <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
        <View style={styles.card}>
          <Text style={styles.textSubTitle}>Tuổi</Text>
          <Text style={styles.textSubContent}>3</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.textSubTitle}>Cân nặng</Text>
          <Text style={styles.textSubContent}>12kg</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.textSubTitle}>Chiều cao</Text>
          <Text style={styles.textSubContent}>65cm</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.textSubTitle}>Giống</Text>
          <Text style={styles.textSubContent}>Pug</Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <FontAwesome
          name='calendar-check-o'
          size={24}
          style={{ marginRight: 6 }}
          color={"#767676"}
        />
        <Text style={styles.textHeader}>Về lịch hẹn</Text>
      </View>
      <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
        <Text style={{ fontSize: Sizes.medium }}>
          Hãy đặt cuộc hẹn đầu tiên của bạn
        </Text>
        <Button text='Xem thêm' onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default PetDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.medium,
    backgroundColor: Colors.light.lightWhite,
  },
  profileImage: {
    width: 200,
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: Sizes.xLarge,
    marginBottom: Sizes.medium,
  },
  name: {
    fontSize: Sizes.xLarge,
    fontWeight: "bold",
    marginBottom: Sizes.xSmall,
  },
  breed: {
    fontSize: Sizes.medium,
    fontWeight: "bold",
    color: Colors.light.lightWhite,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.medium,
  },
  textHeader: {
    fontSize: Sizes.medium,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  card: {
    backgroundColor: Colors.light.secondary,
    borderRadius: Sizes.medium,
    paddingVertical: Sizes.small,
    paddingHorizontal: Sizes.large,
    alignItems: "center",
    ...Shadows.medium,
    shadowColor: Colors.light.white,
  },
  textSubTitle: {
    fontSize: Sizes.small + 3,
    fontWeight: "bold",
  },
  textSubContent: {
    color: Colors.light.lightWhite,
    fontWeight: "bold",
  },
});
