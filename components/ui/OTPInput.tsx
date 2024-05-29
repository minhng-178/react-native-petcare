import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

const OTPInput = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleChange(text, index)}
          value={digit}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%", // Adjust as needed
  },
  input: {
    width: "20%", // Adjust as needed
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    textAlign: "center",
    fontSize: 24,
  },
});

export default OTPInput;
