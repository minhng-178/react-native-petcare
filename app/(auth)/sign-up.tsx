import { useState } from "react";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, StyleSheet, Text, TextInput } from "react-native";

import { register } from "@/apis/auth";
import Colors from "@/constants/Colors";
import Button from "@/components/ui/Button";
import { SignInWithProviderButton } from "@/components/ui/SignInWithProviderButton";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (fullName === "" || email === "" || password === "" || phone === "") {
      Alert.alert("Lỗi", "Vui lòng điền vào tất cả các trường");
    }

    if (!email.includes("@")) {
      Alert.alert("Lỗi", "Email phải hợp lệ");
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 8 ký tự");
    }

    if (phone.length < 10) {
      Alert.alert("Lỗi", "Số điện thoại phải có ít nhất 10 số");
    }

    setLoading(true);
    try {
      await register(fullName, email, password, phone);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>
        Let's make {"\n"}
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>New Friend</Text>
      </Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder='Họ và Tên'
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder='Email'
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder='Mật khẩu'
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder='Số điện thoại'
        style={styles.input}
        keyboardType='numeric'
      />

      <Button
        onPress={handleRegister}
        disabled={loading}
        text={loading ? "Đang đăng ký..." : "Đăng ký"}
      />

      <Text
        style={{ marginHorizontal: "auto", marginVertical: 10, color: "gray" }}
      >
        Hoặc tiếp tục với
      </Text>

      <SignInWithProviderButton
        provider='Google'
        onPress={() => {}}
        logo={require("../../assets/images/google.png")}
      />
      <Link href='/sign-in' style={styles.textButton}>
        Đã có tài khoản? <Text style={{ fontWeight: "bold" }}>Đăng nhập</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    color: Colors.light.primary,
    fontWeight: "regular",
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
  },
  textButton: {
    alignSelf: "center",
    color: Colors.light.primary,
    marginVertical: 10,
  },
});
