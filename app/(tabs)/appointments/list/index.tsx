import Sizes from "@/constants/Sizes";
import { StyleSheet, Text, View } from "react-native";

export default function BookingScreen() {
  return (
    <View style={styles.container}>
      <Text>Booking Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.medium,
  },
});
