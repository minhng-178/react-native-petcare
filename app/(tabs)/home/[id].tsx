import { useQuery } from "@tanstack/react-query";
import { ScrollView } from "react-native-virtualized-view";
import { Image, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

import Button from "@/components/ui/Button";
import { getService } from "@/apis/service";
import Loader from "@/components/Loader";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Images from "@/constants/Images";

const ServiceDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["service"],
    queryFn: () => {
      if (typeof id === "string") {
        return getService(id);
      }
    },
  });

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack.Screen options={{ title: `${data.service_name}` }} />
        <Image
          source={{ uri: data.image || Images.petPlaceholder }}
          style={styles.image}
          resizeMode='contain'
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.service_name}</Text>

          <View style={styles.timesWrapper}>
            <Text>Giờ mở cửa:</Text>
            <View style={styles.times}>
              <View style={styles.timeCard}>
                <Text style={styles.time}>{data.starttime}</Text>
              </View>
              <Text style={{ fontSize: 20 }}> - </Text>
              <View style={styles.timeCard}>
                <Text style={styles.time}>{data.endtime}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.subtitle}>Nhãn hàng</Text>
          <Text style={styles.description}>{data.brand.brand_name}</Text>
          <Text style={styles.subtitle}>Danh mục</Text>
          <Text style={styles.description}>{data.category.category_name}</Text>
          <Text style={styles.subtitle}>Địa chỉ</Text>
          <Text style={styles.description}>{data.location.location_name}</Text>
          <Text style={styles.subtitle}>Mô tả</Text>
          <Text style={styles.description}>{data.service_description}</Text>
        </View>
      </ScrollView>
      <Button
        style={{ marginTop: "auto" }}
        text='Đặt lịch hẹn'
        onPress={() => router.push(`/home/create?id=${id}`)}
      />
    </View>
  );
};

export default ServiceDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.medium,
    backgroundColor: Colors.light.lightWhite,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: Sizes.medium,
    marginBottom: Sizes.small,
  },
  textContainer: {
    padding: Sizes.medium,
  },
  title: {
    fontSize: Sizes.large,
    fontWeight: "bold",
    marginBottom: Sizes.small,
    color: Colors.light.primary,
  },
  subtitle: {
    fontSize: Sizes.medium,
    fontWeight: "bold",
    marginBottom: Sizes.small,
  },
  description: {
    fontSize: Sizes.medium,
    marginBottom: Sizes.small,
  },
  timesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Sizes.small,
  },
  times: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  timeCard: {
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
    borderRadius: Sizes.xSmall,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.lightWhite,
  },
  time: {
    fontSize: Sizes.large,
    color: Colors.dark.primary,
  },
});
