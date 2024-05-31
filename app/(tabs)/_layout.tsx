import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: { marginTop: 3 },
      }}
    >
      <Tabs.Screen name='index' options={{ href: null }} />

      <Tabs.Screen
        name='home'
        options={{
          title: "Trang chủ",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='pets'
        options={{
          title: "Thú cưng",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='paw' color={color} />,
        }}
      />
      <Tabs.Screen
        name='appointments'
        options={{
          title: "Lịch hẹn",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='calendar' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Hồ sơ",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='user-circle' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
