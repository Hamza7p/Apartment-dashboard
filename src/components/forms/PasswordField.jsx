import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";

/**
 * PasswordField Component - Password input with show/hide toggle
 */
export default function PasswordField({
  name,
  label,
  autoComplete = "current-password",
  placeholder,
  disabled = false,
  control: externalControl,
  ...props
}) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const formContext = useFormContext();
  const control = externalControl || formContext?.control;
  const errors = externalControl ? {} : formContext?.formState?.errors || {};

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type={showPassword ? "text" : "password"}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  aria-label="toggle password visibility"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...props}
        />
      )}
    />
  );
}

