import { useApiQuery, useApiMutation } from "@/lib/react-query/hooks";

/**
 * Hook to fetch all notifications
 */
export const useNotifications = (params = {}, options = {}) => {
  return useApiQuery(
    ["notifications", params],
    "notifications",
    {
      ...options,
    },
    {
      params,
    }
  );
};

/**
 * Hook to fetch unread notifications count
 */
export const useUnreadNotificationsCount = (options = {}) => {
  return useApiQuery(
    ["notifications", "unread-count"],
    "notifications/unread-count",
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      ...options,
    }
  );
};

/**
 * Hook to mark all notifications as read
 */
export const useMarkAllNotificationsAsRead = (options = {}) => {
  return useApiMutation("POST", "notifications/read", {
    invalidateQueries: ["notifications"],
    ...options,
  });
};

export default {
  useNotifications,
  useUnreadNotificationsCount,
  useMarkAllNotificationsAsRead,
};

