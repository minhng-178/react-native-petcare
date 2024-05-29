import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function AppointmentStack() {
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
      <Stack.Screen name='index' options={{ title: "Lịch hẹn" }} />
    </Stack>
  );
}
