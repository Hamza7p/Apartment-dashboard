import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

/**
 * Default query options
 */
const defaultQueryOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  },
  mutations: {
    retry: false,
  },
};

/**
 * Create and configure React Query client
 */
export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});

/**
 * Global error handler for React Query
 */
queryClient.setMutationDefaults(["mutations"], {
  onError: (error) => {
    // Global error handling if needed
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred";

    // Toast is already handled by axios interceptor
    // But you can add additional handling here if needed
    console.error("Mutation error:", errorMessage);
  },
});

export default queryClient;

