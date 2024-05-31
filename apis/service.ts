import axiosInstance from "./axiosInstance";
import { servivePath } from "./endpoint";

export const getServices = async () => {
  try {
    const response = await axiosInstance.get(servivePath);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
