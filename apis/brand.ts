import axiosInstance from "./axiosInstance";
import { brandPath } from "./endpoint";

export const getBrands = async () => {
  try {
    const response = await axiosInstance.get(brandPath);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
