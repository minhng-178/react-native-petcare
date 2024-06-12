import axiosInstance from "./axiosInstance";
import { petPath, userCreatePetPath, userPetPath } from "./endpoint";

export const getUserPets = async () => {
  try {
    const response = await axiosInstance.get(userPetPath);

    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPet = async (id: string) => {
  try {
    const response = await axiosInstance.get(petPath(id));
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deletePet = async (id: string) => {
  try {
    const response = await axiosInstance.delete(petPath(id));
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createUserPets = async (
  form: any,
  petTypeId: string | null,
  image: any
) => {
  try {
    const response = await axiosInstance.post(userCreatePetPath, {
      ...form,
      pet_type_id: petTypeId,
      image,
    });
    if (response.status === 201) {
      return response.data.data;
    } else if (response.status === 413) {
      throw new Error("File is too large");
    }
  } catch (error: any) {
    console.log("API Error:", error);
    throw new Error(error);
  }
};

export const updateUserPets = async (
  id: string,
  form: any,
  petTypeId: string | null,
  image: any
) => {
  try {
    const response = await axiosInstance.patch(petPath(id), {
      ...form,
      pet_type_id: petTypeId,
      image,
    });

    if (response.status === 200) {
      return response.data.data;
    } else if (response.status === 413) {
      throw new Error("File is too large");
    }
  } catch (error: any) {
    console.log("API Error:", error);
    throw new Error(error);
  }
};
