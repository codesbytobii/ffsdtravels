import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import InputFormField from "@/components/components/form/InputFormField";
import InputOTPFormField from "@/components/components/form/InputOTPFormField";
import PasswordFormField from "@/components/components/form/PasswordFormField";
import ConfirmPasswordFormField from "@/components/components/form/ConfirmPasswordFormField";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/config/api";
import { toast } from "react-toastify";
import Loading from "@/components/components/withStatus/loading/Loading";
import { useLocation } from "react-router-dom";

interface ErrorResponseData {
  message?: string;
}

const formVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const textVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const ForgotPassword = () => {
  const methods = useForm();
  const {
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const [showForm, setShowForm] = useState(1);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [regenOTPLoading, setRegenOTPLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  const handleRegenerateOTP = async () => {
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
        setShowForm(2);
        toast.success(response.data.message);
        setResendTimer(60);
        setIsResendDisabled(true);
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      setRegenOTPLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const { email, otp, password, password_confirmation } = getValues();
    setForgotPasswordLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}admin/change/password`,
        { email, otp, password, password_confirmation },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response?.data?.success === true) {
        query.set("view", "login");
        // navigate("/authentication?view=login", {replace: true});
        toast.success(response.data.message);
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      setForgotPasswordLoading(false);
    }
  };

  const onSubmit = () => {
    setShowForm(3);
  };

  const goBack = () => {
    if (showForm > 1) setShowForm(showForm - 1);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full h-full flex flex-col gap-10 items-center justify-center relative">
        <div className="flex flex-col items-center">
          <h1 className="text-gray-700 font-bold">Forgot Password?</h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={showForm}
              className="text-gray-600 font-bold"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              {showForm === 1
                ? "Enter your email address"
                : showForm === 2
                ? "Enter the OTP sent to email"
                : "Enter your new password"}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-6">
          <AnimatePresence mode="wait">
            {showForm === 1 && (
              <FormWrapper
                key="form1"
                onSubmit={handleSubmit(handleRegenerateOTP)}
              >
                <InputFormField
                  label="Email"
                  name="email"
                  register={methods.register}
                  errors={errors}
                />
                <Button
                  className="col-span-2 bg-primaryRed duration-300 capitalize"
                  type="submit"
                  disabled={regenOTPLoading}
                >
                  {regenOTPLoading ? (
                    <Loading color="#FFFFFF" size="20" />
                  ) : (
                    "Get OTP"
                  )}
                </Button>
              </FormWrapper>
            )}
            {showForm === 2 && (
              <FormWrapper key="form2" onSubmit={handleSubmit(onSubmit)}>
                <InputOTPFormField
                  name="otp"
                  register={methods.register}
                  errors={errors}
                  maxLength={6}
                />
                <div className="flex justify-center items-center">
                  <span className="flex items-center m-0 text-gray-600 font-medium text-md tracking-tight leading-4">
                    You didn't get the OTP?{" "}
                    <Button
                      onClick={handleRegenerateOTP}
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
                  disabled={isSubmitting}
                >
                  Change Password
                </Button>
                <BackButton goBack={goBack} />
              </FormWrapper>
            )}
            {showForm === 3 && (
              <FormWrapper
                key="form3"
                onSubmit={handleSubmit(handleForgotPassword)}
              >
                <PasswordFormField
                  label="Password"
                  name="password"
                  register={methods.register}
                  errors={errors}
                  watch={methods.watch}
                />
                <ConfirmPasswordFormField
                  label="Confirm Password"
                  name="password_confirmation"
                  register={methods.register}
                  errors={errors}
                  watch={methods.watch}
                />
                <Button
                  className="col-span-2 bg-primaryRed duration-300 capitalize"
                  type="submit"
                  disabled={forgotPasswordLoading}
                >
                  {forgotPasswordLoading ? (
                    <Loading color="#FFFFFF" size="20" />
                  ) : (
                    " Change Password"
                  )}
                </Button>
                <BackButton goBack={goBack} />
              </FormWrapper>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FormProvider>
  );
};

const FormWrapper: React.FC<{
  onSubmit: () => void;
  children: React.ReactNode;
}> = ({ onSubmit, children }) => (
  <motion.div
    variants={formVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
    className="w-full flex flex-col items-center justify-center gap-6"
  >
    <form onSubmit={onSubmit} className="w-full max-w-sm flex flex-col gap-4">
      {children}
    </form>
  </motion.div>
);

const BackButton: React.FC<{ goBack: () => void }> = ({ goBack }) => (
  <div className="w-full flex justify-end">
    <button
      type="button"
      onClick={goBack}
      className="flex items-center gap-2 text-gray-800"
    >
      <ChevronLeft size={20} />
      <p className="font-medium text-base">Back</p>
    </button>
  </div>
);

export default ForgotPassword;
