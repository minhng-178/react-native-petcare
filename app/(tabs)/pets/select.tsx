import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Sizes from "@/constants/Sizes";
import Images from "@/constants/Images";
import Colors from "@/constants/Colors";
import Loader from "@/components/Loader";
import { getPetTypes } from "@/apis/petType";
import { usePetType } from "@/providers/PetTypeProvider";

const SelectPetType = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["petTypes"],
    queryFn: getPetTypes,
  });

  const { setId } = usePetType();

  const [type, setType] = useState<string | null>(null);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  const dataWithImages = data.map((item: any) => {
    let image;
    switch (item.type_name) {
      case "dog":
        image = Images.dog;
        break;
      case "cat":
        image = Images.cat;
        break;
      default:
        image = null;
    }
    return { ...item, image };
  });

  const handleTypePress = async (typeName: string, idPet: string) => {
    await AsyncStorage.setItem("idPet", idPet);

    setType((prev) => (prev === typeName ? null : typeName));
    setId(idPet);
    router.push("pets/create");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Lưa chọn loại thú cưng" }} />

      <FlatList
        contentContainerStyle={{
          marginTop: Sizes.xxLarge + 100,
        }}
        data={dataWithImages}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleTypePress(item.type_name, item.id)}
            style={[
              styles.card,
              {
                borderColor:
                  type === item.type_name
                    ? Colors.light.secondary
                    : Colors.light.gray2,
              },
            ]}
          >
            <Text
              style={[
                styles.cardText,
                {
                  color:
                    type === item.type_name
                      ? Colors.light.secondary
                      : Colors.light.gray2,
                },
              ]}
            >
              {item.type_name}
            </Text>
            <Image
              style={styles.typeImage}
              source={item.image}
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SelectPetType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.lightWhite,
  },
  card: {
    padding: Sizes.large,
    borderRadius: Sizes.medium,
    borderWidth: 1,
    alignSelf: "center",
    width: "80%",
    marginVertical: Sizes.large,
  },
  cardText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: Sizes.large,
    marginBottom: Sizes.medium,
  },
  typeImage: {
    alignSelf: "center",
    aspectRatio: 1,
    width: "100%",
  },
});
