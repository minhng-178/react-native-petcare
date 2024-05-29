import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "@/constants/Colors";
import Button from "@/components/ui/Button";

export default function Welcome() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkWelcomeStatus = async () => {
      try {
        const welcomeShown = await AsyncStorage.getItem("welcomeShown");
        if (!welcomeShown) {
          await AsyncStorage.setItem("welcomeShown", "true");
        } else {
          router.push("/(tabs)/home");
        }
      } catch (error) {
        console.log("Error checking welcome status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkWelcomeStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={Colors.light.primary} size={"large"} />
      ) : (
        <>
          <View>
            <Text style={styles.subTitle}>Chào mừng bạn đến với</Text>
            <Text style={styles.title}>Fur-ever Friend</Text>
            <Text style={styles.subTitle}>dịch vụ chăm sóc thú cưng</Text>
          </View>
          <Image source={require("../assets/images/logo.png")} />
          <Button
            style={styles.button}
            text='Đăng nhập'
            onPress={() => router.push("/sign-in")}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  containerTitle: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "medium",
    color: Colors.light.primary,
  },
  button: { width: "100%" },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
