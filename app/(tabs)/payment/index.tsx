import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import { usePaymentUrl } from "@/providers/PaymentProvider";

export default function PaymentScreen() {
  const { paymentUrl } = usePaymentUrl();

  const handleNavigationChange = (navState: any) => {};

  return (
    <WebView
      style={styles.container}
      source={{ uri: paymentUrl }}
      onNavigationStateChange={handleNavigationChange}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
