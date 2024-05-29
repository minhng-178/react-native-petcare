import { Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

export default function ProfileStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href='/modal' asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name='bell'
                  size={25}
                  color={Colors.light.primary}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen name='index' options={{ title: "Hồ sơ" }} />
    </Stack>
  );
}
