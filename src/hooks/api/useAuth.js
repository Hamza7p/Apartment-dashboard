import { useApiMutation } from "@/lib/react-query/hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setCredentials } from "@/store/auth/authSlice";
import { toast } from "react-toastify";

/**
 * Hook to handle login mutation
 */
export const useLogin = (options = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useApiMutation("POST", "auth/login", {
    ...options,
    onSuccess: (data) => {
      // Save token and userInfo to Redux
      const { token, user } = data;
      dispatch(
        setCredentials({
          token,
          userInfo: user,
        })
      );

      toast.success(data?.message || "Login successful!", {
        className: "font",
      });

      // Navigate to dashboard
      navigate("/", { replace: true });

      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
  });
};

/**
 * Hook to send OTP
 */
export const useSendOTP = (options = {}) => {
  return useApiMutation("POST", "auth/send-otp", {
    ...options,
    onSuccess: (data) => {
      toast.success(data?.message || "OTP sent successfully!", {
        className: "font",
      });

      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
  });
};

/**
 * Hook to verify OTP
 */
export const useVerifyOTP = (options = {}) => {
  return useApiMutation("POST", "auth/verify-otp", {
    ...options,
    onSuccess: (data) => {
      toast.success(data?.message || "OTP verified successfully!", {
        className: "font",
      });

      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
  });
};

/**
 * Hook to reset password
 */
export const useResetPassword = (options = {}) => {
  const navigate = useNavigate();

  return useApiMutation("POST", "auth/reset-password", {
    ...options,
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset successfully!", {
        className: "font",
      });

      // Navigate to login after successful reset
      setTimeout(() => {
        navigate("/auth/login", { replace: true });
      }, 1500);

      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
  });
};

export default {
  useLogin,
  useSendOTP,
  useVerifyOTP,
  useResetPassword,
};


