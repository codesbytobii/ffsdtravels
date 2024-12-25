import React from "react";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneNumberFormFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const PhoneNumberFormField: React.FC<PhoneNumberFormFieldProps> = ({
  label,
  name,
  register,
  errors,
  setValue,
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <PhoneInput
        country={"ng"}
        {...register(name)}
        onChange={(value) => setValue(name, value)}
        inputClass="bg-white border border-gray-300 rounded transition-colors duration-300 ease-in-out focus:border-primaryRed"
        buttonClass="bg-white border border-gray-300 rounded transition-colors duration-300 ease-in-out"
        inputStyle={{ width: "100%" }}
      />
      {errors[name] && (
        <FormMessage className="text-xs font-medium">
          {errors[name]?.message as string}
        </FormMessage>
      )}
    </FormItem>
  );
};

export default PhoneNumberFormField;
