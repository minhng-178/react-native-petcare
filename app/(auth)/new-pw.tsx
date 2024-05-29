import Button from "@/components/ui/Button";
import Colors from "@/constants/Colors";

import { useState } from "react";
import { Stack, router } from "expo-router";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Tạo mật khẩu mới</Text>

      <Text style={[styles.label, { alignSelf: "flex-start" }]}>
        Mật khẩu mới
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Text style={[styles.label, { alignSelf: "flex-start" }]}>
        Nhập lại mật khẩu
      </Text>
      <TextInput
        value={confirmPW}
        onChangeText={setConfirmPW}
        style={styles.input}
      />
      <Button
        style={styles.button}
        onPress={() => {
          router.push("/sign-in");
        }}
        disabled={loading}
        text={loading ? "Đang gửi..." : "Gửi"}
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
