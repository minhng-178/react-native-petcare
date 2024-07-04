import { FlatList, StyleSheet, View } from "react-native";

import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import BookingListItem from "@/components/BookingListItem";

import { getUserBooking } from "@/apis/booking";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";

export default function BookingScreen() {
  const { auth } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getUserBooking,
  });

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

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title='Lỗi rồi'
        subtitle='Hiện tại bạn chưa có thông tin lịch book nào'
        navString='home'
        textButton='Thêm mới lịch book'
      />
    );
  }

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <BookingListItem booking={item} index={index} />
        )}
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
