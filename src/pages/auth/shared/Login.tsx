// import PasswordFormFieldWithLink from "@/components/components/form/PasswordFormFieldWithLink";
// import InputFormField from "@/components/components/form/InputFormField";
// import { Button } from "@/components/ui/button";
// import { FormProvider, useForm } from "react-hook-form";
// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import { BASE_URL } from "@/config/api";
// import Loading from "@/components/components/withStatus/loading/Loading";
// import { useNavigate } from "react-router-dom";
// import Dashboard from "@/pages/admin/dashboard/Dashboard";
// import OrganizationDashboard from "@/pages/admin/dashboard/OrganizationDashboard";
// import StaffDashboard from "@/pages/admin/dashboard/StaffDashboard";

// interface ErrorResponseData {
//   message?: string;
// }

// interface LoginProps {
//   onForgotPasswordClick: () => void;
// }

// const Login: React.FC<LoginProps> = ({ onForgotPasswordClick }) => {
//   const methods = useForm();
//   const {
//     getValues,
//     handleSubmit,
//     formState: { errors },
//   } = methods;

//   const [loading, setLoading] = useState(false);
//   const [userType, setUserType] = useState<string | null>(null); // State to track user_type
//   const navigate = useNavigate();

//   async function handleLogin() {
//     const { email, password } = getValues();

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${BASE_URL}admin/login`,
//         { email, password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );
//       if (response?.data?.success === true) {
//         const { token, user } = response.data;
//         const { user_type } = user;

//         console.log(user)

//         console.log(response.data)

//         localStorage.setItem("userType", user_type);
//         localStorage.setItem("userToken", token);
//         localStorage.setItem("organizationId", user.user_company_id);
//         localStorage.setItem("userCompanyId", user.user_company_id);

//         setUserType(user_type); // Set user_type in state

//         // Conditional navigation based on user_type
//         if (user_type === "system_admin") {
//           navigate("/admin/dashboard");
//         } else if (user_type === "admin") {
//           navigate("/admin/dashboard");
//         } else if (user_type === "organization") {
//           navigate("/admin/organizationdashboard");
//         } else {
//           navigate("/admin/staffdashboard"); // Fallback route
//         }
        
//         toast.success(response?.data?.message);
//       }
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;
//       if (err.response?.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={handleSubmit(handleLogin)}
//         className="w-full max-w-sm flex flex-col gap-4"
//       >
//         <InputFormField
//           label="Email"
//           name="email"
//           register={methods.register}
//           errors={errors}
//         />
//         <PasswordFormFieldWithLink
//           label="Password"
//           name="password"
//           register={methods.register}
//           errors={errors}
//           onForgotPasswordClick={onForgotPasswordClick}
//         />
//         <Button
//           className="col-span-2 bg-primaryRed duration-300 capitalize"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? <Loading color="#FFFFFF" size="20" /> : "Login"}
//         </Button>
//       </form>

//       {/* Conditionally render components based on user_type */}
//       {userType === "system_admin" && <Dashboard />}
//       {userType === "organization" && <OrganizationDashboard />}
//       {userType === "staff" && <StaffDashboard />}
//       {/* Add more conditions if necessary */}
//     </FormProvider>
//   );
// };

// export default Login;




import PasswordFormFieldWithLink from "@/components/components/form/PasswordFormFieldWithLink";
import InputFormField from "@/components/components/form/InputFormField";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";
import Loading from "@/components/components/withStatus/loading/Loading";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import OrganizationDashboard from "@/pages/organization/dashboard/Dashboard";
import StaffDashboard from "@/pages/staff/dashboard/Dashboard";

interface ErrorResponseData {
  message?: string;
}

interface LoginProps {
  onForgotPasswordClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onForgotPasswordClick }) => {
  const methods = useForm();
  const {
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType) {
      const routes: Record<string, string> = {
        system_admin: "/admin/dashboard",
        admin: "/admin/dashboard",
        organization: "/admin/organizationdashboard",
        staff: "/admin/staffdashboard",
      };
      navigate(routes[userType] || "/admin/staffdashboard");
    }
  }, [userType, navigate]);

  async function handleLogin() {
    const { email, password } = getValues();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}admin/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response?.data?.success) {
        const { token, user } = response.data;
        const { user_type } = user;

        localStorage.setItem("userType", user_type);
        localStorage.setItem("userToken", token);
        localStorage.setItem("organizationId", user.user_company_id);
        localStorage.setItem("userCompanyId", user.user_company_id);

        setUserType(user_type); // Trigger the navigation through useEffect
        toast.success(response?.data?.message);
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <InputFormField
          label="Email"
          name="email"
          register={methods.register}
          errors={errors}
        />
        <PasswordFormFieldWithLink
          label="Password"
          name="password"
          register={methods.register}
          errors={errors}
          onForgotPasswordClick={onForgotPasswordClick}
        />
        <Button
          className="col-span-2 bg-primaryRed duration-300 capitalize"
          type="submit"
          disabled={loading}
        >
          {loading ? <Loading color="#FFFFFF" size="20" /> : "Login"}
        </Button>
      </form>

      {userType === "system_admin" && <Dashboard />}
      {userType === "admin" && <Dashboard />}
      {userType === "organization" && <OrganizationDashboard />}
      {userType === "staff" && <StaffDashboard />}

    </FormProvider>
  );
};

export default Login;
