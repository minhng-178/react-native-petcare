import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Headers from "@/components/Headers";
import NearbyServices from "@/components/NearbyServices";
import PopularServices from "@/components/PopularServices";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Headers />

        <PopularServices />
        <NearbyServices />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.lightWhite,
    paddingHorizontal: Sizes.small,
  },
});
