import { useQuery } from "@tanstack/react-query";
import { baseAxios } from "@/lib/axios";

/**
 * Custom hook for GET requests with React Query
 * 
 * @param {string} queryKey - Unique key for caching
 * @param {string} url - API endpoint URL
 * @param {object} options - Additional React Query options
 * @param {object} axiosConfig - Additional Axios config (params, headers, etc.)
 * 
 * @example
 * const { data, isLoading, error, refetch } = useApiQuery(
 *   ['users'],
 *   '/users',
 *   { enabled: true },
 *   { params: { page: 1 } }
 * );
 */
export const useApiQuery = (
  queryKey,
  url,
  queryOptions = {},
  axiosConfig = {}
) => {
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      const response = await baseAxios.get(url, {
        ...axiosConfig,
        showToast: queryOptions.showToast !== false, // Allow disabling toast per query
      });
      return response.data;
    },
    ...queryOptions,
  });
};

export default useApiQuery;

