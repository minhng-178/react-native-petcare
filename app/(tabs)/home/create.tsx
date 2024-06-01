import { useState } from "react";
import { Stack, router } from "expo-router";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Sizes from "@/constants/Sizes";
import Button from "@/components/ui/Button";
import CalendarVN from "@/components/CalendarVN";

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleDateSelect = (date: any) => {
    console.log("Selected date:", date);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    setDate(selectedDate ? selectedDate : date);

    console.log("Selected time:", selectedDate);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Đặt lịch hẹn" }} />
      <CalendarVN onDateSelect={handleDateSelect} />

      <Button onPress={() => setShow(true)} text='Show time picker!' />

      {show && (
        <DateTimePicker
          value={date}
          mode='time'
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}

      <Button
        style={{ marginTop: "auto" }}
        text='Đặt ngay'
        onPress={() => router.push("/home/create")}
      />
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
