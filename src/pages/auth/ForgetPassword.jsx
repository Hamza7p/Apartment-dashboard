import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";

import {
  FormCard,
  InputField,
  PasswordField,
  OTPField,
} from "@/components/forms";
import {
  sendOtpSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} from "@/validation/authSchemas";
import {
  useSendOTP,
  useVerifyOTP,
  useResetPassword,
} from "@/hooks/api/useAuth";

// Step constants
const STEPS = {
  SEND_OTP: "send_otp",
  VERIFY_OTP: "verify_otp",
  RESET_PASSWORD: "reset_password",
};

export default function ForgetPassword() {
  const { t } = useTranslation();
  const [step, setStep] = useState(STEPS.SEND_OTP);
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Send OTP Form
  const sendOtpForm = useForm({
    resolver: yupResolver(sendOtpSchema),
    defaultValues: { phone: "" },
    mode: "onChange",
  });

  // Verify OTP Form
  const verifyOtpForm = useForm({
    resolver: yupResolver(verifyOtpSchema),
    defaultValues: { phone: "", otp: "" },
    mode: "onChange",
  });

  // Reset Password Form
  const resetPasswordForm = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      phone: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onChange",
  });

  // Mutations
  const sendOtpMutation = useSendOTP({
    onSuccess: () => {
      setStep(STEPS.VERIFY_OTP);
      verifyOtpForm.setValue("phone", phone);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send OTP. Please try again.";
      setErrorMessage(message);
    },
  });

  const verifyOtpMutation = useVerifyOTP({
    onSuccess: () => {
      setStep(STEPS.RESET_PASSWORD);
      resetPasswordForm.setValue("phone", phone);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid OTP code. Please try again.";
      setErrorMessage(message);
    },
  });

  const resetPasswordMutation = useResetPassword({
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reset password. Please try again.";
      setErrorMessage(message);
    },
  });

  // Handlers
  const handleSendOTP = async (data) => {
    setErrorMessage("");
    setPhone(data.phone);
    sendOtpMutation.mutate(data);
  };

  const handleVerifyOTP = async (data) => {
    setErrorMessage("");
    verifyOtpMutation.mutate(data);
  };

  const handleResetPassword = async (data) => {
    setErrorMessage("");
    resetPasswordMutation.mutate(data);
  };

  const handleBackToLogin = () => {
    setStep(STEPS.SEND_OTP);
    setPhone("");
    setErrorMessage("");
    sendOtpForm.reset();
    verifyOtpForm.reset();
    resetPasswordForm.reset();
  };

  const isLoading =
    sendOtpMutation.isPending ||
    verifyOtpMutation.isPending ||
    resetPasswordMutation.isPending;

  // Render based on step
  const renderStep = () => {
    switch (step) {
      case STEPS.SEND_OTP:
        return (
          <FormProvider {...sendOtpForm}>
            <FormCard
              title={t("auth.forgotPassword.title")}
              subtitle={t("auth.forgotPassword.subtitle")}
            >
              <Stack spacing={2}>
                <Collapse in={!!errorMessage}>
                  <Alert severity="error" onClose={() => setErrorMessage("")}>
                    {errorMessage}
                  </Alert>
                </Collapse>

                <InputField
                  name="phone"
                  label={t("auth.phone")}
                  type="tel"
                  autoComplete="tel"
                  placeholder={t("auth.phonePlaceholder")}
                  disabled={isLoading}
                />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                onClick={sendOtpForm.handleSubmit(handleSendOTP)}
                disabled={isLoading}
                sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>{t("auth.forgotPassword.sending")}</span>
                  </Box>
                ) : (
                  t("auth.forgotPassword.sendOTP")
                )}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Typography
                component={Link}
                to="/auth/login"
                variant="body2"
                align="center"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {t("auth.backToLogin")}
              </Typography>
            </Stack>
          </FormCard>
        </FormProvider>
        );

      case STEPS.VERIFY_OTP:
        return (
          <FormProvider {...verifyOtpForm}>
            <FormCard
              title={t("auth.verifyOTP.title")}
              subtitle={t("auth.verifyOTP.subtitle")}
            >
              <Stack spacing={2}>
                <Collapse in={!!errorMessage}>
                  <Alert severity="error" onClose={() => setErrorMessage("")}>
                    {errorMessage}
                  </Alert>
                </Collapse>

                <InputField
                  name="phone"
                  label={t("auth.phone")}
                  type="tel"
                  disabled
                />

                <OTPField
                  name="otp"
                  label={t("auth.verifyOTP.otpLabel")}
                  disabled={isLoading}
                />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                onClick={verifyOtpForm.handleSubmit(handleVerifyOTP)}
                disabled={isLoading}
                sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>{t("auth.verifyOTP.verifying")}</span>
                  </Box>
                ) : (
                  t("auth.verifyOTP.verify")
                )}
              </Button>

              <Button
                variant="text"
                fullWidth
                onClick={() => {
                  setStep(STEPS.SEND_OTP);
                  setErrorMessage("");
                }}
                disabled={isLoading}
              >
                {t("auth.forgotPassword.back")}
              </Button>
            </Stack>
          </FormCard>
        </FormProvider>
        );

      case STEPS.RESET_PASSWORD:
        return (
          <FormProvider {...resetPasswordForm}>
            <FormCard
              title={t("auth.resetPassword.title")}
              subtitle={t("auth.resetPassword.subtitle")}
            >
              <Stack spacing={2}>
                <Collapse in={!!errorMessage}>
                  <Alert severity="error" onClose={() => setErrorMessage("")}>
                    {errorMessage}
                  </Alert>
                </Collapse>

                <InputField
                  name="phone"
                  label={t("auth.phone")}
                  type="tel"
                  disabled
                />

                <PasswordField
                  name="password"
                  label={t("auth.newPassword")}
                  autoComplete="new-password"
                  placeholder={t("auth.passwordPlaceholder")}
                  disabled={isLoading}
                />

                <PasswordField
                  name="password_confirmation"
                  label={t("auth.confirmPassword")}
                  autoComplete="new-password"
                  placeholder={t("auth.confirmPasswordPlaceholder")}
                  disabled={isLoading}
                />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                onClick={resetPasswordForm.handleSubmit(handleResetPassword)}
                disabled={isLoading}
                sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>{t("auth.resetPassword.resetting")}</span>
                  </Box>
                ) : (
                  t("auth.resetPassword.reset")
                )}
              </Button>
            </Stack>
          </FormCard>
        </FormProvider>
        );

      default:
        return null;
    }
  };

  return <Grid item xs={12} sm={10} md={6} lg={5}>{renderStep()}</Grid>;
}
