import React from "react";
import { Pressable, Text, StyleSheet, Image } from "react-native";

type SignInWithProviderButtonProps = {
  provider: string;
  logo: any; // The logo prop is the path to the logo image
  onPress: () => void;
};

export const SignInWithProviderButton: React.FC<
  SignInWithProviderButtonProps
> = ({ provider, logo, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>Đăng nhập bằng {provider}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "black",
  },
});
