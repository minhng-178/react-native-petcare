import axiosInstance from "./axiosInstance";
import { petBreedPath } from "./endpoint";

export const getPetBreeds = async () => {
  try {
    const response = await axiosInstance.get(petBreedPath);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
