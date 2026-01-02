import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";

/**
 * OTPField Component - OTP code input field
 */
export default function OTPField({
  name = "otp",
  label = "OTP Code",
  disabled = false,
  control: externalControl,
  ...props
}) {
  const theme = useTheme();
  const formContext = useFormContext();
  const control = externalControl || formContext?.control;
  const errors = externalControl ? {} : formContext?.formState?.errors;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type="text"
          label={label}
          placeholder="Enter 6-digit code"
          disabled={disabled}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          inputProps={{
            maxLength: 6,
            pattern: "[0-9]*",
            inputMode: "numeric",
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              fontSize: "1.5rem",
              textAlign: "center",
              letterSpacing: "0.5em",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: 2,
              },
            },
          }}
          {...props}
        />
      )}
    />
  );
}

