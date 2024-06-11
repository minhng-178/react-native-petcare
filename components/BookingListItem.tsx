import Colors from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

const BookingListItem = ({ booking }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking ID: {booking.id}</Text>
      <Text style={styles.text}>Booking Date: {booking.booking_date}</Text>
      <Text style={styles.text}>
        Status: {booking.status ? "Active" : "Inactive"}
      </Text>
      <Text style={styles.text}>Appointment ID: {booking.appointment.id}</Text>
      <Text style={styles.text}>
        Appointment Date: {booking.appointment.appointment_date}
      </Text>
      <Text style={styles.text}>
        Appointment Time: {booking.appointment.appointment_time}
      </Text>
    </View>
  );
};

export default BookingListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: Colors.light.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
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
});
