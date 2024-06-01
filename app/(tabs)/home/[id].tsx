import { Image, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

import Button from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getService } from "@/apis/service";
import Loader from "@/components/Loader";
import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Images from "@/constants/Images";
import { ScrollView } from "react-native-virtualized-view";

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
                <Text style={styles.time}>{data.startTime}</Text>
              </View>
              <Text style={{ fontSize: 20 }}> - </Text>
              <View style={styles.timeCard}>
                <Text style={styles.time}>{data.endTime}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.description}>{data.service_description}</Text>
        </View>
      </ScrollView>
      <Button
        style={{ marginTop: "auto" }}
        text='Đặt lịch hẹn'
        onPress={() => router.push("/home/create")}
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
