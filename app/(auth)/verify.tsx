import Colors from "@/constants/Colors";
import Button from "@/components/ui/Button";

import { useState } from "react";
import { Stack, router } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInput from "@/components/ui/OTPInput";

export default function Verify() {
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Xác nhận email của bạn</Text>

      <Text style={styles.label}>
        Vui lòng nhập mã gồm 4 chữ số Gửi tới email của bạn
      </Text>

      <OTPInput />

      <Button
        style={styles.button}
        onPress={() => {
          router.push("/new-pw");
        }}
        disabled={loading}
        text={loading ? "Đang gửi" : "Gửi"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: Colors.light.primary,
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    color: "gray",
    marginBottom: 20,
  },
  button: {
    marginVertical: 20,
    width: "100%",
  },
});
