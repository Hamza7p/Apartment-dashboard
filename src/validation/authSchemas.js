import * as yup from "yup";

/**
 * Phone validation regex (supports international formats)
 */
const phoneRegex = /^9639[0-9]{8}$/;

/**
 * Login form validation schema
 */
export const loginSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Please enter a valid phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: yup.boolean().default(false),
});

/**
 * Send OTP form validation schema
 */
export const sendOtpSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Please enter a valid phone number"),
});

/**
 * Verify OTP form validation schema
 */
export const verifyOtpSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Please enter a valid phone number"),
  otp: yup
    .string()
    .required("OTP code is required")
    .length(5, "OTP must be 5 digits")
    .matches(/^\d+$/, "OTP must contain only numbers"),
});

/**
 * Reset password form validation schema
 */
export const resetPasswordSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Please enter a valid phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
    password_confirmation: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});


