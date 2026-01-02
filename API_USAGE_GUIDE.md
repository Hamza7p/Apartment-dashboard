# API Usage Guide - دليل استخدام APIs

## Overview | نظرة عامة

This guide explains how to use all the API hooks and repositories in the project.

## Available APIs | APIs المتاحة

### 1. Notifications | الإشعارات

#### Get All Notifications
```jsx
import { useNotifications } from "@/hooks/api/useNotifications";

function NotificationsList() {
  const { data, isLoading } = useNotifications({
    page: 1,
    perPage: 10,
  });

  return (
    <div>
      {data?.notifications?.map((notification) => (
        <div key={notification.id}>{notification.message}</div>
      ))}
    </div>
  );
}
```

#### Get Unread Count
```jsx
import { useUnreadNotificationsCount } from "@/hooks/api/useNotifications";

function NotificationBadge() {
  const { data } = useUnreadNotificationsCount();
  
  return <Badge badgeContent={data?.count || 0}>Notifications</Badge>;
}
```

#### Mark All as Read
```jsx
import { useMarkAllNotificationsAsRead } from "@/hooks/api/useNotifications";

function MarkAllReadButton() {
  const markAllRead = useMarkAllNotificationsAsRead({
    onSuccess: () => {
      console.log("All notifications marked as read");
    },
  });

  return (
    <button onClick={() => markAllRead.mutate()}>
      Mark All as Read
    </button>
  );
}
```

---

### 2. Profile | الملف الشخصي

#### Get Current User Profile
```jsx
import { useProfile } from "@/hooks/api/useProfile";

function ProfilePage() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile?.name}</h1>
      <p>{profile?.email}</p>
    </div>
  );
}
```

#### Update Profile
```jsx
import { useUpdateProfile } from "@/hooks/api/useProfile";

function UpdateProfileForm() {
  const updateProfile = useUpdateProfile({
    onSuccess: (data) => {
      console.log("Profile updated:", data);
    },
  });

  const handleSubmit = (formData) => {
    updateProfile.mutate({
      name: formData.name,
      email: formData.email,
      // ... other fields
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

### 3. System Data (Dashboard) | بيانات النظام

#### Get System Data
```jsx
import { useSystemData } from "@/hooks/api/useSystem";

function Dashboard() {
  const { data, isLoading } = useSystemData();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>Users: {data?.users_count}</div>
      <div>Apartments: {data?.apartments_count}</div>
      <div>Reservations: {data?.reservations_count}</div>
    </div>
  );
}
```

---

### 4. Media Upload | رفع الملفات

#### Upload File
```jsx
import { useUploadMedia } from "@/hooks/api/useMedia";

function ImageUpload() {
  const uploadMedia = useUploadMedia({
    onSuccess: (data) => {
      console.log("File uploaded:", data.url);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadMedia.mutate(file);
    }
  };

  return (
    <input
      type="file"
      onChange={handleFileChange}
      disabled={uploadMedia.isPending}
    />
  );
}
```

#### Get Media List
```jsx
import { useMedia } from "@/hooks/api/useMedia";

function MediaLibrary() {
  const { data, isLoading } = useMedia({ page: 1, perPage: 20 });

  return (
    <div>
      {data?.media?.map((item) => (
        <img key={item.id} src={item.url} alt={item.name} />
      ))}
    </div>
  );
}
```

---

### 5. Users with Filters, Orders, Pagination | المستخدمون مع الفلاتر والترتيب والتصفح

#### Get Users with Filters
```jsx
import { useUsers } from "@/hooks/api/useUsers";

function UsersList() {
  const [page, setPage] = useState(1);
  
  const { data, isLoading } = useUsers(
    {
      // Filters
      filters: [
        { name: "status", operation: "eq", value: "active" },
        { name: "role", operation: "eq", value: "admin" },
      ],
      // Orders
      orders: [
        { name: "created_at", direction: "desc" },
      ],
      // Pagination
      page: page,
      perPage: 10,
    },
    {
      // React Query options
      enabled: true,
    }
  );

  return (
    <div>
      {data?.users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <Pagination page={page} onChange={setPage} />
    </div>
  );
}
```

#### Filter Operations | عمليات التصفية

Available filter operations:
- `eq` - Equals
- `ne` - Not equals
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal
- `like` - Like (for text search)
- `in` - In array

Example:
```jsx
const { data } = useUsers({
  filters: [
    { name: "name", operation: "like", value: "john" },
    { name: "age", operation: "gte", value: 18 },
    { name: "role", operation: "in", value: ["admin", "user"] },
  ],
});
```

#### Ordering | الترتيب

```jsx
const { data } = useUsers({
  orders: [
    { name: "name", direction: "asc" },
    { name: "created_at", direction: "desc" },
  ],
});
```

#### Pagination | التصفح

```jsx
const { data } = useUsers({
  page: 1,
  perPage: 20,
});
```

---

## Complete Example | مثال كامل

```jsx
import { useState } from "react";
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "@/hooks/api/useUsers";

function UsersManagementPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [sortBy, setSortBy] = useState({ name: "created_at", direction: "desc" });

  // Fetch users with filters, orders, and pagination
  const { data, isLoading, refetch } = useUsers({
    filters,
    orders: [sortBy],
    page,
    perPage: 10,
  });

  // Create user
  const createUser = useCreateUser({
    onSuccess: () => {
      refetch();
    },
  });

  // Update user
  const updateUser = useUpdateUser({
    onSuccess: () => {
      refetch();
    },
  });

  // Delete user
  const deleteUser = useDeleteUser({
    onSuccess: () => {
      refetch();
    },
  });

  const handleFilter = (column, value) => {
    setFilters([
      { name: column, operation: "eq", value },
    ]);
    setPage(1); // Reset to first page
  };

  const handleSort = (column) => {
    setSortBy({
      name: column,
      direction: sortBy.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div>
      {/* Filters */}
      <div>
        <input
          placeholder="Filter by name"
          onChange={(e) => handleFilter("name", e.target.value)}
        />
      </div>

      {/* Sort */}
      <button onClick={() => handleSort("name")}>
        Sort by Name ({sortBy.direction})
      </button>

      {/* Users List */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data?.users?.map((user) => (
            <div key={user.id}>
              <span>{user.name}</span>
              <button onClick={() => updateUser.mutate({ id: user.id, name: "New Name" })}>
                Edit
              </button>
              <button onClick={() => deleteUser.mutate(user.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={!data?.hasMore}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

---

## Best Practices | أفضل الممارسات

1. **Always handle loading and error states**
   ```jsx
   const { data, isLoading, error } = useUsers();
   if (isLoading) return <Spinner />;
   if (error) return <ErrorMessage />;
   ```

2. **Use query keys properly for caching**
   - Include all relevant parameters in query keys
   - Example: `["users", { page: 1, filters: [...] }]`

3. **Invalidate queries after mutations**
   - Most hooks already do this automatically
   - Manual invalidation: `queryClient.invalidateQueries(["users"])`

4. **Handle pagination properly**
   - Reset to page 1 when filters change
   - Check `hasMore` or `totalPages` before enabling "Next" button

5. **Optimize filters**
   - Don't send empty filters
   - Combine multiple filters when possible

---

## API Endpoints Reference | مرجع نقاط API

### Notifications
- `GET /notifications` - Get all notifications
- `GET /notifications/unread-count` - Get unread count
- `POST /notifications/read` - Mark all as read

### Profile
- `GET /auth/me` - Get current user profile
- `POST /auth/update-profile` - Update profile

### System
- `GET /system-data` - Get system statistics

### Media
- `GET /media` - Get media list
- `POST /media` - Upload file (multipart/form-data)

### Users
- `GET /users` - Get users (with filters, orders, pagination)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

---

Happy coding! 🚀

