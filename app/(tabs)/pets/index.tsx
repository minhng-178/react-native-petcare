import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";
import { getUserPets } from "@/apis/pet";
import Button from "@/components/ui/Button";
import PetListItem from "@/components/PetListItem";
import Loader from "@/components/Loader";

export default function PetScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: getUserPets,
  });

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <PetListItem pets={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
      <Button
        style={styles.button}
        text='Thêm mới thú cưng'
        onPress={() => router.push("pets/create")}
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
