import axiosInstance from "./axiosInstance";
import { notifyUserPath } from "./endpoint";

export const getNotifications = async (userId: string) => {
  console.log(userId);

  try {
    const response = await axiosInstance.get(notifyUserPath(userId));

    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
