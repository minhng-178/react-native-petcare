import axiosInstance from "./axiosInstance";
import { appointmentPath } from "./endpoint";

export const createAppointment = async (form: any) => {
  console.log(form);

  try {
    const response = await axiosInstance.post(appointmentPath, form);

    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
