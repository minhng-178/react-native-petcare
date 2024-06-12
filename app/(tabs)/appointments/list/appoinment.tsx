import { Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";

import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Loader from "@/components/Loader";
import { getAppointmentbyUser } from "@/apis/appointment";
import AppoinmentListItem from "@/components/AppoinmentListItem";
import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/providers/AuthProvider";

const AppointmentScreen = () => {
  const { auth } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointmentbyUser,
  });

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (!auth) {
    return (
      <EmptyState
        title='Lỗi rồi'
        subtitle='Hiện tại bạn chưa đăng nhập'
        navString='/sign-in'
        textButton='Đăng nhập ngay'
      />
    );
  }

  if (!data || data.lenght === 0) {
    return (
      <EmptyState
        title='Lỗi rồi'
        subtitle='Hiện tại bạn chưa có thông tin lịch hẹn nào'
        navString='home'
        textButton='Thêm mới lịch hẹn'
      />
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Lịch hẹn" }} />
      <FlatList
        data={data}
        renderItem={({ item }) => <AppoinmentListItem appointment={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.large,
    backgroundColor: Colors.light.lightWhite,
  },
});
