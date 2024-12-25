import PasswordFormFieldWithLink from "@/components/components/form/PasswordFormFieldWithLink";
import InputFormField from "@/components/components/form/InputFormField";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";
import Loading from "@/components/components/withStatus/loading/Loading";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      if (response?.data?.success === true) {
        const { token, user } = response.data;
        const { user_type } = user;

        localStorage.setItem("userType", user_type);
        localStorage.setItem("userToken", token);

        navigate("/admin/dashboard");
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
    </FormProvider>
  );
};

export default Login;
