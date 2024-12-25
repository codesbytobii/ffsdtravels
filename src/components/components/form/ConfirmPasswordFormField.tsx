import { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ConfirmPasswordFormFieldProps {
  label: string; // Label for the input field
  name: string; // Name of the form field
  register: UseFormRegister<any>; // Function to register input in the form
  errors: FieldErrors<any>; // Object containing form field errors
  watch: UseFormWatch<any>; // Function to watch form field values
}

const ConfirmPasswordFormField: React.FC<ConfirmPasswordFormFieldProps> = ({
  label,
  name,
  register,
  errors,
  watch,
}) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const password = watch("password"); // Watch for the value of the "password" field
  const confirmPassword = watch(name); // Watch for the value of the confirm password field

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"} // Toggle input type between text and password
          {...register(name)}
          className="px-3 py-2 border border-gray-300 focus:border-primaryRed focus:border-2 focus:ring-0 outline-none rounded w-full transition-colors duration-300 ease-in-out"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility} // Click handler to toggle password visibility
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}{" "}
          {/* Toggle icon */}
        </div>
      </div>
      {confirmPassword && confirmPassword !== password ? (
        <FormMessage className="text-[10px] font-medium">
          Passwords do not match {/* Error message for mismatched passwords */}
        </FormMessage>
      ) : (
        errors[name] && (
          <FormMessage className="text-[10px] font-medium">
            {errors[name]?.message as string}{" "}
            {/* Display field error message */}
          </FormMessage>
        )
      )}
    </FormItem>
  );
};

export default ConfirmPasswordFormField;
