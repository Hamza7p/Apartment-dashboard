import { useApiQuery, useApiMutation } from "@/lib/react-query/hooks";
import { buildQueryParams } from "@/lib/axios/buildQueryParams";

/**
 * Hook to fetch all users with filters, orders, and pagination
 * @param {object} queryOptions - Query options
 * @param {array} queryOptions.filters - Array of filter objects: [{name: 'column', operation: 'eq', value: 'value'}]
 * @param {array} queryOptions.orders - Array of order objects: [{name: 'column', direction: 'asc'|'desc'}]
 * @param {number} queryOptions.page - Page number
 * @param {number} queryOptions.perPage - Items per page
 * @param {object} options - React Query options
 */
export const useUsers = (queryOptions = {}, options = {}) => {
  const params = buildQueryParams(queryOptions);
  
  return useApiQuery(
    ["users", params], // Query key includes params for caching
    "users",
    {
      ...options,
    },
    {
      params,
    }
  );
};

/**
 * Hook to fetch single user by ID
 */
export const useUser = (id, options = {}) => {
  return useApiQuery(
    ["users", id],
    `users/${id}`,
    {
      enabled: !!id, // Only fetch if ID exists
      ...options,
    }
  );
};

/**
 * Hook to create a new user
 */
export const useCreateUser = (options = {}) => {
  return useApiMutation("POST", "users", {
    invalidateQueries: ["users"], // Refresh users list after creation
    ...options,
  });
};

/**
 * Hook to update a user
 */
export const useUpdateUser = (options = {}) => {
  return useApiMutation(
    "PUT",
    (data) => `users/${data.id}`, // Dynamic URL based on data
    {
      invalidateQueries: ["users"],
      ...options,
    }
  );
};

/**
 * Hook to delete a user
 */
export const useDeleteUser = (options = {}) => {
  return useApiMutation(
    "DELETE",
    (id) => `users/${id}`,
    {
      invalidateQueries: ["users"],
      ...options,
    }
  );
};

export default {
  useUsers,
  useUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
};

