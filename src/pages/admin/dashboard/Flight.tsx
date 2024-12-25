import React, { useState, useCallback, useEffect, useRef } from "react";
import { BsCaretDownFill } from "react-icons/bs";
import { MinusIcon, PlusIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  INFANT_EXCEED_ADULT_MESSAGE,
  PASSENGER_LIMIT,
  PASSENGER_LIMIT_MESSAGE,
} from "@/config/api";
import { ticketClasses } from "@/data/data.json"; // Ensure this file exists and exports 'ticketClasses'
import OneWay from "./shared/OneWay";
import RoundTrip from "./shared/RoundTrip";
import MultiCity from "./shared/MultiCity";

// Type Definitions
interface Option {
  value?: string;
  label: string;
}

interface FlightButtonProps {
  label: string;
  options?: Option[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect?: (option: Option) => void;
}

interface PassengerButtonProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  totalPassengers: number;
  adultCount: number;
  childCount: number;
  infantCount: number;
  handleAdultIncrement: () => void;
  handleAdultDecrement: () => void;
  handleChildIncrement: () => void;
  handleChildDecrement: () => void;
  handleInfantIncrement: () => void;
  handleInfantDecrement: () => void;
}

interface PassengerCategory {
  label: string;
  count: number;
}

interface PassengerDropdownProps {
  adultCount: number;
  childCount: number;
  infantCount: number;
  handleAdultIncrement: () => void;
  handleAdultDecrement: () => void;
  handleChildIncrement: () => void;
  handleChildDecrement: () => void;
  handleInfantIncrement: () => void;
  handleInfantDecrement: () => void;
}

// Custom Hook to Handle Clicks Outside of a Component
const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler]);

  return ref;
};

// Memoized Dropdown Component for Performance
const Dropdown: React.FC<{
  options: Option[];
  onSelect: (option: Option) => void;
}> = React.memo(({ options, onSelect }) => (
  <ul
    className="absolute bg-white w-36 border border-gray-300 rounded shadow-lg mt-1 z-20"
    role="listbox"
    aria-label="Dropdown Menu"
  >
    {options.map((option) => (
      <li
        key={option.label}
        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        onClick={() => onSelect(option)}
        role="option"
      >
        <p className="text-xs font-medium">{option.label}</p>
      </li>
    ))}
  </ul>
));

// Memoized PassengerDropdown Component for Performance
const PassengerDropdown: React.FC<PassengerDropdownProps> = React.memo(
  ({
    adultCount,
    childCount,
    infantCount,
    handleAdultIncrement,
    handleAdultDecrement,
    handleChildIncrement,
    handleChildDecrement,
    handleInfantIncrement,
    handleInfantDecrement,
  }) => {
    const passengerCounts: PassengerCategory[] = [
      { label: "Adults (≥ 12)", count: adultCount },
      { label: "Children (2 - 12)", count: childCount },
      { label: "Infants (< 2)", count: infantCount },
    ];

    return (
      <div
        className="absolute bg-white w-56 border border-gray-300 rounded shadow-lg mt-1 z-20 p-2"
        role="dialog"
        aria-label="Passenger Selection"
      >
        {passengerCounts.map((category, index) => (
          <div
            key={category.label}
            className="flex justify-between items-center gap-x-3 mb-2"
          >
            <p className="text-[12px] font-semibold text-gray-700">
              {category.label}
            </p>
            <div className="flex gap-3 items-center">
              <button
                className={`w-[25px] h-[25px] flex items-center justify-center rounded-full ${
                  category.count > 0
                    ? "bg-primaryRed hover:bg-red-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={
                  index === 0
                    ? handleAdultDecrement
                    : index === 1
                    ? handleChildDecrement
                    : handleInfantDecrement
                }
                disabled={category.count === 0}
                aria-label={`Decrease ${category.label}`}
              >
                <MinusIcon stroke="#FFFFFF" size={15} />
              </button>
              <div className="w-[25px] h-[25px] flex items-center justify-center">
                <p className="text-sm font-medium">{category.count}</p>
              </div>
              <button
                className={`w-[25px] h-[25px] flex items-center justify-center rounded-full ${
                  (index === 2 && infantCount >= adultCount) ||
                  (adultCount + childCount + infantCount >= PASSENGER_LIMIT)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primaryRed hover:bg-red-600"
                }`}
                onClick={
                  index === 0
                    ? handleAdultIncrement
                    : index === 1
                    ? handleChildIncrement
                    : handleInfantIncrement
                }
                disabled={
                  (index === 2 && infantCount >= adultCount) ||
                  adultCount + childCount + infantCount >= PASSENGER_LIMIT
                }
                aria-label={`Increase ${category.label}`}
              >
                <PlusIcon stroke="#FFFFFF" size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

// Memoized FlightButton Component for Performance
const FlightButton: React.FC<FlightButtonProps> = React.memo(
  ({ label, options, isOpen, onToggle, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState<Option>(
      options ? options[0] : { label }
    );

    const handleSelect = (option: Option) => {
      setSelectedOption(option);
      onSelect?.(option); // Call onSelect if provided
      onToggle(); // Close the dropdown
    };

    const ref = useClickOutside(() => {
      if (isOpen) onToggle();
    });

    return (
      <div className="relative" ref={ref}>
        <button
          className="flex items-center p-2 bg-transparent hover:bg-gray-100 rounded-sm lg:gap-2 gap-1 text-gray-700 font-semibold capitalize focus:outline-none"
          onClick={onToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex w-[72px] truncate">
            <p className="text-xs">
              {selectedOption ? selectedOption.label : label}
            </p>
          </div>
          <span>
            <BsCaretDownFill />
          </span>
        </button>
        {isOpen && options && (
          <Dropdown options={options} onSelect={handleSelect} />
        )}
      </div>
    );
  }
);

// Memoized PassengerButton Component for Performance
const PassengerButton: React.FC<PassengerButtonProps> = React.memo(
  ({
    label,
    isOpen,
    onToggle,
    totalPassengers,
    adultCount,
    childCount,
    infantCount,
    handleAdultIncrement,
    handleAdultDecrement,
    handleChildIncrement,
    handleChildDecrement,
    handleInfantIncrement,
    handleInfantDecrement,
  }) => {
    const ref = useClickOutside(() => {
      if (isOpen) onToggle();
    });

    return (
      <div className="relative" ref={ref}>
        <button
          className="flex items-center p-2 bg-transparent hover:bg-gray-100 rounded-sm lg:gap-2 gap-1 text-gray-700 font-semibold capitalize focus:outline-none"
          onClick={onToggle}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <div className="flex w-[72px] truncate">
            <p className="text-xs">{`${totalPassengers} ${label}`}</p>
          </div>
          <span>
            <BsCaretDownFill />
          </span>
        </button>
        {isOpen && (
          <PassengerDropdown
            adultCount={adultCount}
            childCount={childCount}
            infantCount={infantCount}
            handleAdultIncrement={handleAdultIncrement}
            handleAdultDecrement={handleAdultDecrement}
            handleChildIncrement={handleChildIncrement}
            handleChildDecrement={handleChildDecrement}
            handleInfantIncrement={handleInfantIncrement}
            handleInfantDecrement={handleInfantDecrement}
          />
        )}
      </div>
    );
  }
);

// Main Flight Component
const Flight: React.FC = () => {
  // State Management
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("OneWay");
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [selectedClass, setSelectedClass] = useState<Option>({
    value: "ECONOMY",
    label: "Economy",
  });

  console.log(selectedClass)

  // Toast Notification for Error Messages
  const showErrorMessage = useCallback((message: string) => {
    toast.error(message);
  }, []);

  // Derived State
  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  // Handlers for Increment and Decrement
  const handleIncrement = useCallback(
    (category: keyof typeof passengers) => {
      if (totalPassengers >= PASSENGER_LIMIT) {
        showErrorMessage(PASSENGER_LIMIT_MESSAGE);
        return;
      }
      if (category === "infants" && passengers.infants >= passengers.adults) {
        showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
        return;
      }
      setPassengers((prev) => ({
        ...prev,
        [category]: prev[category] + 1,
      }));
    },
    [totalPassengers, passengers.adults, passengers.infants, showErrorMessage]
  );

  const handleDecrement = useCallback(
    (category: keyof typeof passengers) => {
      setPassengers((prev) => ({
        ...prev,
        [category]: prev[category] > 0 ? prev[category] - 1 : 0,
      }));
    },
    []
  );

  // Specific Handlers
  const handleAdultIncrement = useCallback(() => {
    handleIncrement("adults");
  }, [handleIncrement]);

  const handleAdultDecrement = useCallback(() => {
    handleDecrement("adults");
  }, [handleDecrement]);

  const handleChildIncrement = useCallback(() => {
    handleIncrement("children");
  }, [handleIncrement]);

  const handleChildDecrement = useCallback(() => {
    handleDecrement("children");
  }, [handleDecrement]);

  const handleInfantIncrement = useCallback(() => {
    handleIncrement("infants");
  }, [handleIncrement]);

  const handleInfantDecrement = useCallback(() => {
    handleDecrement("infants");
  }, [handleDecrement]);

  // Toggle Dropdowns
  const handleToggle = (dropdown: string) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  // Handle Tab Change
  const handleTabChange = useCallback(
    (option: Option) => {
      setActiveTab(option.value || "");
      setOpenDropdown(null); // Close any open dropdown
    },
    []
  );

  // Handle Class Change
  const handleClassChange = useCallback(
    (option: Option) => {
      setSelectedClass(option);
      setOpenDropdown(null);
    },
    []
  );

  // Tab Options
  const tabOptions: Option[] = [
    { value: "OneWay", label: "One Way" },
    { value: "RoundTrip", label: "Round Trip" },
    { value: "MultiCity", label: "Multi-City" },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Control Buttons */}
      <div className="flex lg:gap-4 gap-2 w-full">
        {/* Flight Type Selection */}
        <FlightButton
          label="Select Tab"
          options={tabOptions}
          isOpen={openDropdown === "Tabs"}
          onToggle={() => handleToggle("Tabs")}
          onSelect={handleTabChange}
        />

        {/* Passenger Selection */}
        <PassengerButton
          label="Passenger"
          isOpen={openDropdown === "Passenger"}
          onToggle={() => handleToggle("Passenger")}
          totalPassengers={totalPassengers}
          adultCount={passengers.adults}
          childCount={passengers.children}
          infantCount={passengers.infants}
          handleAdultIncrement={handleAdultIncrement}
          handleAdultDecrement={handleAdultDecrement}
          handleChildIncrement={handleChildIncrement}
          handleChildDecrement={handleChildDecrement}
          handleInfantIncrement={handleInfantIncrement}
          handleInfantDecrement={handleInfantDecrement}
        />

        {/* Cabin Class Selection */}
        <FlightButton
          label="Cabin"
          options={ticketClasses}
          isOpen={openDropdown === "Cabin"}
          onToggle={() => handleToggle("Cabin")}
          onSelect={handleClassChange}
        />
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      <div className="w-full">
        {activeTab === "OneWay" && (
          <OneWay 
          />
        )}
        {activeTab === "RoundTrip" && (
          <RoundTrip />
        )}
        {activeTab === "MultiCity" && <MultiCity />}
      </div>
    </div>
  );
};

export default Flight;
