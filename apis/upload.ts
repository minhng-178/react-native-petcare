import axios from "axios";
import { uploadPath } from "./endpoint";

export const uploadImage = async (file: any) => {
  const form = new FormData();

  const fileName = file.uri.split("/").pop();

  form.append("image", fileName);

  try {
    const response = await axios.post(
      `https://fureverfriend.id.vn/api/v1/${uploadPath}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Image upload failed:", response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
