import SubtractIcon from "@/assets/svg/SubtractIcon";
import { PlusIcon } from "lucide-react";
import React from "react";

const PassengerCounter = React.memo(
    ({
      label,
      count,
      increment,
      decrement,
    }: {
      label: string;
      count: number;
      increment: () => void;
      decrement: () => void;
    }) => (
      <div className="flex justify-between items-center gap-x-3">
        <p className="text-sm font-medium">{label}</p>
        <div className="flex gap-3">
          <button
            className="w-[25px] h-[25px] bg-primaryRed flex items-center justify-center rounded-full"
            onClick={decrement}
          >
            <SubtractIcon stroke="#FFFFFF" />
          </button>
          <div className="w-[25px] h-[25px] flex items-center justify-center">
            <p className="text-sm font-medium">{count}</p>
          </div>
          <button
            className="w-[25px] h-[25px] bg-primaryRed flex items-center justify-center rounded-full"
            onClick={increment}
          >
            <PlusIcon stroke="#FFFFFF" />
          </button>
        </div>
      </div>
    )
  );

  export default PassengerCounter;