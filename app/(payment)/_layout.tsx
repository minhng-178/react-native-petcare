import { Stack } from "expo-router";

const PaymentLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: "Thanh toán",
        }}
      />
    </Stack>
  );
};

export default PaymentLayout;
