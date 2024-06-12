import axiosInstance from "./axiosInstance";
import { serviceIdPath, servivePath } from "./endpoint";

export const getServices = async () => {
  try {
    const response = await axiosInstance.get(servivePath);

    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};

export const getService = async (id: string) => {
  try {
    const response = await axiosInstance.get(serviceIdPath(id));
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
