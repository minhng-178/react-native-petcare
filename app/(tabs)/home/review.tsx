import { useState } from "react";
import Toast from "react-native-toast-message";
import { Image, StyleSheet, Text, View } from "react-native";
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
      {/* <Image
        source={{ uri: data.image || Images.petPlaceholder }}
        style={styles.image}
        resizeMode='contain'
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.service_name}</Text>

        <View style={styles.timesWrapper}>
          <Text>Giờ mở cửa:</Text>
          <View style={styles.times}>
            <View style={styles.timeCard}>
              <Text style={styles.time}>{data.starttime}</Text>
            </View>
            <Text style={{ fontSize: 20 }}> - </Text>
            <View style={styles.timeCard}>
              <Text style={styles.time}>{data.endtime}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.subtitle}>Nhãn hàng</Text>
        <Text style={styles.description}>{data.brand.brand_name}</Text>
        <Text style={styles.subtitle}>Danh mục</Text>
        <Text style={styles.description}>{data.category.category_name}</Text>
        <Text style={styles.subtitle}>Địa chỉ</Text>
        <Text style={styles.description}>{data.location.location_name}</Text>
        <Text style={styles.subtitle}>Mô tả</Text>
        <Text style={styles.description}>{data.service_description}</Text>
      </View> */}
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
