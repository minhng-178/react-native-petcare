import axiosInstance from "./axiosInstance";
import { userCreatePetPath, userPetPath } from "./endpoint";

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
  const formData = new FormData();

  formData.append("pet_name", form.pet_name);
  formData.append("pet_type_id", petTypeId as unknown as Blob);
  formData.append("pet_breed_id", form.pet_breed_id);
  formData.append("pet_dob", form.pet_dob);
  formData.append("height", form.height);
  formData.append("weight", form.weight);
  formData.append("image", {
    image,
  } as unknown as Blob);

  try {
    const response = await axiosInstance.post(userCreatePetPath, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      return response.data.data;
    }
  } catch (error) {
    console.log("API Error:", error);
  }
};
