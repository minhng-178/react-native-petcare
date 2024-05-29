import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "react-native-toast-message";

type AuthData = {
  user: any;
  loading: boolean;
  auth: boolean;
  updateAuth: (userData: any) => void;
  signInWithGoogle: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthData>({
  loading: true,
  user: null,
  auth: false,
  updateAuth: () => {},
  signInWithGoogle: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  GoogleSignin.configure({
    webClientId:
      "183298719619-utu982deb2bfim396ese2fosnnl274kc.apps.googleusercontent.com",
  });

  const updateAuth = async (userData: any) => {
    setUser(userData);
    setIsAuth(true);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    Toast.show({
      text1: "Đăng nhập thành công",
    });
    router.push("/(tabs)/home");
  };

  const signInWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      const userInfo = await GoogleSignin.signIn();
      updateAuth(userInfo.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    setIsAuth(false);
    GoogleSignin.signOut();
    router.push("/");
    Toast.show({
      text1: "Đăng xuất thành công",
    });
  };

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuth(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, loading, user, updateAuth, signInWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
