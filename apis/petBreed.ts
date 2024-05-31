import axiosInstance from "./axiosInstance";
import { petBreedPath, petBreedWithTypePath } from "./endpoint";

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

export const getPetBreedsWithType = async (id: string | null) => {
  try {
    const response = await axiosInstance.get(petBreedWithTypePath(id));
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
