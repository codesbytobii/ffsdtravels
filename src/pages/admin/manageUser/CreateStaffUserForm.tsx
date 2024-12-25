// import React, { useState } from "react";
// import { z } from "zod";
// import { toast } from "react-toastify";
// import axios, { AxiosError } from "axios";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, FormProvider } from "react-hook-form";
// import Loading from "@/components/components/withStatus/loading/Loading";
// import InputFormField from "@/components/components/form/InputFormField";

// const CreateStaffSchema = z.object({
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
// });

// type CreateStaffFormValues = z.infer<typeof CreateStaffSchema>;

// interface ErrorResponseData {
//   message?: string;
//   errors?: {
//     [key: string]: string[];
//   };
// }

// interface CreateStaffFormProps {
//   staff?: CreateStaffFormValues; // Optional staff prop for editing
//   onSubmit?: (updatedStaff: CreateStaffFormValues) => void; // Callback for form submission
// }

// const CreateStaffForm: React.FC<CreateStaffFormProps> = ({ staff, onSubmit }) => {
//   const methods = useForm<CreateStaffFormValues>({
//     resolver: zodResolver(CreateStaffSchema),
//     mode: "onChange",
//     defaultValues: staff || {}, // Pre-fill form with staff data if editing
//   });

//   const {
//     handleSubmit,
//     getValues,
//     formState: { errors },
//   } = methods;

//   const [createFormLoading, setCreateFormLoading] = useState(false);
//   const user_type = "staff"; // Fixed user type

//   const handleCreateOrUpdate = async () => {
//     const userToken = localStorage.getItem("userToken");
//     const organizationId = localStorage.getItem("organizationId");

//     // Check if userToken and organizationId are present
//     if (!userToken) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     if (!organizationId) {
//       toast.error("Organization ID is missing. Please ensure the organization is logged in.");
//       return;
//     }

//     const { firstName, lastName, email, phone } = getValues();

//     setCreateFormLoading(true);
//     try {
//       const response = await axios.post(
//         'https://test.ffsdtravels.com/api/org/create/staff',
//         {
//           firstName,
//           lastName,
//           email,
//           phone,
//           user_type, // Use fixed user_type
//           organization_id: organizationId, // Include organizationId in the request payload
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
//         toast.success("Staff created successfully!");
//         if (onSubmit) onSubmit(response.data.staff);
//       }
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;
//       console.error("API error:", err); // Log the full error response

//       if (err.response?.data?.errors) {
//         Object.values(err.response.data.errors).forEach((errorMessages) => {
//           toast.error(errorMessages.join(", "));
//         });
//       } else if (err.response?.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     } finally {
//       setCreateFormLoading(false);
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(handleCreateOrUpdate)}>
//         <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 gap-y-6">
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
//               staff ? "Update Staff" : "Create Staff"
//             )}
//           </Button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default CreateStaffForm;





import React, { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
// import { userType, paymentType } from "@/data/data.json";
import Loading from "@/components/components/withStatus/loading/Loading";
import InputFormField from "@/components/components/form/InputFormField";
// import SelectFormField from "@/components/components/form/SelectFormField";

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
//   companyName: z.string().min(2).max(150),
//   companyCountry: z.string({ message: "Select a country" }),
//   user_type: z.string({ message: "Select a User type" }),
//   paymentType: z.string({ message: "Select a payment type" }),
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

const CreateStaffForm: React.FC<CreateUserFormProps> = ({ user, onSubmit }) => {
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

  console.log(countryData)

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
    //   companyName,
    //   companyCountry,
    //   user_type,
    //   paymentType,
    } = getValues();

    // const companyCountryNumber =
    //   typeof companyCountry === "string"
    //     ? parseFloat(companyCountry)
    //     : companyCountry;

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
            // companyName,
            // companyCountry: companyCountryNumber,
            // user_type,
            // paymentType,
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
        // Create new staff
        const response = await axios.post(
          `${BASE_URL}org/create/staff`,
          {
            firstName,
            lastName,
            email,
            phone,
            // companyName,
            // companyCountry: companyCountryNumber,
            // user_type,
            // paymentType,
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
          {/* <InputFormField
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
          /> */}
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
              user ? "Update Staff" : "Create Staff"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateStaffForm;