import { format } from "date-fns";
import { StyleSheet, Text, View } from "react-native";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Shadows from "@/constants/Shadows";

const AppoinmentListItem = ({ appointment }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>
        Appointment ID: {appointment.appointment_id}
      </Text>
      <Text style={styles.text} numberOfLines={1}>
        Pet ID: {appointment.pet_id}
      </Text>
      <Text style={styles.text} numberOfLines={1}>
        Service ID: {appointment.service_id}
      </Text>
      <Text style={styles.text}>
        Appointment Date:{" "}
        {format(new Date(appointment.appointment_date), "dd/MM/yyyy")}
      </Text>
      <Text style={styles.text}>
        Appointment Time: {appointment.appointment_time}
      </Text>
      <Text style={styles.text}>
        Status: {appointment.status ? "Active" : "Inactive"}
      </Text>
    </View>
  );
};

export default AppoinmentListItem;

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
});
