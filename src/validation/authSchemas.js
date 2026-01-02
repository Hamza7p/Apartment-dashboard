import * as yup from "yup";

/**
 * Phone validation regex (supports international formats)
 */
const phoneRegex = /^(\+?[0-9]{1,3}[-.\s]?)?[0-9]{8,15}$/;

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
    .length(6, "OTP must be 6 digits")
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
  confirmation_password: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});


