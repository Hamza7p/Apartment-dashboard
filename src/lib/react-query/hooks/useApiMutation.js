import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseAxios } from "@/lib/axios";

/**
 * Custom hook for POST/PUT/DELETE requests with React Query
 * 
 * @param {string} method - HTTP method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
 * @param {string} url - API endpoint URL (can be a function for dynamic URLs)
 * @param {object} options - Mutation options
 * 
 * @example
 * const createUser = useApiMutation('POST', '/users', {
 *   onSuccess: (data) => {
 *     queryClient.invalidateQueries(['users']);
 *   }
 * });
 * 
 * createUser.mutate({ name: 'John', email: 'john@example.com' });
 */
export const useApiMutation = (method, url, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const endpoint = typeof url === "function" ? url(data) : url;
      const config = {
        showToast: options.showToast !== false, // Allow disabling toast per mutation
        ...options.axiosConfig,
      };

      switch (method.toUpperCase()) {
        case "POST":
          return baseAxios.post(endpoint, data, config).then((res) => res.data || res);
        case "PUT":
          return baseAxios.put(endpoint, data, config).then((res) => res.data || res);
        case "PATCH":
          return baseAxios.patch(endpoint, data, config).then((res) => res.data || res);
        case "DELETE":
          return baseAxios.delete(endpoint, config).then((res) => res.data || res);
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
    },
    ...options,
    onSuccess: (response, variables, context) => {
      // Invalidate related queries if specified
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({
          queryKey: Array.isArray(options.invalidateQueries)
            ? options.invalidateQueries
            : [options.invalidateQueries],
        });
      }
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(response?.data || response, variables, context);
      }
    },
  });
};

export default useApiMutation;

