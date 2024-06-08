import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import Sizes from "@/constants/Sizes";

const AppointmentScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Lịch hẹn" }} />
      <Text>AppointmentScreen</Text>
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.medium,
  },
});
