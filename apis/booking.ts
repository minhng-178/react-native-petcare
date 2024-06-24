import axiosInstance from "./axiosInstance";
import { bookingPath, bookingUserPath } from "./endpoint";
export const createBooking = async (form: any) => {
  try {
    const response = await axiosInstance.post(bookingPath, form);

    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserBooking = async () => {
  try {
    const response = await axiosInstance.get(bookingUserPath);

    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error: any) {
    console.log(error);

    return [];
  }
};
