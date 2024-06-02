import { Link, useSegments } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Colors from "../constants/Colors";
import Images from "@/constants/Images";
import { Pet } from "@/types";
import Sizes from "@/constants/Sizes";

function calculateAge(dob: string) {
  const dobDate = new Date(dob);

  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDifference = today.getMonth() - dobDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dobDate.getDate())
  ) {
    age--;
  }

  return age;
}

type PetListProps = {
  pets: Pet;
};

const PetListItem = ({ pets }: PetListProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/pets/${pets.id}`} asChild>
      <Pressable style={styles.container} onPress={() => {}}>
        <Image
          source={{ uri: pets?.image || Images.petPlaceholder }}
          style={styles.image}
          resizeMode='cover'
        />
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {pets?.pet_name}
            </Text>
            <Text style={styles.price}>
              Tuổi: {calculateAge(pets?.pet_dob)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: Sizes.medium,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 5,
    color: Colors.light.text,
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: Colors.light.primary,
  },
  checkbox: {
    margin: 8,
  },
});

export default PetListItem;
