/**
 * Example: How to use React Query hooks in a component
 * This is a reference file showing best practices
 */

import { useState } from "react";
import {
  useUsers,
  useUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks/api/useUsers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

/**
 * Example 1: Fetch and display list of users
 */
export function UsersListExample() {
  const [page, setPage] = useState(1);
  
  // Fetch users with pagination
  const { data, isLoading, error, refetch } = useUsers(
    { page, limit: 10 }, // Query params
    {
      // React Query options
      enabled: true, // Control when to fetch
      refetchOnWindowFocus: false, // Don't refetch on window focus
    }
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error: {error.message}</Typography>
        <Button onClick={() => refetch()}>Retry</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5">Users List</Typography>
      {data?.users?.map((user) => (
        <Box key={user.id} p={2}>
          {user.name} - {user.email}
        </Box>
      ))}
      <Button onClick={() => refetch()}>Refresh</Button>
    </Box>
  );
}

/**
 * Example 2: Fetch single user
 */
export function UserProfileExample({ userId }) {
  const { data: user, isLoading, error } = useUser(userId, {
    enabled: !!userId, // Only fetch if userId exists
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading user</Typography>;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Box>
      <Typography variant="h5">{user.name}</Typography>
      <Typography>{user.email}</Typography>
    </Box>
  );
}

/**
 * Example 3: Create new user with form
 */
export function CreateUserExample() {
  const createUser = useCreateUser({
    onSuccess: (data) => {
      console.log("User created successfully:", data);
      // You can navigate, show success message, etc.
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
      // Error toast is already shown by interceptor
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    createUser.mutate({
      name: formData.get("name"),
      email: formData.get("email"),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <Button
        type="submit"
        variant="contained"
        disabled={createUser.isPending}
      >
        {createUser.isPending ? "Creating..." : "Create User"}
      </Button>
    </Box>
  );
}

/**
 * Example 4: Update user
 */
export function UpdateUserExample({ user }) {
  const updateUser = useUpdateUser({
    onSuccess: () => {
      console.log("User updated successfully");
      // List will automatically refresh because of invalidateQueries
    },
  });

  const handleUpdate = () => {
    updateUser.mutate({
      id: user.id,
      name: "Updated Name",
      email: user.email,
    });
  };

  return (
    <Button
      onClick={handleUpdate}
      disabled={updateUser.isPending}
      variant="contained"
    >
      {updateUser.isPending ? "Updating..." : "Update User"}
    </Button>
  );
}

/**
 * Example 5: Delete user
 */
export function DeleteUserExample({ userId }) {
  const deleteUser = useDeleteUser({
    onSuccess: () => {
      console.log("User deleted successfully");
      // List will automatically refresh
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser.mutate(userId);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={deleteUser.isPending}
      color="error"
      variant="contained"
    >
      {deleteUser.isPending ? "Deleting..." : "Delete User"}
    </Button>
  );
}

/**
 * Example 6: Complete CRUD example
 */
export function CompleteUsersPageExample() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data, isLoading } = useUsers();
  const { data: selectedUser } = useUser(selectedUserId, {
    enabled: !!selectedUserId,
  });
  const createUser = useCreateUser({
    onSuccess: () => {
      setShowCreateForm(false);
    },
  });
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  return (
    <Box>
      <Typography variant="h4">Users Management</Typography>

      {/* Create Form */}
      {showCreateForm && (
        <Box component="form" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          createUser.mutate({
            name: formData.get("name"),
            email: formData.get("email"),
          });
        }}>
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <Button type="submit" disabled={createUser.isPending}>
            Create
          </Button>
          <Button onClick={() => setShowCreateForm(false)}>Cancel</Button>
        </Box>
      )}

      {/* Users List */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Button onClick={() => setShowCreateForm(true)}>Add User</Button>
          {data?.users?.map((user) => (
            <Box key={user.id} display="flex" gap={2} p={2}>
              <Typography>{user.name}</Typography>
              <Button onClick={() => setSelectedUserId(user.id)}>View</Button>
              <Button onClick={() => {
                updateUser.mutate({
                  id: user.id,
                  name: user.name,
                  email: user.email,
                });
              }}>
                Edit
              </Button>
              <Button
                color="error"
                onClick={() => {
                  if (window.confirm("Delete?")) {
                    deleteUser.mutate(user.id);
                  }
                }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      )}

      {/* User Details */}
      {selectedUser && (
        <Box mt={3}>
          <Typography variant="h6">User Details</Typography>
          <Typography>Name: {selectedUser.name}</Typography>
          <Typography>Email: {selectedUser.email}</Typography>
          <Button onClick={() => setSelectedUserId(null)}>Close</Button>
        </Box>
      )}
    </Box>
  );
}

