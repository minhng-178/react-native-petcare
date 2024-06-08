import { useState } from "react";
import Sizes from "@/constants/Sizes";
import Button from "@/components/ui/Button";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

import Colors from "@/constants/Colors";
import Loader from "@/components/Loader";
import { getUserPets } from "@/apis/pet";
import CalendarVN from "@/components/CalendarVN";
import { FontAwesome } from "@expo/vector-icons";
import { getService } from "@/apis/service";
import { createAppointment } from "@/apis/appointment";

const BookAppointment = () => {
  const { id } = useLocalSearchParams();

  const [form, setForm] = useState({
    pet_id: "",
    service_id: id,
    appointment_date: "",
    appointment_time: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bookingTime, setBookingTime] = useState(new Date());

  const result = useQueries({
    queries: [
      {
        queryKey: ["userPets"],
        queryFn: getUserPets,
      },
      {
        queryKey: ["service"],
        queryFn: () => {
          if (typeof id === "string") {
            return getService(id);
          }
        },
      },
    ],
  });

  const pets = result[0].data;
  const service = result[1].data;

  const [show, setShow] = useState(false);

  const handleDateSelect = (date: any) => {
    setForm({
      ...form,
      appointment_date: new Date(date.timestamp).toISOString(),
    });
  };

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setBookingTime(selectedDate);

      const localTime = selectedDate
        .toLocaleTimeString("en-US", {
          hour12: false,
        })
        .toString();

      const serviceStartTime = new Date(`1970-01-01T${service.starttime}Z`);
      const serviceEndTime = new Date(`1970-01-01T${service.endtime}Z`);
      const selectedTime = new Date(`1970-01-01T${localTime}Z`);

      if (selectedTime >= serviceStartTime && selectedTime <= serviceEndTime) {
        setForm({ ...form, appointment_time: localTime });
      } else {
        alert("Thời gian đã chọn không nằm trong phạm vi thời gian phục vụ.");
        setForm({ ...form, appointment_time: "" });
      }
    }
  };

  const validateInput = () => {
    if (!form.pet_id || !form.appointment_date || !form.appointment_time) {
      alert("Xin hãy nhập tất cả các trường");
      return false;
    }

    return true;
  };

  const resetFields = () => {
    if (typeof id === "string") {
      setForm({
        pet_id: "",
        service_id: id,
        appointment_date: "",
        appointment_time: "",
      });
    }
    setBookingTime(new Date());
  };

  const onSubmit = () => {
    if (typeof id === "string") {
      setForm({ ...form, service_id: id });
    }
    onCreate();
  };

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    setIsLoading(true);
    try {
      const appointment = await createAppointment(form);
      if (appointment) {
        Toast.show({
          text1: "Đặt lịch hẹn thành công",
        });
        resetFields();
        router.push(`/home/review?id=${appointment.id}`);
      }
    } catch (error) {
      throw new Error("Lỗi xảy ra trong quá trình đặt lịch hẹn");
    } finally {
      setIsLoading(false);
    }
  };

  if (!pets) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Đặt lịch hẹn" }} />
      <Text style={[styles.textButton, { alignSelf: "flex-start" }]}>
        <FontAwesome name='calendar-plus-o' size={18} /> Chọn ngày
      </Text>
      <CalendarVN onDateSelect={handleDateSelect} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: Sizes.small,
        }}
      >
        <Text onPress={() => setShow(true)} style={styles.textButton}>
          <FontAwesome name='calendar-times-o' size={18} /> Chọn giờ
        </Text>
        <Text style={styles.label}>{form.appointment_time}</Text>
      </View>

      {show && (
        <DateTimePicker
          value={bookingTime}
          mode='time'
          is24Hour={true}
          display='spinner'
          minuteInterval={30}
          onChange={onChange}
        />
      )}

      <Picker
        style={styles.input}
        selectedValue={form.pet_id}
        onValueChange={(itemValue) => setForm({ ...form, pet_id: itemValue })}
      >
        <Picker.Item label='Xin hãy chọn thú cưng của bạn' value={""} />
        {pets?.map((pet: any) => (
          <Picker.Item key={pet.id} label={pet.pet_name} value={pet.id} />
        ))}
      </Picker>

      <Button
        style={{ marginTop: "auto" }}
        text={isLoading ? "Đang đặt" : "Đặt lịch"}
        onPress={onSubmit}
      />
    </View>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.medium,
    backgroundColor: Colors.light.lightWhite,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.primary,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
});
