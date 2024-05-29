import { useState } from "react";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, StyleSheet, Text, TextInput } from "react-native";

import { login } from "@/apis/auth";
import Colors from "@/constants/Colors";
import Button from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";
import { SignInWithProviderButton } from "@/components/ui/SignInWithProviderButton";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateAuth, signInWithGoogle } = useAuth();

  const handleGoogleSignin = async () => {
    signInWithGoogle();
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Lỗi", "Vui lòng điền vào tất cả các trường");
    }

    if (!email.includes("@")) {
      Alert.alert("Lỗi", "Email phải hợp lệ");
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 8 ký tự");
    }

    setLoading(true);

    try {
      const data = await login(email, password);

      if (!data) {
        Alert.alert("Error", "Login falied!");
      }

      updateAuth(data.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>Chào mừng trở lại</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder='Email'
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder='Mật khẩu'
        style={[styles.input, { marginBottom: 2 }]}
        secureTextEntry
      />
      <Link
        href={"/forget-pw"}
        style={[
          styles.label,
          {
            alignSelf: "flex-end",
            color: Colors.light.primary,
            marginBottom: 5,
          },
        ]}
      >
        Quên mật khẩu ?
      </Link>

      <Button
        onPress={handleLogin}
        disabled={loading}
        text={loading ? "Đang đăng nhập..." : "Đăng nhập"}
      />

      <Text
        style={{
          marginHorizontal: "auto",
          marginVertical: 10,
          color: "gray",
        }}
      >
        Hoặc tiếp tục với
      </Text>

      <SignInWithProviderButton
        provider='Google'
        onPress={() => {
          handleGoogleSignin();
        }}
        logo={require("../../assets/images/google.png")}
      />
      <Link href='/sign-up' style={styles.textButton}>
        Chưa có tài khoản? <Text style={{ fontWeight: "bold" }}>Đăng ký</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: Colors.light.primary,
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
  },
  textButton: {
    alignSelf: "center",
    color: Colors.light.primary,
    marginVertical: 10,
  },
});
