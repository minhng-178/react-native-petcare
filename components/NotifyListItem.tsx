import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StyleSheet, Text, View } from "react-native";

type NotifyListItemProps = {
  notifyItem: any;
};

const NotifyListItem = ({ notifyItem }: NotifyListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{notifyItem.title}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.desc}>{notifyItem.description}</Text>
          {/* <Text>Size: {cartItem.size}</Text> */}
        </View>
      </View>
    </View>
  );
};

export default NotifyListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: Sizes.medium,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  desc: {
    fontSize: Sizes.small,
    fontWeight: "500",
  },
});
