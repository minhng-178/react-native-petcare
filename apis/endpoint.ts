export const baseURL = "https://fureverfriend.id.vn/api/v1";

//? auth
export const loginPath = "/auth/login";
export const registerPath = "/auth/regiser";
export const profilePath = "/auth/profile";
export const loginGooglePath = "/auth/login-google-mobile";
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
export const userCreatePetPath = "pet/mobile";
export const petPath = (id: string) => {
  return `pet/${id}`;
};

//? servive
export const servivePath = "service?page=1&limit=100";
export const serviceIdPath = (id: string) => {
  return `service/${id}`;
};
//? pet-booking
export const bookingPath = "booking";
export const bookingUserPath = "booking/customer/my-bookings";

//? pet-appointment
export const appointmentPath = "appointment";
export const appointmentIdPath = (id: string) => {
  return `appointment/${id}`;
};
export const appointmentUserPath = "appointment/customer/my-appointments";

//? upload
export const uploadPath = "image/upload";

//? notification
export const notifyUserPath = (userId: string) => {
  return `notification/${userId}`;
};
