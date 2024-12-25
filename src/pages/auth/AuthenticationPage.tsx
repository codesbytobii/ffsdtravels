import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DP from "@/assets/img/aboutus.jpg";
import SignUp from "./shared/SignUp";
import Login from "./shared/Login";
import ForgotPassword from "./shared/ForgotPassword";
import { ChevronLeft } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validation schemas
const passwordSchema = z.string().min(7, { message: "At least 7 characters" });

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
});

const SignUpSchema = z
  .object({
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
    password: passwordSchema,
    password_confirmation: passwordSchema,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

const AuthenticationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialView =
    (queryParams.get("view") as "login" | "signUp" | "forgotPassword") ||
    "login";
  const [view, setView] = useState<"login" | "signUp" | "forgotPassword">(
    initialView
  );
  const [previousView, setPreviousView] = useState<
    "login" | "signUp" | "forgotPassword" | null
  >(null);

  const methods = useForm({
    resolver: zodResolver(view === "signUp" ? SignUpSchema : LoginSchema),
  });

  
  useEffect(() => {
    // Update the view parameter in the URL whenever the view state changes
    navigate(`/authentication?view=${view}`, { replace: true });
  }, [view, navigate]);
 
  const handleForgotPasswordClick = () => {
    setPreviousView(view);
    setView("forgotPassword");
  };

  const handleBackButtonClick = () => {
    if (previousView) {
      setView(previousView);
      setPreviousView(null);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="w-screen h-screen flex overflow-hidden">
        <div className="w-full h-full lg:flex md:flex sm:hidden hidden">
          <img src={DP} className="object-cover w-full" alt="Background" />
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center relative">
          {view !== "login" && view !== "signUp" && (
            <motion.button
              key="backButton"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              onClick={handleBackButtonClick}
              className="absolute top-4 left-4 bg-transparent flex gap-1 p-2 rounded"
              aria-label="Go back"
            >
              <ChevronLeft size={20} className="text-gray-800" />
              <p className="font-medium text-gray-800 text-sm">Back</p>
            </motion.button>
          )}

          <AnimatePresence mode="wait">
            {view === "forgotPassword" ? (
              <motion.div
                key="forgotPassword"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-center justify-center gap-6"
              >
                <ForgotPassword />
              </motion.div>
            ) : (
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-center justify-center gap-6"
              >
                <div className="flex flex-col items-center">
                  <h1 className="text-gray-700 font-bold">
                    {view === "signUp" ? "Welcome!" : "Welcome Back!"}
                  </h1>
                  <p className="text-gray-600 font-bold">
                    {view === "signUp"
                      ? "Create your account"
                      : "Login to your account"}
                  </p>
                </div>

                {view === "signUp" ? (
                  <SignUp />
                ) : (
                  <Login onForgotPasswordClick={handleForgotPasswordClick} />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {view !== "forgotPassword" && (
            <AnimatePresence mode="wait">
              <motion.span
                key={view === "signUp" ? "signUpLink" : "loginLink"}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="flex text-gray-600 font-medium mt-3"
              >
                {view === "signUp" ? (
                  <>
                    Already have an account?
                    <button
                      onClick={() => setView("login")}
                      className="ml-1 text-primaryRed"
                      aria-label="Log in"
                    >
                      Log in
                    </button>
                  </>
                ) : (
                  <>
                    Don’t have an account?
                    <button
                      onClick={() => setView("signUp")}
                      className="ml-1 text-primaryRed"
                      aria-label="Sign up"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default AuthenticationPage;
