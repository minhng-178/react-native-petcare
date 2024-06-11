import { getUserBooking } from "@/apis/booking";
import BookingListItem from "@/components/BookingListItem";
import Loader from "@/components/Loader";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function BookingScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getUserBooking,
  });

  console.log(data);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <BookingListItem booking={item} />}
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
