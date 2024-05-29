import Colors from "@/constants/Colors";
import {
  View,
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";

type LoaderProps = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) return null;

  return (
    <View style={[styles.container]}>
      <ActivityIndicator
        animating={isLoading}
        color={Colors.light.primary}
        size={"large"}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light.lightWhite,
    zIndex: 10,
  },
});
