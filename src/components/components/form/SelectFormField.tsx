import { FormItem, FormLabel } from "@/components/ui/form";
import { useState, useRef, useEffect } from "react";
import { FieldErrors, FieldValues, Path, useController } from "react-hook-form";
import { FaCaretDown } from "react-icons/fa";

interface Option {
  label: string;
  value: string | number; 
}

interface SelectFormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  options: Option[];
}

const SelectFormField = <T extends FieldValues>({
  label,
  name,
  errors,
  options,
}: SelectFormFieldProps<T>) => {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { field } = useController({ name });

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FormItem className="relative" ref={dropdownRef}>
      <FormLabel>{label}</FormLabel>
      <input
        type="text"
        placeholder={`Search ${label}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`dropdown-${name}`}
        className="px-3 py-2 border border-gray-300 focus:border-primaryRed focus:border-2 focus:ring-0 outline-none rounded w-full pr-10 transition-colors duration-300 ease-in-out"
      />
      <FaCaretDown
        className={`absolute right-3 top-[45px] transform -translate-y-1/2 ${
          isOpen ? "text-primaryRed" : "text-gray-500"
        }`}
        size={25}
      />
      {isOpen && (
        <div
          id={`dropdown-${name}`}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 overflow-y-auto max-h-44 custom__scrollbar"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  setSearch(option.label);
                  setIsOpen(false);
                  field.onChange(option.value); // Update form value
                  field.onBlur();
                }}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No options available</div>
          )}
        </div>
      )}
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </FormItem>
  );
};

export default SelectFormField;
