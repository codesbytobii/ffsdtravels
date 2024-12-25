import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import InputFormField from "@/components/components/form/InputFormField";
import PasswordFormField from "@/components/components/form/PasswordFormField";
import ConfirmPasswordFormField from "@/components/components/form/ConfirmPasswordFormField";
import InputOTPFormField from "@/components/components/form/InputOTPFormField";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/config/api";
import { toast } from "react-toastify";
import Loading from "@/components/components/withStatus/loading/Loading";
import { useNavigate } from "react-router-dom";

interface ErrorResponseData {
  message?: string;
}

const formVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const SignUp = () => {
  const methods = useForm();
  const { getValues } = methods;
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(1);
  const [OTPLoading, setOTPLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [regenOTPLoading, setRegenOTPLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  async function handleSignUp() {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      password_confirmation,
    } = getValues();

    setSignUpLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}admin/register`,
        { firstName, lastName, email, phone, password, password_confirmation },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        setShowForm(2);
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    setSignUpLoading(false);
  }

  async function handleRegenerateOTP() {
    const { email } = getValues();
    setRegenOTPLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}admin/otp/regenerate`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        setResendTimer(60); // Set countdown to 60 seconds
        setIsResendDisabled(true); // Disable button while countdown is active
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    setRegenOTPLoading(false);
  }

  async function handleSubmitOTP() {
    const { email, otp } = getValues();

    setOTPLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}admin/verify/email`,
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response?.data?.success === true) {
        navigate("/authentication?view=login");
        toast.success(response?.data?.message);
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    setOTPLoading(false);
  }

  const goBack = () => {
    if (showForm > 1) {
      setShowForm(showForm - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <AnimatePresence mode="wait">
        {showForm === 1 && (
          <SignUpForm
            key="form1"
            onSubmit={methods.handleSubmit(handleSignUp)}
            signUpLoading={signUpLoading}
          />
        )}
        {showForm === 2 && (
          <OTPForm
            key="form2"
            onSubmit={methods.handleSubmit(handleSubmitOTP)}
            onClick={handleRegenerateOTP}
            regenOTPLoading={regenOTPLoading}
            OTPLoading={OTPLoading}
            goBack={goBack}
            resendTimer={resendTimer}
            isResendDisabled={isResendDisabled}
          />
        )}
      </AnimatePresence>
    </FormProvider>
  );
};

const SignUpForm: React.FC<{
  onSubmit: () => void;
  signUpLoading: boolean;
}> = ({ onSubmit, signUpLoading }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <motion.form
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onSubmit={onSubmit}
      className="w-full max-w-sm grid grid-cols-2 gap-x-4 gap-y-3"
    >
      <InputFormField
        label="First Name"
        name="firstName"
        register={register}
        errors={errors}
      />
      <InputFormField
        label="Last Name"
        name="lastName"
        register={register}
        errors={errors}
      />
      <InputFormField
        label="Email"
        name="email"
        register={register}
        errors={errors}
      />
      <InputFormField
        label="Phone Number"
        name="phone"
        register={register}
        errors={errors}
      />
      <PasswordFormField
        label="Password"
        name="password"
        register={register}
        errors={errors}
        watch={watch}
      />
      <ConfirmPasswordFormField
        label="Confirm Password"
        name="password_confirmation"
        register={register}
        errors={errors}
        watch={watch}
      />
      <Button
        className="col-span-2 bg-primaryRed duration-300 capitalize"
        type="submit"
        disabled={signUpLoading}
      >
        {signUpLoading ? <Loading color="#FFFFFF" size="20" /> : "Sign Up"}
      </Button>
    </motion.form>
  );
};

const OTPForm: React.FC<{
  onSubmit: () => void;
  goBack: () => void;
  onClick: () => void;
  regenOTPLoading: boolean;
  OTPLoading: boolean;
  resendTimer: number;
  isResendDisabled: boolean;
}> = ({
  onSubmit,
  onClick,
  goBack,
  OTPLoading,
  // regenOTPLoading,
  resendTimer,
  isResendDisabled,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <motion.div
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center justify-center gap-6"
    >
      <form onSubmit={onSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <InputOTPFormField
          name="otp"
          register={register}
          errors={errors}
          maxLength={6}
        />
        <div className="flex justify-center items-center">
          <span className="flex items-center m-0 text-gray-600 font-medium text-md tracking-tight leading-4">
            You didn't get the OTP?{" "}
            <Button
              onClick={onClick}
              className="ml-1 p-0 text-primaryRed bg-transparent hover:bg-transparent"
              disabled={isResendDisabled}
            >
              {isResendDisabled ? `${resendTimer}s` : "Resend"}
            </Button>
          </span>
        </div>
        <Button
          className="col-span-2 bg-primaryRed duration-300 capitalize"
          type="submit"
          disabled={OTPLoading}
        >
          {OTPLoading ? <Loading color="#FFFFFF" size="20" /> : "Submit"}
        </Button>
        <button
          type="button"
          onClick={goBack}
          className="flex justify-end items-center"
        >
          <ChevronLeft size={20} className="text-gray-800" />
          <p className="font-medium text-gray-800 text-base">Back</p>
        </button>
      </form>
    </motion.div>
  );
};

export default SignUp;
