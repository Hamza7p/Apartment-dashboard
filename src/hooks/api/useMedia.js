import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseAxios } from "@/lib/axios";

/**
 * Hook to fetch media list
 */
export const useMedia = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ["media", params],
    queryFn: async () => {
      const response = await baseAxios.get("media", {
        params,
      });
      return response.data;
    },
    ...options,
  });
};

/**
 * Hook to upload media file
 */
export const useUploadMedia = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await baseAxios.post("media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        showToast: options.showToast !== false,
      });
      return response.data || response;
    },
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate media queries
      queryClient.invalidateQueries({ queryKey: ["media"] });

      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

export default {
  useMedia,
  useUploadMedia,
};
