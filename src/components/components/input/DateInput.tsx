// import { useEffect, useState } from "react";
// import { format, isValid } from "date-fns"; 
// import { Calendar as CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Label } from "@radix-ui/react-label";

// // Props for DateInput component
// export interface DateInputProps {
//   labelText?: string;
//   onChange?: (date: Date | undefined) => void;
//   value?: Date; // Added value prop
// }

// // DateInput component to select dates
// const DateInput = ({ labelText = "", onChange, value }: DateInputProps) => {
//   // State to store the selected date
//   const [date, setDate] = useState<Date | undefined>(value);

//   // Effect to call the onChange callback when the date state changes
//   useEffect(() => {
//     if (onChange) {
//       onChange(date);
//     }
//   }, [date, onChange]);

//   // Effect to update the local date state when the value prop changes
//   useEffect(() => {
//     setDate(value);
//   }, [value]);

//   return (
//     <div className="flex flex-col gap-2 w-full lg:w-[120px]">
//       {/* Label for the date input */}
//       <Label htmlFor="date" className="font-semibold text-sm lg:text-base">
//         {labelText}
//       </Label>
//       <Popover>
//         <PopoverTrigger asChild>
//           {/* Button to trigger the date picker popover */}
//           <Button
//             variant={"outline"}
//             className={cn(
//               "w-full h-12 justify-between text-left font-normal px-4 button-outline-bottom",
//               !date && "text-gray-400"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-5 w-5 text-gray-600" />
//             <span className="truncate">
//               {date && isValid(date) ? format(date, "PPP") : "Pick a date"}
//             </span>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-4 shadow-lg rounded-md bg-white">
//           {/* Calendar component to select the date */}
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={setDate}
//             // initialFocus
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// export default DateInput;








import { useEffect, useState } from "react";
import { format, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CustomProvider } from "rsuite";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import "rsuite/dist/rsuite.min.css"; // Ensure rsuite styles are imported

export interface DateInputProps {
  labelText?: string;
  onChange?: (date: Date | undefined) => void;
  value?: Date;
}

const DateInput = ({ labelText = "", onChange, value }: DateInputProps) => {
  const [date, setDate] = useState<Date | undefined>(value);
  const [isPopoverOpen, setPopoverOpen] = useState(false); // Popover state

  useEffect(() => {
    if (onChange) {
      onChange(date);
    }
  }, [date, onChange]);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setPopoverOpen(false); // Close the popover when a date is selected

    // Apply custom class for selected date
    const calendarCells = document.querySelectorAll(".rs-calendar-table-cell");
    calendarCells.forEach((cell) => {
      const cellDate = cell.getAttribute("aria-label"); // Get date string from aria-label
      if (cellDate === selectedDate?.toDateString()) {
        cell.classList.add("bg-red-500", "text-white");
      } else {
        cell.classList.remove("bg-red-500", "text-white");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full lg:w-[210px]">
      <Label htmlFor="date" className="font-semibold text-sm lg:text-base">
        {labelText}
      </Label>
      <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            onClick={() => setPopoverOpen(true)}
            className={cn(
              "w-full h-12 justify-between text-left font-normal px-4 button-outline-bottom",
              !date && "text-gray-400"
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-5 text-gray-600" />
            <span className="truncate">
              {date && isValid(date) ? format(date, "PPP") : "Pick a date"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-4 shadow-lg rounded-md bg-white">
          <div className="w-full max-w-[300px] h-[320px]">
            <CustomProvider theme="light">
              <Calendar
                value={date}
                onChange={handleDateSelect}
                compact
              />
            </CustomProvider>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateInput;