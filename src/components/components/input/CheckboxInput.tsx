import React from "react";

interface CheckboxInputProps {
  id: string;
  label: React.ReactNode; // Changed from string to React.ReactNode
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-white bg-white border-gray-300 rounded focus:ring-primaryRed checked:bg-primaryRed checked:border-primaryRed transition duration-150 ease-in-out"
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
