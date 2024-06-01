import { Pet } from "@/types";
import axiosInstance from "./axiosInstance";
import { userCreatePetPath, userPetPath } from "./endpoint";
import instance from "./axiosInstance";
import { AxiosError } from "axios";

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

export const createUserPets = async (
  form: any,
  petTypeId: string | null,
  image: any
) => {
  // const formData = new FormData();

  // formData.append("pet_name", form.pet_name);
  // formData.append("pet_type_id", petTypeId as unknown as Blob);
  // formData.append("pet_breed_id", form.pet_breed_id);
  // formData.append("pet_dob", form.pet_dob);
  // formData.append("height", form.height);
  // formData.append("weight", form.weight);
  //  formData.append("image", form.image)

  try {
    console.log("form", form);
    const response = await axiosInstance.post(userCreatePetPath, {
      ...form,
      pet_type_id: petTypeId,
      image,
    });
    // if (response.data) {
    //   return response.data.data;
    // } else {
    //   console.log("Response data is undefined");
    // }
    return response.data;
  } catch (error) {
    console.log("API Error:", error);
  }
};
