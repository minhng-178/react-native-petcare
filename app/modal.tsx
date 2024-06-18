import { Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";

import Sizes from "@/constants/Sizes";
import Loader from "@/components/Loader";
import { getNotifications } from "@/apis/notify";
import { useAuth } from "@/providers/AuthProvider";
import NotifyListItem from "@/components/NotifyListItem";
import EmptyState from "@/components/EmptyState";

export default function ModalScreen() {
  const { user, auth } = useAuth();

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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.small,
  },
});
