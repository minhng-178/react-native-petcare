import Button from "@/components/ui/Button";
import Colors from "@/constants/Colors";

import { useState } from "react";
import { Stack, router } from "expo-router";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Quên mật khẩu</Text>

      <Text style={[styles.label, { alignSelf: "flex-start" }]}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <Text style={styles.label}>
        Vui lòng nhập địa chỉ email của bạn để nhận mã xác minh
      </Text>
      <Button
        style={styles.button}
        onPress={() => {
          router.push("/verify");
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
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
  },
  textButton: {
    alignSelf: "center",
    color: Colors.light.primary,
    marginVertical: 10,
  },
  button: {
    marginVertical: 20,
    width: "100%",
  },
});
