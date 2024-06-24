import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Loader from "@/components/Loader";
import Shadows from "@/constants/Shadows";
import Button from "@/components/ui/Button";
import { deletePet, getPet } from "@/apis/pet";
import { calculateAge } from "@/utils/dateFormat";

const PetDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => {
      if (typeof id === "string") {
        return getPet(id);
      }
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["deletePet"],
    mutationFn: (id: string) => deletePet(id),
    onSuccess: () => {
      router.push("/pets");
      Toast.show({ text1: "Xoá thành công" });
    },
  });

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: `${data.pet_name}`,
          headerRight: () => (
            <Link href={`/pets/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='pencil'
                    size={25}
                    color={Colors.light.primary}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Image
        style={styles.profileImage}
        source={{ uri: data.image || "https://placehold.co/600x400/png" }}
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
        <Text style={styles.name}>{data.pet_name}</Text>
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
          <Text style={styles.textSubContent}>
            {calculateAge(data?.pet_dob)}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.textSubTitle}>Cân nặng</Text>
          <Text style={styles.textSubContent}>{data.weight}kg</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.textSubTitle}>Chiều cao</Text>
          <Text style={styles.textSubContent}>{data.height}cm</Text>
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

      <Button
        text={isPending ? "Đang xóa..." : "Xoá"}
        style={{
          marginTop: "auto",
        }}
        onPress={() => {
          if (typeof id === "string") {
            return mutate(id);
          }
        }}
      />
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
