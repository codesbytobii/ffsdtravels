import { useState, useMemo } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  useFormState,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface PasswordFormFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
}

const PasswordFormField: React.FC<PasswordFormFieldProps> = ({
  label,
  name,
  register,
  errors,
  watch,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const password = watch(name) || "";
  const { touchedFields } = useFormState();

  const passwordConditions = useMemo(() => {
    return [
      { message: "At least 7 characters", isValid: password.length >= 7 },
      {
        message: "At least one lowercase letter [a-z]",
        isValid: /[a-z]/.test(password),
      },
      {
        message: "At least one uppercase letter [A-Z]",
        isValid: /[A-Z]/.test(password),
      },
      { message: "Number [0-9]", isValid: /\d/.test(password) },
      {
        message: "Special character [@$!%*#?&]",
        isValid: /[@$!%*#?&]/.test(password),
      },
    ];
  }, [password]);

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
      {touchedFields[name] ? (
        <ul className="text-[10px] font-medium list-disc list-inside ">
          {passwordConditions.map((condition, index) => (
            <li
              key={index}
              className={condition.isValid ? "text-green-500" : "text-red-500"}
            >
              {condition.message}
            </li>
          ))}
        </ul>
      ) : (
        errors[name] && (
          <FormMessage className="text-[10px] font-medium ">
            {errors[name]?.message as string}
          </FormMessage>
        )
      )}
    </FormItem>
  );
};

export default PasswordFormField;
