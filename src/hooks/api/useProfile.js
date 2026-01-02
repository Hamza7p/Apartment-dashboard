import { useApiQuery, useApiMutation } from "@/lib/react-query/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/store/auth/authSlice";
import { selectToken } from "@/store/auth/selectors";

/**
 * Hook to fetch current user profile
 */
export const useProfile = (options = {}) => {
  return useApiQuery(
    ["profile", "me"],
    "auth/me",
    {
      ...options,
    }
  );
};

/**
 * Hook to update user profile
 */
export const useUpdateProfile = (options = {}) => {
  const dispatch = useDispatch();
  const currentToken = useSelector(selectToken);

  return useApiMutation("POST", "auth/update-profile", {
    invalidateQueries: ["profile"],
    onSuccess: (data, variables, context) => {
      // Update Redux store if user info is returned
      if (data?.user && currentToken) {
        dispatch(
          setCredentials({
            token: currentToken,
            userInfo: data.user,
          })
        );
      }

      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};

export default {
  useProfile,
  useUpdateProfile,
};

