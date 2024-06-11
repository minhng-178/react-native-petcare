import { View, Text, StyleSheet } from "react-native";

interface BadgeProps {
  status: string;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  let backgroundColor = "grey";

  switch (status) {
    case "Thành công":
      backgroundColor = "green";
      break;
    case "Đợi duyệt":
      backgroundColor = "orange";
      break;

    case "Hủy":
      backgroundColor = "red";
      break;
  }

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default Badge;
