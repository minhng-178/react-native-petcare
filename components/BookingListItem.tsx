import { format } from "date-fns";
import Colors from "@/constants/Colors";
import Shadows from "@/constants/Shadows";

import { StyleSheet, Text, View } from "react-native";
import Badge from "./Badge";

const BookingListItem = ({ booking, index }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>
        Booking ID: {index + 1}
      </Text>
      <Text style={styles.text}>
        <Badge status={booking.status_string} />
      </Text>
      <Text style={styles.text}>
        Ngày đặt chỗ: {format(new Date(booking.booking_date), "dd/MM/yyyy")}
      </Text>
      <Text style={styles.text}>
        Ngày hẹn:{" "}
        {format(new Date(booking.appointment.appointment_date), "dd/MM/yyyy")}
      </Text>
      <Text style={styles.text}>
        Thời gian hẹn: {booking.appointment.appointment_time}
      </Text>
      <Text style={styles.text}>
        Dịch vụ: {booking.appointment.service.service_name}
      </Text>
      <Text style={styles.text}>
        Thú cưng: {booking.appointment.pet.pet_name}
      </Text>

      <Text style={styles.price}>{booking.appointment.service.price} VND</Text>
    </View>
  );
};

export default BookingListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
    ...Shadows.medium,
    shadowColor: Colors.light.gray2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
});
