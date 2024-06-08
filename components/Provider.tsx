import { ReactNode } from "react";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Toast from "react-native-toast-message";
import AuthProvider from "@/providers/AuthProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PetTypeProvider } from "@/providers/PetTypeProvider";
import PaymentUrlProvider from "@/providers/PaymentProvider";

type ProvidersProps = {
  children: ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <>
      <ThemeProvider value={DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PaymentUrlProvider>
              <PetTypeProvider>{children}</PetTypeProvider>
            </PaymentUrlProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
      <Toast topOffset={120} />
    </>
  );
};

export default Providers;
