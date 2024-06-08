import { Tabs, withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "@/constants/Colors";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function AppointmentListNavigator() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: Colors.light.lightWhite }}
    >
      <TopTabs
        screenOptions={{
          tabBarActiveTintColor: Colors.light.primary,
          tabBarInactiveTintColor: Colors.light.gray,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.light.secondary,
          },
        }}
      >
        <TopTabs.Screen name='index' options={{ title: "Lịch booking" }} />
      </TopTabs>
    </SafeAreaView>
  );
}
