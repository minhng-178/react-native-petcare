import axiosInstance from "./axiosInstance";
import { userPetPath } from "./endpoint";

export const getUserPets = async () => {
  try {
    const response = await axiosInstance.get(userPetPath);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
