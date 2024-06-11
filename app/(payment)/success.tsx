import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Image, StyleSheet, Text, View } from "react-native";

import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Button from "@/components/ui/Button";

const Success = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode='contain'
        source={{
          uri: "https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif",
        }}
      />
      <Text style={styles.text}>Payment Success!</Text>
      <Button
        text='Trở về'
        style={{ width: "100%" }}
        onPress={() => {
          router.push("/");
          Toast.show({ text1: "Thanh toán thành công!" });
        }}
      />
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Sizes.medium,
    backgroundColor: Colors.light.lightWhite,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  text: {
    marginBottom: 40,
    fontWeight: "bold",
    fontSize: Sizes.large,
  },
});
