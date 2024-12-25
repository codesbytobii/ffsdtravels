import React, { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { userType, paymentType } from "@/data/data.json";
import Loading from "@/components/components/withStatus/loading/Loading";
import InputFormField from "@/components/components/form/InputFormField";
import SelectFormField from "@/components/components/form/SelectFormField";

const CreateUserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "At least 2 characters." })
    .max(30, { message: "At most 30 characters." }),
  lastName: z
    .string()
    .min(2, { message: "At least 2 characters." })
    .max(30, { message: "At most 30 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(2, { message: "Enter phone number" }),
  companyName: z.string().min(2).max(150),
  companyCountry: z.string({ message: "Select a country" }),
  user_type: z.string({ message: "Select a User type" }),
  paymentType: z.string({ message: "Select a payment type" }),
});

type CreateUserFormValues = z.infer<typeof CreateUserSchema>;

interface CountryData {
  id: string;
  country: string;
}

interface ErrorResponseData {
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}

interface CreateUserFormProps {
  user?: CreateUserFormValues; // Optional user prop for editing
  onSubmit?: (updatedUser: CreateUserFormValues) => void; // Callback for form submission
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ user, onSubmit }) => {
  const methods = useForm<CreateUserFormValues>({
    resolver: zodResolver(CreateUserSchema),
    mode: "onChange",
    defaultValues: user || {}, // Pre-fill form with user data if editing
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const [createFormLoading, setCreateFormLoading] = useState(false);
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      toast.error("User token is missing. Please log in.");
      return;
    }

    axios
      .get(`${BASE_URL}countries`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        setCountryData(data);
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || "Unknown error";
        toast.error(`Error fetching data: ${errorMessage}`);
      });
  }, []);

  const handleCreateOrUpdate = async () => {
    const userToken = localStorage.getItem("userToken");

    const {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      companyCountry,
      user_type,
      paymentType,
    } = getValues();

    const companyCountryNumber =
      typeof companyCountry === "string"
        ? parseFloat(companyCountry)
        : companyCountry;

    setCreateFormLoading(true);
    try {
      if (user) {
        // Update existing user
        const response = await axios.post(
          `${BASE_URL}user/edit`,
          {
            firstName,
            lastName,
            email,
            phone,
            companyName,
            companyCountry: companyCountryNumber,
            user_type,
            paymentType,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (response?.data?.success === true) {
          toast.success("User updated successfully!");
          if (onSubmit) onSubmit(response.data.user);
        }
      } else {
        // Create new user
        const response = await axios.post(
          `${BASE_URL}create/company`,
          {
            firstName,
            lastName,
            email,
            phone,
            companyName,
            companyCountry: companyCountryNumber,
            user_type,
            paymentType,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (response?.data?.success === true) {
          toast.success(response?.data?.message);
        }
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;

      if (err.response?.data?.errors) {
        if (err.response.data.errors.email) {
          toast.error(err.response.data.errors.email.join(", "));
        }
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setCreateFormLoading(false);
    }
  };

  const generateOptions = <T, K extends keyof T>(
    data: T[],
    labelKey: K,
    valueKey: K,
    idKey?: K
  ) => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item) => ({
      label: String(item[labelKey]),
      value: idKey ? String(item[idKey]) : String(item[valueKey]),
    }));
  };

  const countryOptions = generateOptions(countryData, "country", "id", "id");
  const userTypeOptions = generateOptions(userType, "label", "value");
  const paymentTypeOptions = generateOptions(paymentType, "label", "value");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleCreateOrUpdate)}>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 gap-y-6">
          <InputFormField
            label="First Name"
            name="firstName"
            register={methods.register}
            errors={errors}
          />
          <InputFormField
            label="Last Name"
            name="lastName"
            register={methods.register}
            errors={errors}
          />
          <InputFormField
            label="Email"
            name="email"
            register={methods.register}
            errors={errors}
          />
          <InputFormField
            label="Phone Number"
            name="phone"
            register={methods.register}
            errors={errors}
          />
          <InputFormField
            label="Company Name"
            name="companyName"
            register={methods.register}
            errors={errors}
          />

          <SelectFormField
            label="Country"
            name="companyCountry"
            errors={errors}
            options={countryOptions}
          />

          <SelectFormField
            label="User Type"
            name="user_type"
            errors={errors}
            options={userTypeOptions}
          />

          <SelectFormField
            label="Payment Type"
            name="paymentType"
            errors={errors}
            options={paymentTypeOptions}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            type="submit"
            disabled={createFormLoading}
            className="bg-primaryRed duration-300 capitalize w-52"
          >
            {createFormLoading ? (
              <Loading color="#FFFFFF" size="20" />
            ) : (
              user ? "Update User" : "Create Company"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateUserForm;



// import { z } from "zod";
// import { toast } from "react-toastify";
// import { BASE_URL } from "@/config/api";
// import axios, { AxiosError } from "axios";
// import { Button } from "@/components/ui/button";
// import React, { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, FormProvider } from "react-hook-form";
// import { userType, paymentType } from "@/data/data.json";
// import Loading from "@/components/components/withStatus/loading/Loading";
// import InputFormField from "@/components/components/form/InputFormField";
// import SelectFormField from "@/components/components/form/SelectFormField";

// const CreateUserSchema = z.object({
//   firstName: z
//     .string()
//     .min(2, { message: "At least 2 characters." })
//     .max(30, { message: "At most 30 characters." }),
//   lastName: z
//     .string()
//     .min(2, { message: "At least 2 characters." })
//     .max(30, { message: "At most 30 characters." }),
//   email: z.string().email({ message: "Invalid email address" }),
//   phone: z.string().min(2, { message: "Enter phone number" }),
//   companyName: z.string().min(2).max(150),
//   companyCountry: z.string({ message: "Select a country" }),
//   user_type: z.string({ message: "Select a User type" }),
//   paymentType: z.string({ message: "Select a payment type" }),
// });

// type CreateUserFormValues = z.infer<typeof CreateUserSchema>;

// interface CountryData {
//   id: string;
//   country: string;
// }

// interface ErrorResponseData {
//   message?: string;
//   errors?: {
//     [key: string]: string[];
//   };
// }

// const CreateUserForm: React.FC = () => {
//   const methods = useForm<CreateUserFormValues>({
//     resolver: zodResolver(CreateUserSchema),
//     mode: "onChange",
//   });

//   const {
//     handleSubmit,
//     getValues,
//     formState: { errors },
//   } = methods;

//   const [createFormLoading, setCreateFormLoading] = useState(false);
//   const [countryData, setCountryData] = useState<CountryData[]>([]);

//   useEffect(() => {
//     const userToken = localStorage.getItem("userToken");

//     if (!userToken) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     axios
//       .get(`${BASE_URL}countries`, {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           Accept: "application/json",
//         },
//       })
//       .then((response) => {
//         const data = response.data;
//         setCountryData(data);
//       })
//       .catch((error) => {
//         const errorMessage = error?.response?.data?.message || "Unknown error";
//         toast.error(`Error fetching data: ${errorMessage}`);
//       });
//   }, []);

//   const handleCreateForm = async () => {
//     const userToken = localStorage.getItem("userToken");

//     const {
//       firstName,
//       lastName,
//       email,
//       phone,
//       companyName,
//       companyCountry,
//       user_type,
//       paymentType,
//     } = getValues();

//     const companyCountryNumber =
//       typeof companyCountry === "string"
//         ? parseFloat(companyCountry)
//         : companyCountry;

//     setCreateFormLoading(true);
//     try {
//       const response = await axios.post(
//         `${BASE_URL}create/company`,
//         {
//           firstName,
//           lastName,
//           email,
//           phone,
//           companyName,
//           companyCountry: companyCountryNumber,
//           user_type,
//           paymentType,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );

//       if (response?.data?.success === true) {
//         toast.success(response?.data?.message);
//       }
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;

//       // Check if there are field-specific errors
//       if (err.response?.data?.errors) {
//         if (err.response.data.errors.email) {
//           toast.error(err.response.data.errors.email.join(", "));
//         }
//       } else if (err.response?.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     } finally {
//       setCreateFormLoading(false);
//     }
//   };

//   const generateOptions = <T, K extends keyof T>(
//     data: T[],
//     labelKey: K,
//     valueKey: K,
//     idKey?: K
//   ) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return [];
//     }

//     return data.map((item) => ({
//       label: String(item[labelKey]),
//       value: idKey ? String(item[idKey]) : String(item[valueKey]),
//     }));
//   };

//   const countryOptions = generateOptions(countryData, "country", "id", "id");
//   const userTypeOptions = generateOptions(userType, "label", "value");
//   const paymentTypeOptions = generateOptions(paymentType, "label", "value");

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(handleCreateForm)}>
//         <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 gap-y-6">
//           <InputFormField
//             label="First Name"
//             name="firstName"
//             register={methods.register}
//             errors={errors}
//           />
//           <InputFormField
//             label="Last Name"
//             name="lastName"
//             register={methods.register}
//             errors={errors}
//           />
//           <InputFormField
//             label="Email"
//             name="email"
//             register={methods.register}
//             errors={errors}
//           />
//           <InputFormField
//             label="Phone Number"
//             name="phone"
//             register={methods.register}
//             errors={errors}
//           />
//           <InputFormField
//             label="Company Name"
//             name="companyName"
//             register={methods.register}
//             errors={errors}
//           />

//           <SelectFormField
//             label="Country"
//             name="companyCountry"
//             errors={errors}
//             options={countryOptions}
//           />

//           <SelectFormField
//             label="User Type"
//             name="user_type"
//             errors={errors}
//             options={userTypeOptions}
//           />

//           <SelectFormField
//             label="Payment Type"
//             name="paymentType"
//             errors={errors}
//             options={paymentTypeOptions}
//           />
//         </div>

//         <div className="mt-4 flex justify-center">
//           <Button
//             type="submit"
//             disabled={createFormLoading}
//             className="bg-primaryRed duration-300 capitalize w-52"
//           >
//             {createFormLoading ? (
//               <Loading color="#FFFFFF" size="20" />
//             ) : (
//               "Create Company"
//             )}
//           </Button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default CreateUserForm;


