import React, { useState } from "react";
import { toast } from "react-toastify";
import { UserRound, Plus, Minus } from "lucide-react";

interface PassengerDropdownProps {
  onSelectionChange: (
    adults: number,
    children: number,
    infants: number
  ) => void;
}

const MAX_TOTAL_PASSENGERS = 9;
const MAX_COUNT = 9;

const PassengerDropdownButton: React.FC<PassengerDropdownProps> = ({
  onSelectionChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const totalPassengers = adults + children + infants;

  const validateAndSet = (type: string, newValue: number) => {
    if (newValue < 0 || newValue > MAX_COUNT) {
      toast.error("0-9 only");
      return;
    }

    if (totalPassengers > MAX_TOTAL_PASSENGERS) {
      toast.error("Max 9 passengers");
      return;
    }

    switch (type) {
      case "adults":
        if (children > newValue) setChildren(newValue);
        if (infants > newValue) setInfants(newValue);
        setAdults(newValue);
        break;
      case "children":
        if (newValue > adults) {
          toast.error("Max children = adults");
          return;
        }
        setChildren(newValue);
        break;
      case "infants":
        if (newValue > adults) {
          toast.error("Max infants = adults");
          return;
        }
        setInfants(newValue);
        break;
    }
    onSelectionChange(adults, children, infants);
  };

  const handleIncrement = (type: string) => {
    if (totalPassengers >= MAX_TOTAL_PASSENGERS) {
      toast.error("Max 9 passengers");
      return;
    }

    if (type === "adults" && adults < MAX_COUNT) {
      validateAndSet(type, adults + 1);
    }
    if (type === "children" && children < adults) {
      validateAndSet(type, children + 1);
    }
    if (type === "infants" && infants < adults) {
      validateAndSet(type, infants + 1);
    }
  };

  const handleDecrement = (type: string) => {
    if (type === "adults" && adults > 0) validateAndSet(type, adults - 1);
    if (type === "children" && children > 0) validateAndSet(type, children - 1);
    if (type === "infants" && infants > 0) validateAndSet(type, infants - 1);
  };

  return (
    <div className="relative">
      <button
        className="flex gap-3 items-center py-2 px-5 border rounded-md"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span className="bg-primaryRed shadow-md rounded-full h-9 w-9 flex justify-center items-center">
          <UserRound color="#FFFFFF" size="25" />
        </span>
        <div className="flex flex-col gap-1 items-start lg:w-[140px] md:w-[120px] w-[100px] truncate">
          <p className="text-xs font-semibold text-gray-700">Passenger</p>
          <p className="text-md font-semibold">
            {adults} Adult{adults > 1 ? "s" : ""}, {children} Child
            {children > 1 ? "ren" : ""}, {infants} Infant
            {infants > 1 ? "s" : ""}
          </p>
        </div>
      </button>

      {showDropdown && (
        <div className="absolute z-10 bg-white border shadow-md rounded-md mt-2 p-4 w-64">
          <div className="flex flex-col gap-4">
            {[
              { type: "adults", label: "Adults (≥ 12)", value: adults },
              { type: "children", label: "Children (2-12)", value: children },
              { type: "infants", label: "Infants (< 2)", value: infants },
            ].map(({ type, label, value }) => (
              <div key={type} className="flex items-center justify-between">
                <p className="text-sm font-medium w-32">{label}</p>
                <div className="flex items-center gap-2">
                  <button
                    className="w-[25px] h-[25px] bg-primaryRed flex items-center justify-center rounded-full hover:bg-red-600 transition duration-200 ease-in-out"
                    onClick={() => handleDecrement(type)}
                  >
                    <Minus color="#FFFFFF" size="16" />
                  </button>
                  <div className="w-[25px] h-[25px] flex items-center justify-center">
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                  <button
                    className="w-[25px] h-[25px] bg-primaryRed flex items-center justify-center rounded-full hover:bg-red-600 transition duration-200 ease-in-out"
                    onClick={() => handleIncrement(type)}
                  >
                    <Plus color="#FFFFFF" size="16" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerDropdownButton;
