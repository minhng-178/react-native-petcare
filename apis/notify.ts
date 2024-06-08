import axiosInstance from "./axiosInstance";
import { notifyUserPath } from "./endpoint";

export const getNotifications = async (userId: string) => {
  console.log(userId);

  try {
    const response = await axiosInstance.get(notifyUserPath(userId));
    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
