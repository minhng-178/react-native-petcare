import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from "date-fns";

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const calculateAge = (dob: string): string => {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const ageInYears = differenceInYears(currentDate, birthDate);
  const ageInMonths = differenceInMonths(currentDate, birthDate);
  const ageInDays = differenceInDays(currentDate, birthDate);

  if (ageInYears > 0) {
    return `${ageInYears}`;
  } else if (ageInMonths > 0) {
    return `${ageInMonths} tháng`;
  } else {
    return `${ageInDays} ngày`;
  }
};
