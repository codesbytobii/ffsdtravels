import { FC, useState } from "react";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";

interface DateDropdownButtonProps {
  icon: LucideIcon;
  label: string;
  value: Date;
  onDateChange: (date: Date) => void;
}

const DateDropdownButton: FC<DateDropdownButtonProps> = ({
  icon: Icon,
  label,
  value,
  onDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  const [currentMonth, setCurrentMonth] = useState(new Date()); // State to manage the month being displayed in the calendar
  const [selectedDay, setSelectedDay] = useState(
    value ? value.getDate() : undefined
  ); // State to manage the selected day

  // Get the days of the month
  const getDaysInMonth = (month: Date) => {
    const days: number[] = [];
    const date = new Date(month.getFullYear(), month.getMonth(), 1);
    while (date.getMonth() === month.getMonth()) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Get the start day of the month
  const getStartDayOfMonth = (month: Date) => {
    const date = new Date(month.getFullYear(), month.getMonth(), 1);
    return date.getDay(); // 0 is Sunday, 1 is Monday, etc.
  };

  // Determine the maximum date that can be selected
  const today = new Date();
  const daysInMonth = getDaysInMonth(currentMonth);
  const startDay = getStartDayOfMonth(currentMonth);

  const handleDayClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    // Prevent selecting past dates
    if (newDate >= today) {
      setSelectedDay(day);
      onDateChange(newDate);
      setIsOpen(false); // Close dropdown after date is selected
    }
  };

  // Format the date as "29 Jul 2024" or "29 July 2024"
  const formattedDate = value
    ? value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short", // Use "long" for full month names
        year: "numeric",
      })
    : "Enter Date";

  return (
    <div className="relative">
      <button
        className="flex gap-3 items-center py-2 px-5 border rounded-md"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
      >
        <span className="bg-primaryRed shadow-md rounded-full h-9 w-9 flex justify-center items-center">
          <Icon color="#FFFFFF" size={25} />
        </span>
        <div className="flex flex-col gap-1 items-start lg:w-[140px] md:w-[120px] w-[100px] truncate">
          <p className="text-xs font-semibold text-gray-700">{label}</p>
          <p className="text-md font-semibold">{formattedDate}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute w-[290px] top-full left-0 mt-2 bg-white border rounded-md shadow-md z-10 p-4">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
                )
              }
            >
              <ChevronLeft strokeWidth={1.75} />
            </button>
            <span>
              {currentMonth.toLocaleString("default", { month: "long" })}{" "}
              {currentMonth.getFullYear()}
            </span>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
                )
              }
            >
              <ChevronRight strokeWidth={1.75} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div
                  key={`day-name-${index}`}
                  className="text-center font-bold"
                >
                  <p className="font-semibold italic">{day}</p>
                </div>
              )
            )}
            {Array.from({ length: startDay }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="text-center flex items-center justify-center text-sm"
              ></div>
            ))}
            {daysInMonth.map((day) => {
              const date = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
              );
              const isDisabled = date < today;

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => handleDayClick(day)}
                  className={`p-2 text-center ${
                    day === selectedDay
                      ? "bg-primaryRed rounded-md text-white"
                      : ""
                  } ${isDisabled ? "text-gray-400 cursor-not-allowed" : ""}`}
                  disabled={isDisabled}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateDropdownButton;
