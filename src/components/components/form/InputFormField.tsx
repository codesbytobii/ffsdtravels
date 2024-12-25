import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

// Define props interface
interface InputFormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

// InputFormField component
const InputFormField = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
}: InputFormFieldProps<T>) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <input
        {...register(name)}
        className="px-3 py-2 border border-gray-300 focus:border-primaryRed focus:border-2 focus:ring-0 outline-none rounded w-full transition-colors duration-300 ease-in-out"
      />
      {errors[name] && (
        <FormMessage className="text-[10px] font-medium">
          {errors[name]?.message as string}
        </FormMessage>
      )}
    </FormItem>
  );
};

export default InputFormField;
