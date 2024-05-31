import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

import Loader from "./Loader";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import { getServices } from "@/apis/service";
import NearbyServiceItem from "./NearbyServiceItem";

const data = [
  {
    id: 1,
    name: "Haircut",
    rating: 4.5,
    location: "uchiha madara",
    image: "",
  },
];

const NearbyServices = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["service"],
    queryFn: getServices,
  });

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dịch vụ gần bạn</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => <NearbyServiceItem item={item} />}
          contentContainerStyle={{
            columnGap: Sizes.large,
          }}
        />
      </View>
    </View>
  );
};

export default NearbyServices;

const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Sizes.small,
  },
  headerTitle: {
    fontSize: Sizes.large,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  headerBtn: {
    fontSize: Sizes.medium,
    color: Colors.light.gray,
  },
  cardsContainer: {
    marginTop: Sizes.medium,
  },
});
