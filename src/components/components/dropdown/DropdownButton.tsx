import { debounce } from "@/hooks/useDebounce";
import React, { useState, useEffect } from "react";

type DataItem = {
  value: string;
  label: string;
  city: {
    address: {
      cityCode: string;
      cityName: string;
      countryName: string;
    };
    name: string;
  };
};

interface DropdownButtonProps {
  icon: React.ElementType;
  label: string;
  options: DataItem[];
  defaultValue: string;
  onChange: (value: string) => void;
  fetchData?: (keyword: string) => void; // Optional function to fetch data
  loading?: boolean; // Optional loading state
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  icon: Icon,
  label,
  options,
  defaultValue,
  onChange,
  fetchData,
  loading = false, // Default value for loading
}) => {
  const [selectedLabel, setSelectedLabel] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [prevKeyword, setPrevKeyword] = useState("");

  // Debounced search function with a 2-second delay
  const debouncedFetchData = React.useCallback(
    debounce((keyword: string) => {
      if (fetchData) {
        fetchData(keyword);
        setPrevKeyword(keyword);
      }
    }, 2000), // Adjusted to 2000 milliseconds (2 seconds)
    [fetchData]
  );

  useEffect(() => {
    if (searchTerm && searchTerm !== prevKeyword) {
      debouncedFetchData(searchTerm);
    }
  }, [searchTerm, prevKeyword, debouncedFetchData]);

  // Function to handle selection of an item
  const handleSelect = (selectedValue: string) => {
    // Find the selected option based on the value
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption) {
      // Format the label as "CityName - CountryCode"
      const formattedLabel = `${selectedOption.city.address.cityName} - ${selectedOption.city.address.cityCode}`;
      setSelectedLabel(formattedLabel); // Set the formatted label
    }

    setIsOpen(false); // Close the dropdown
    setSearchTerm(""); // Clear the search keyword input

    if (onChange) {
      onChange(selectedValue); // Invoke onChange callback if provided
    }
  };

  // Enhanced filtering to check all relevant fields
  const filteredOptions = options.filter((option) => {
    const { cityName, countryName, cityCode } = option.city.address;
    const { name } = option.city;
    const searchLower = searchTerm.toLowerCase();
    return (
      cityName.toLowerCase().includes(searchLower) ||
      countryName.toLowerCase().includes(searchLower) ||
      name.toLowerCase().includes(searchLower) ||
      cityCode.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="relative inline-block text-left w-full">
      <button
        className="flex gap-3 items-center py-2 lg:px-6 px-4 border rounded-md w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="bg-primaryRed shadow-md rounded-full h-9 w-9 flex justify-center items-center">
          <Icon isWhiteScale={true} size="25" />
        </span>
        <div className="flex flex-col gap-1 items-start lg:w-[140px] md:w-[120px] w-[100px] truncate">
          <p className="text-xs font-semibold text-gray-700">{label}</p>
          <p className="text-md font-semibold">{selectedLabel}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-t-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-3 rounded-t-md  border-b border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="py-2 flex flex-col gap-2 w-full max-h-60 overflow-y-auto custom__scrollbar">
            {loading ? (
              <p className="text-center text-gray-500 py-2">Loading...</p>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="flex items-center justify-between px-2 w-full hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex flex-col p-1 text-left w-[80%]">
                    <p className="font-semibold text-[14px] truncate">
                      {option.city.address.cityName},{" "}
                      {option.city.address.countryName}
                    </p>
                    <p className="font-medium text-[9px] text-gray-500 truncate">
                      {option.city.name}
                    </p>
                  </div>

                  <div className="flex">
                    <p className="text-right italic font-bold text-gray-500">
                      {option.city.address.cityCode}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-2">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
