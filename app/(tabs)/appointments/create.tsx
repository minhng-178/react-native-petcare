import React from "react";
import { StyleSheet, View } from "react-native";
import CalendarVN from "@/components/CalendarVN";
import Sizes from "@/constants/Sizes";
import { Stack } from "expo-router";

const BookAppointment = () => {
  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Booking Appointment" }} />
      <CalendarVN onDateSelect={handleDateSelect} />
    </View>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.medium,
  },
});
