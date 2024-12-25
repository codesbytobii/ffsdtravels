import { FC, useState } from "react";
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  getDate,
  getDay,
  isBefore,
  isAfter,
  isSameMonth,
  isSameDay,
  eachDayOfInterval,
} from "date-fns";

interface DateRangeDropdownButtonProps {
  icon: LucideIcon;
  label: string;
  startDate: Date;
  endDate: Date;
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
}

const DateRangeDropdownButton: FC<DateRangeDropdownButtonProps> = ({
  icon: Icon,
  label,
  startDate,
  endDate,
  onDateRangeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    startDate
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  const handleDateClick = (date: Date) => {
    if (
      !selectedStartDate ||
      (selectedEndDate && isBefore(date, selectedStartDate))
    ) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(date);
      onDateRangeChange(selectedStartDate, date);
      setIsOpen(false);
    }
  };

  const generateCalendarDays = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  };

  const daysInMonth = generateCalendarDays(currentMonth);
  const startDay = getDay(startOfMonth(currentMonth));

  const today = new Date();
  const formattedStartDate = selectedStartDate
    ? format(selectedStartDate, "MMM d, yyyy")
    : "Start Date";
  const formattedEndDate = selectedEndDate
    ? format(selectedEndDate, "MMM d, yyyy")
    : "End Date";

  return (
    <div className="relative">
      <button
        className="flex gap-3 items-center py-2 px-5 border rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="bg-primaryRed shadow-md rounded-full h-9 w-9 flex justify-center items-center">
          <Icon color="#FFFFFF" size={25} />
        </span>
        <div className="flex flex-col gap-1 items-start">
          <p className="text-xs font-semibold text-gray-700">{label}</p>
          <p className="text-md font-semibold">
            {formattedStartDate} - {formattedEndDate}
          </p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute w-full top-full left-0 mt-2 bg-white border rounded-md shadow-md z-10 p-4">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => setCurrentMonth((prev) => addMonths(prev, -1))}
            >
              <ChevronLeft strokeWidth={1.75} />
            </button>
            <span>{format(currentMonth, "MMMM yyyy")}</span>
            <button
              onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
            >
              <ChevronRight strokeWidth={1.75} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-bold">
                <p className="font-semibold italic">{day}</p>
              </div>
            ))}
            {Array.from({ length: startDay }).map((_, index) => (
              <div key={`empty-${index}`} className="text-center"></div>
            ))}
            {daysInMonth.map((date) => {
              const isDisabled = isBefore(date, today);

              return (
                <button
                  key={date.toString()}
                  onClick={() => handleDateClick(date)}
                  className={`p-3 text-center flex items-center justify-center text-sm ${
                    selectedStartDate &&
                    selectedEndDate &&
                    isAfter(date, selectedStartDate) &&
                    isBefore(date, selectedEndDate)
                      ? "bg-red-400 rounded text-white"
                      : selectedStartDate && isSameDay(date, selectedStartDate)
                      ? "bg-primaryRed rounded text-white"
                      : selectedEndDate && isSameDay(date, selectedEndDate)
                      ? "bg-primaryRed rounded text-white"
                      : isSameMonth(date, currentMonth)
                      ? "bg-white"
                      : "bg-gray-200"
                  } ${isDisabled ? "text-gray-400 cursor-not-allowed" : ""}`}
                  disabled={isDisabled}
                >
                  {getDate(date)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdownButton;
