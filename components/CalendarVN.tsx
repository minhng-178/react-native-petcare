import Colors from "@/constants/Colors";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
// Set up Vietnamese locale
LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12",
  ],
  dayNames: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay",
};

LocaleConfig.defaultLocale = "vi";

const CalendarVN = ({ onDateSelect }: any) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.dateString);
    onDateSelect(date);
  };
  const tomorrow = format(
    new Date().setDate(new Date().getDate() + 1),
    "yyyy-MM-dd"
  );

  return (
    <Calendar
      minDate={tomorrow}
      onDayPress={handleDateSelect}
      markedDates={{
        [selectedDate]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: Colors.light.primary,
        },
      }}
    />
  );
};

export default CalendarVN;
