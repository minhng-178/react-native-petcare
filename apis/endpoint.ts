export const baseURL = "https://fureverfriend.id.vn/api/v1";

//? auth
export const loginPath = "/auth/login";
export const registerPath = "/auth/regiser";
export const refreshTokenPath = "/auth/reset";

//? user

//? breed
export const petBreedPath = "pet-breed?page=1&limit=10";
export const petBreedWithTypePath = (id: string | null) => {
  return `pet-breed/pet-type/${id}`;
};

//? type
export const petTypePath = "pet-type?page=1&limit=10";
//? pet
export const userPetPath = "pet/me/pets?page=1&limit=10";
export const userCreatePetPath = "/pet/mobile";

//? upload
export const uploadPath = "image/upload";
