import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import Button from "./ui/Button";
import Sizes from "@/constants/Sizes";
import Images from "@/constants/Images";
import Colors from "@/constants/Colors";

type EmptyStateProps = {
  title: string;
  subtitle: string;
  navString: string;
  textButton: string;
};

const EmptyState = ({
  title,
  subtitle,
  navString,
  textButton,
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Image source={Images.empty} resizeMode='contain' style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Button
        text={textButton}
        onPress={() => router.push(`${navString}`)}
        style={styles.button}
      />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Sizes.xSmall,
    backgroundColor: Colors.light.lightWhite,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: Sizes.medium,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: Sizes.small,
    fontWeight: "500",
  },
  button: {
    width: "100%",
    marginTop: "auto",
  },
});
