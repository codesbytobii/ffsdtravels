import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { Label } from "@radix-ui/react-label";

export interface DatePickerWithRangeInputProps {
  className?: string;
  initialDateRange?: DateRange;
  labelText?: string;
  onChange?: (dateRange: DateRange | undefined) => void; // New prop
}

export function DatePickerWithRangeInput({
  className,
  initialDateRange,
  labelText = "Destination - Return",
  onChange,
}: DatePickerWithRangeInputProps) {
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);

  useEffect(() => {
    if (onChange) {
      onChange(date);
    }
  }, [date, onChange]);

  return (
    <div className="flex flex-col gap-2 w-full lg:w-[280px]">
      <Label htmlFor="data" className="font-semibold text-sm lg:text-base">
        {labelText}
      </Label>
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full h-12 justify-between text-left font-normal px-4 button-outline-bottom",
                !date && "text-gray-400"
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5 text-gray-600" />
              <span className="truncate">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "yyyy-MM-dd")} -{" "}
                      {format(date.to, "yyyy-MM-dd")}
                    </>
                  ) : (
                    format(date.from, "yyyy-MM-dd")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-4 shadow-lg rounded-md bg-white">
            <Calendar
              // initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
