export interface Pet {
  id: string;
  pet_name: string;
  pet_dob: string;
  height: string;
  weight: string;
  pet_type_id: string;
  pet_breed_id: string;
  image: string;
}

export interface Service {
  id: string;
  service_name: string;
  service_description: string;
  image: string;
  startTime: string;
  endTime: string;
  brand_id: string;
  category_id: string;
  location_id: string;
}
