import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputOTPFormFieldProps {
  name: string;
  register: any;
  errors?: Record<string, any>;
  maxLength: number;
}

const InputOTPFormField: React.FC<InputOTPFormFieldProps> = ({
  name,
  register,
  errors = {},
  maxLength,
}) => {
  const { setValue } = useFormContext();
  const [otpValues, setOtpValues] = useState(Array(maxLength).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (value.length > 1) return; // Ensure only a single character

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    setOtpValues(newOtpValues);

    // Move to the next input if the current one is filled
    if (value && index < maxLength - 1) {
      const nextInput = document.querySelector(
        `input[name="${name}[${index + 1}]"]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }

    // Combine OTP values into a single string
    const combinedOtp = newOtpValues.join("");
    setValue(name, combinedOtp, { shouldValidate: true });
  };

  // Create an array of input elements based on the maxLength
  const otpInputs = Array.from({ length: maxLength }, (_, index) => (
    <React.Fragment key={index}>
      <input
        type="text"
        name={`${name}[${index}]`}
        maxLength={1}
        value={otpValues[index]}
        className={`w-12 h-12 border ${
          errors[name] ? "border-primaryRed" : "border-gray-300"
        } rounded-md text-center text-lg focus:border-primaryRed focus:ring-2 focus:ring-primaryRed`}
        onChange={(e) => handleChange(e, index)}
        onFocus={(e) => e.target.select()}
        aria-label={`Digit ${index + 1} of ${maxLength}`}
        ref={register(`${name}[${index}]`)} //tried using the register here
      />
      {/* Add a circular separator after each input except the last one */}
      {index < maxLength - 1 && (
        <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
      )}
    </React.Fragment>
  ));

  return (
    <div className="flex items-center">
      {otpInputs}
      {errors[name] && (
        <span className="text-red-500 text-sm ml-4">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default InputOTPFormField;