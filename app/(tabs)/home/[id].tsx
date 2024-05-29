import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import Button from "@/components/ui/Button";

const ServiceDetailsScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Service name" }} />
      <Text>ServiceDetailsScreen</Text>
      <Button
        text='Đặt lịch hẹn'
        onPress={() => router.push("/appointments/create")}
      />
    </View>
  );
};

export default ServiceDetailsScreen;

const styles = StyleSheet.create({});
