import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface PasswordFormFieldWithLinkProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch?: UseFormWatch<any>;
  onForgotPasswordClick: () => void; // New prop for handling forgot password click
}

const PasswordFormFieldWithLink: React.FC<PasswordFormFieldWithLinkProps> = ({
  label,
  name,
  register,
  errors,
  // watch,
  onForgotPasswordClick, // Use new prop
}) => {
  const [showPassword, setShowPassword] = useState(false);
  // const password = watch ? watch("password") : undefined;

  // console.log(password)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register(name)}
          className="px-3 py-2 border border-gray-300 focus:border-primaryRed focus:border-2 focus:ring-0 outline-none rounded w-full transition-colors duration-300 ease-in-out"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>
      {errors[name] && (
        <FormMessage className="text-[10px] font-medium">
          {errors[name]?.message as string}
        </FormMessage>
      )}
      {name === "password" && (
        <div className="mt-2 w-full flex justify-end">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onForgotPasswordClick(); // Notify parent component
            }}
            className="text-primaryRed hover:underline text-[12px] font-medium"
          >
            Forgot password?
          </a>
        </div>
      )}
    </FormItem>
  );
};

export default PasswordFormFieldWithLink;
