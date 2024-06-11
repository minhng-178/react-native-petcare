import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { getUserPets } from "@/apis/pet";

import Colors from "@/constants/Colors";
import Loader from "@/components/Loader";
import Button from "@/components/ui/Button";
import PetListItem from "@/components/PetListItem";

export default function PetScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userPets"],
    queryFn: getUserPets,
  });

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (!data) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <PetListItem pets={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        showsVerticalScrollIndicator={false}
      />
      <Button
        style={styles.button}
        text='Thêm mới thú cưng'
        onPress={() => router.push("pets/select")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: Colors.light.lightWhite,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
  },
});
