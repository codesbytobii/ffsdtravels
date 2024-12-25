import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";

interface DropdownProps {
  label?: string;
  btnText?: string;
  children: ReactNode; // Change to accept children of any type
}

const Dropdown = ({ label, btnText, children }: DropdownProps) => {
  return (
    <div className="flex flex-col gap-2 w-full lg:w-[280px]">
      {label && (
        <Label htmlFor="data" className="font-semibold text-sm lg:text-base">
          {label}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="border-2 border-primaryRed hover:bg-white h-12 text-left font-normal px-4 flex items-center justify-between"
          >
            <span className="flex items-center font-medium">
              <Plus size="25" className="lg:hidden mr-2" />
              <span className="truncate">{btnText}</span>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full lg:w-[300px] p-4 shadow-lg rounded-md bg-white">
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Dropdown;
