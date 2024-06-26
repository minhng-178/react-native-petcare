import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import Images from "@/constants/Images";
import Button from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";

export default function Profile() {
  const { logout, auth, user } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  const handleLogin = () => {
    router.push("/sign-in");
  };

  return (
    <View style={styles.container}>
      {auth ? (
        <>
          <Image
            source={{ uri: user?.photo || Images.profile }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.email}</Text>
          <Button text='Đăng xuất' onPress={handleLogout} />
        </>
      ) : (
        <Button text='Đăng nhập' onPress={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.lightWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
