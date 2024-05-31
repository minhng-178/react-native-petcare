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
//? brand
export const brandPath = "brand?page=1&limit=10";

//? type
export const petTypePath = "pet-type?page=1&limit=10";
//? pet
export const userPetPath = "pet/me/pets?page=1&limit=10";
export const userCreatePetPath = "pet";

//? servive
export const servivePath = "service?page=1&limit=100";

//? pet-booking

//? upload
export const uploadPath = "image/upload";
