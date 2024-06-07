import { Alert } from "react-native";
import axiosInstance from "./axiosInstance";
import {
  loginGooglePath,
  loginPath,
  profilePath,
  registerPath,
} from "./endpoint";

export const login = async (email: string, password: string) => {
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await axiosInstance.post(loginPath, data);

    if (response.status === 400) {
      Alert.alert("Error", "Email or Password is incorrect");
    }

    if (response.status === 201) {
      return response.data;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const register = async (
  full_name: string,
  email: string,
  password: string,
  phone_number: string
) => {
  const data = {
    full_name: full_name,
    email: email,
    password: password,
    phone_number: phone_number,
  };
  try {
    const response = await axiosInstance.post(registerPath, data);
    if (response.status === 400) {
      Alert.alert("Error", "Email or Password is incorrect");
    }

    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginWithGoogle = async (user: any) => {
  const data = {
    name: user.name,
    email: user.email,
    photoUrl: user.photo,
  };

  try {
    const response = await axiosInstance.post(loginGooglePath, data);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(profilePath);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
