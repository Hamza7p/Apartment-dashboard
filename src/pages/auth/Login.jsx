import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

import { FormCard, InputField, PasswordField } from "@/components/forms";
import { loginSchema } from "@/validation/authSchemas";
import { useLogin } from "@/hooks/api/useAuth";

const initialValues = {
  phone: "",
  password: "",
  rememberMe: false,
};

export default function Login() {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const rememberMe = watch("rememberMe");
  
  const loginMutation = useLogin({
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to sign in. Please try again.";
      setErrorMessage(message);
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage("");
    const { phone, password } = data;
    
    loginMutation.mutate(
      { phone, password },
      {
        onError: (error) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Unable to sign in. Please try again.";
          setErrorMessage(message);
        },
      }
    );
  };

  const isLoading = isSubmitting || loginMutation.isPending;

  return (
    <Grid item xs={12} sm={10} md={6} lg={5} sx={{ padding: "25px 10px" }}>
      <FormProvider {...{ control, handleSubmit, formState: { isSubmitting, errors }, watch, setValue }}>
        <FormCard
          title={t("auth.login.title")}
          subtitle={t("auth.login.subtitle")}
        >
          <Stack spacing={2}>
          {/* Error Alert */}
          <Collapse in={!!errorMessage}>
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          </Collapse>

          {/* Phone Input */}
          <InputField
            name="phone"
            label={t("auth.phone")}
            type="tel"
            autoComplete="tel"
            placeholder={t("auth.phonePlaceholder")}
            disabled={isLoading}
          />

          {/* Password Input */}
          <PasswordField
            name="password"
            label={t("auth.password")}
            autoComplete="current-password"
            placeholder={t("auth.passwordPlaceholder")}
            disabled={isLoading}
          />

          {/* Remember Me & Forgot Password */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={1}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setValue("rememberMe", e.target.checked)}
                  disabled={isLoading}
                  color="primary"
                />
              }
              label={<Typography variant="body2">{t("auth.rememberMe")}</Typography>}
            />

            <Typography
              component={Link}
              to="/auth/forget-password"
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "primary.main",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t("auth.forgotPassword")}
            </Typography>
          </Stack>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                <span>{t("auth.login.signingIn")}</span>
              </Box>
            ) : (
              t("auth.login.signIn")
            )}
          </Button>
        </Stack>
      </FormCard>
    </FormProvider>
    </Grid>
  );
}
