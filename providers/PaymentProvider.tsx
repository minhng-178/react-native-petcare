import { createBooking } from "@/apis/booking";
import { router } from "expo-router";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import Toast from "react-native-toast-message";

type PaymentData = {
  paymentUrl: string;
  isLoading: boolean;
  handleCheckout: (order: any) => void;
};

const PaymentUrlContext = createContext<PaymentData>({
  paymentUrl: "",
  isLoading: true,
  handleCheckout: () => {},
});

const PaymentUrlProvider = ({ children }: PropsWithChildren) => {
  const [paymentUrl, setPaymentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (form: any) => {
    try {
      const booking = await createBooking(form);
      if (booking) {
        setPaymentUrl(booking.order_url);
        Toast.show({
          text1: "Tạo booking thành công",
        });
        router.push("/payment");
      }
    } catch (error) {
      throw new Error("Lỗi xảy ra trong lúc booking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaymentUrlContext.Provider
      value={{ paymentUrl, handleCheckout, isLoading }}
    >
      {children}
    </PaymentUrlContext.Provider>
  );
};

export default PaymentUrlProvider;

export const usePaymentUrl = () => useContext(PaymentUrlContext);
