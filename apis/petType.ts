import axiosInstance from "./axiosInstance";
import { petTypePath } from "./endpoint";

export const getPetTypes = async () => {
  try {
    const response = await axiosInstance.get(petTypePath);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
