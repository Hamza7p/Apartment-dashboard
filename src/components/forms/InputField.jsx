import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { useTheme } from "@mui/material/styles";

/**
 * InputField Component - Reusable text input with validation
 */
export default function InputField({
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  disabled = false,
  control: externalControl,
  ...props
}) {
  const theme = useTheme();
  const formContext = useFormContext();
  const control = externalControl || formContext?.control;
  const errors = externalControl ? {} : formContext?.formState?.errors || {};

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          label={label}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
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

