import { useState } from "react";
import Toast from "react-native-toast-message";
import { StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { createBooking } from "@/apis/booking";
import Button from "@/components/ui/Button";
import { usePaymentUrl } from "@/providers/PaymentProvider";

const Review = () => {
  const { id } = useLocalSearchParams();
  const { handleCheckout, isLoading } = usePaymentUrl();

  const today = new Date();
  const [form, setForm] = useState({
    appointment_id: id,
    booking_date: today.toISOString(),
  });

  const onSubmit = () => {
    handleCheckout(form);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Review lịch hẹn" }} />
      <Text>{id}</Text>
      <Button
        text={isLoading ? "Đang đặt..." : "Đặt ngay"}
        onPress={onSubmit}
      />
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.medium,
    backgroundColor: Colors.light.lightWhite,
  },
});
