import { Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";

import Sizes from "@/constants/Sizes";
import Loader from "@/components/Loader";
import { getNotifications } from "@/apis/notify";
import { useAuth } from "@/providers/AuthProvider";
import NotifyListItem from "@/components/NotifyListItem";

export default function ModalScreen() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["Notify"],
    queryFn: () => getNotifications(user.user_id),
  });

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Thông báo" }} />
      <FlatList
        data={data}
        renderItem={({ item }) => <NotifyListItem notifyItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.small,
  },
});
