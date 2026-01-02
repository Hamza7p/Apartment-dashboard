import { useApiQuery } from "@/lib/react-query/hooks";

/**
 * Hook to fetch system data (dashboard stats)
 */
export const useSystemData = (options = {}) => {
  return useApiQuery(
    ["system-data"],
    "system-data",
    {
      ...options,
    }
  );
};

export default {
  useSystemData,
};

