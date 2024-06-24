import axiosInstance from "./axiosInstance";
import {
  appointmentIdPath,
  appointmentPath,
  appointmentUserPath,
} from "./endpoint";

export const createAppointment = async (form: any) => {
  console.log(form);

  try {
    const response = await axiosInstance.post(appointmentPath, form);

    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAppointmentById = async (id: string) => {
  try {
    const response = await axiosInstance.get(appointmentIdPath(id));

    return response.data.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getAppointmentbyUser = async () => {
  try {
    const response = await axiosInstance.get(appointmentUserPath);
    console.log(response.data);

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
