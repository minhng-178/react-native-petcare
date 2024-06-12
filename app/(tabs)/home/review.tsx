import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Images from "@/constants/Images";
import Button from "@/components/ui/Button";
import { getAppointmentById } from "@/apis/appointment";
import { usePaymentUrl } from "@/providers/PaymentProvider";
import { format } from "date-fns";
import Loader from "@/components/Loader";
import Shadows from "@/constants/Shadows";

const Review = () => {
  const { id } = useLocalSearchParams();
  const { handleCheckout, isLoading } = usePaymentUrl();
  const { data, isLoading: isLoadingAppointment } = useQuery({
    queryKey: ["appointment"],
    queryFn: () => {
      if (typeof id === "string") {
        return getAppointmentById(id);
      }
    },
  });

  const today = new Date();
  const [form, setForm] = useState({
    appointment_id: id,
    booking_date: today.toISOString(),
  });

  const onSubmit = () => {
    handleCheckout(form);
  };

  if (isLoadingAppointment) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Review lịch hẹn" }} />
      <Image
        source={{ uri: data?.pet.image || Images.petPlaceholder }}
        style={styles.image}
        resizeMode='cover'
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.service.service_name}</Text>
        <Text style={styles.subtitle}>Pet Name: {data.pet.pet_name}</Text>
        <Text style={styles.subtitle}>
          Appointment Date:{" "}
          {format(new Date(data.appointment_date), "dd/MM/yyyy")}
        </Text>
        <Text style={styles.subtitle}>
          Appointment Time: {data.appointment_time}
        </Text>

        <Text style={styles.price}>Price: {data.service.price}</Text>
      </View>
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
    padding: 20,
    backgroundColor: Colors.light.lightWhite,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  textContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    ...Shadows.small,
    shadowColor: Colors.light.lightWhite,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.light.primary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.light.primary,
  },
});
