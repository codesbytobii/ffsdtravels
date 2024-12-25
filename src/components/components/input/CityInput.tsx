import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type DataItem = {
  value: string;
  label: React.ReactNode;
  city: {
    address: {
      cityCode?: string;
      cityName?: string;
      countryName?: string;
    };
    name: string;
    iata: string;
    city: string;
    country: string;
  };
};

const CityInput = ({
  data = [], // Provide a default empty array
  label,
  placeholder,
  onSearch,
  loading,
  value,
  onChange,
}: {
  data?: DataItem[]; // Make data optional
  label?: string;
  placeholder: string;
  onSearch?: (keyword: string) => any;
  loading?: boolean;
  value?: string;
  onChange?: (value: string, city: DataItem) => any; // Update the type to include city
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    // Minimum keyword length check
    if (searchKeyword.length >= 2 && onSearch) {
      const delayDebounceFn = setTimeout(() => {
        onSearch(searchKeyword);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchKeyword, onSearch]);

  const handleSelect = (selectedItem: DataItem) => {
    setInputValue(selectedItem.label?.toString() || ""); // Handle null or undefined label
    setOpen(false);
    if (onChange) {
      onChange(selectedItem.value, selectedItem);
    }
  };

  return (
    <div className="flex flex-col gap-2 lg:w-[140px] w-full">
      {label && (
        <label
          htmlFor="city-input"
          className="font-semibold text-sm lg:text-base"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          className="w-full h-12 px-4 py-2 border rounded-md focus:outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSearchKeyword(e.target.value);
            setOpen(true);
          }}
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute z-10 lg:w-[350px] w-full mt-1 p-2 shadow-lg rounded-md bg-white">
            {loading ? (
              <Skeleton className="h-[50px] my-2 w-full flex justify-center items-center"></Skeleton>
            ) : (
              <div className="max-h-60 overflow-auto mt-2">
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <div
                      key={item.value}
                      onClick={() => handleSelect(item)}
                      className={`flex flex-col gap-1 p-2 hover:bg-gray-100 rounded cursor-pointer ${
                        inputValue === item.label?.toString() ? "bg-gray-200" : ""
                      }`}
                    >
                      <p className="font-semibold text-sm">
                        {item.city.name || "Unknown City"}
                      </p>
                      <p className="font-medium text-xs text-gray-500">
                        {item.city.city || "Unknown City Name"},{" "}
                        {item.city.country || "Unknown Country"} -{" "}
                        {item.city.iata || "N/A"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No results found.</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityInput;
