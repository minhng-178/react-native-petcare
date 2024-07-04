import Sizes from "@/constants/Sizes";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BadgeProps {
  status: string;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  let backgroundColor = "grey";
  let text = "";

  switch (status) {
    case "paid":
      backgroundColor = "green";
      text = "Đã thanh toán";
      break;
    case "not_paid":
      backgroundColor = "orange";
      text = "Chưa thanh toán";
      break;
    case "processing":
      backgroundColor = "red";
      text = "Đang xử lý";
      break;
    case "completed":
      backgroundColor = "#4CAF50";
      text = "Hoàn thành";
      break;
    case "delayed":
      backgroundColor = "#FFEB3B";
      text = "Bị trì hoãn";
      break;
    case "not_completed":
      backgroundColor = "#F44336";
      text = "Không hoàn thành";
      break;
    default:
      break;
  }

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: Sizes.large,
    padding: Sizes.small,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: Sizes.medium,
  },
});

export default Badge;
