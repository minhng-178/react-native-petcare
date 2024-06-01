import Sizes from "@/constants/Sizes";
import { StyleSheet, Text, View } from "react-native";

export default function AppointmentScreen() {
  return (
    <View style={styles.container}>
      <Text>Appointment Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.medium,
  },
});
