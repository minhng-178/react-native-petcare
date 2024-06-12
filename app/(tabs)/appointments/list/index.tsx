import { getUserBooking } from "@/apis/booking";
import BookingListItem from "@/components/BookingListItem";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function BookingScreen() {
  const { auth } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getUserBooking,
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
        subtitle='Hiện tại bạn chưa có thông tin lịch book nào'
        navString='home'
        textButton='Thêm mới lịch book'
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <BookingListItem booking={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.medium,
    backgroundColor: Colors.light.lightWhite,
  },
});
