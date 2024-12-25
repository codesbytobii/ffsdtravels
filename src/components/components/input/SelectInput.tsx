import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";

type DataItem = {
  value: string;
  label: React.ReactNode;
};

const SelectInput = ({
  data,
  label,
  placeholder,
  value,
  onChange,
}: {
  data: DataItem[];
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 lg:w-[180px] w-full">
      {label && (
        <Label htmlFor="data" className="font-semibold text-sm lg:text-base">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full h-12 justify-between px-4 text-left button-outline-bottom"
          >
            <span className="truncate">
              {value
                ? data.find((item) => item.value === value)?.label
                : `Search ${placeholder}`}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2 shadow-lg rounded-md bg-white">
          <Command>
            <CommandInput
              className="flex items-center border-none focus:border-none focus:ring-0"
              placeholder={`Search ${placeholder}`}
            />
            <CommandList className="max-h-60 overflow-auto">
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue: string) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "h-4 w-4 text-blue-500",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectInput;