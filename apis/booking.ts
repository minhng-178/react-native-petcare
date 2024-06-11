import axiosInstance from "./axiosInstance";
import { bookingPath, bookingUserPath } from "./endpoint";
export const createBooking = async (form: any) => {
  try {
    const response = await axiosInstance.post(bookingPath, form);
    console.log(response.data.data);

    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserBooking = async () => {
  try {
    const response = await axiosInstance.get(bookingUserPath);

    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
