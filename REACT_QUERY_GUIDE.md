# 📚 React Query Guide - دليل استخدام React Query

## Table of Contents | جدول المحتويات

- [Introduction | المقدمة](#introduction)
- [Architecture | البنية](#architecture)
- [Getting Started | البدء](#getting-started)
- [Usage Examples | أمثلة الاستخدام](#usage-examples)
- [Best Practices | أفضل الممارسات](#best-practices)

---

## Introduction | المقدمة

This project uses **React Query (TanStack Query)** for data fetching and state management. React Query provides powerful features like caching, automatic refetching, and error handling.

هذا المشروع يستخدم **React Query** لإدارة جلب البيانات والحالة. يوفر React Query ميزات قوية مثل التخزين المؤقت، وإعادة الجلب التلقائية، ومعالجة الأخطاء.

---

## Architecture | البنية

### File Structure | هيكل الملفات

```
src/
├── lib/
│   ├── axios/
│   │   ├── baseAxios.js          # Axios instance with interceptors
│   │   └── index.js
│   └── react-query/
│       ├── reactQueryClient.js   # Query client configuration
│       └── hooks/
│           ├── useApiQuery.js    # Hook for GET requests
│           ├── useApiMutation.js # Hook for POST/PUT/DELETE
│           └── index.js
├── repositories/
│   ├── base.repository.js        # Base repository class
│   ├── user.repository.js        # User-specific repository
│   └── index.js
└── hooks/
    └── api/
        └── useUsers.js           # Custom hooks for users API
```

### Design Patterns Used | أنماط التصميم المستخدمة

1. **Repository Pattern**: Centralizes API calls in repository classes
2. **Custom Hooks Pattern**: Encapsulates React Query logic in reusable hooks
3. **Interceptor Pattern**: Automatically injects token and language in requests

---

## Getting Started | البدء

### 1. Basic Setup | الإعداد الأساسي

The React Query provider is already set up in `AppProviders.jsx`. The `baseAxios` instance automatically:
- ✅ Injects `Authorization` token from Redux (if exists)
- ✅ Injects `Accept-Language` header from Redux
- ✅ Shows success/error toast messages
- ✅ Handles 401 unauthorized errors

تم إعداد React Query في `AppProviders.jsx`. قاعدة Axios تقوم تلقائياً بـ:
- ✅ حقن `Authorization` token من Redux (إن وجد)
- ✅ حقن `Accept-Language` من Redux
- ✅ عرض رسائل النجاح/الخطأ
- ✅ معالجة أخطاء 401

### 2. Environment Variables | المتغيرات البيئية

Create `.env` file in root:

```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

---

## Usage Examples | أمثلة الاستخدام

### GET Request | طلب جلب البيانات

#### Example 1: Fetch All Users | جلب جميع المستخدمين

```jsx
import { useUsers } from "@/hooks/api/useUsers";

function UsersList() {
  const { data, isLoading, error, refetch } = useUsers(
    { page: 1, limit: 10 }, // Query params
    { enabled: true } // React Query options
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}
```

#### Example 2: Fetch Single User | جلب مستخدم واحد

```jsx
import { useUser } from "@/hooks/api/useUsers";

function UserProfile({ userId }) {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;

  return <div>{user?.name}</div>;
}
```

#### Example 3: Custom GET Query | استعلام مخصص

```jsx
import { useApiQuery } from "@/lib/react-query/hooks";

function CustomData() {
  const { data, isLoading } = useApiQuery(
    ["custom", "data"], // Query key
    "/custom-endpoint", // URL
    { enabled: true }, // Options
    { params: { filter: "active" } } // Axios config
  );

  return <div>{/* Your component */}</div>;
}
```

### POST Request | طلب إضافة بيانات

#### Example 1: Create User | إضافة مستخدم

```jsx
import { useCreateUser } from "@/hooks/api/useUsers";

function CreateUserForm() {
  const createUser = useCreateUser({
    onSuccess: (data) => {
      console.log("User created:", data);
      // Navigate or show success message
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser.mutate({
      name: "John Doe",
      email: "john@example.com",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
```

### PUT Request | طلب تحديث بيانات

#### Example 1: Update User | تحديث مستخدم

```jsx
import { useUpdateUser } from "@/hooks/api/useUsers";

function UpdateUserForm({ user }) {
  const updateUser = useUpdateUser({
    onSuccess: () => {
      console.log("User updated successfully");
    },
  });

  const handleSubmit = (data) => {
    updateUser.mutate({
      id: user.id,
      ...data,
    });
  };

  return (
    <button
      onClick={() => handleSubmit({ name: "New Name" })}
      disabled={updateUser.isPending}
    >
      {updateUser.isPending ? "Updating..." : "Update"}
    </button>
  );
}
```

### DELETE Request | طلب حذف بيانات

```jsx
import { useDeleteUser } from "@/hooks/api/useUsers";

function DeleteUserButton({ userId }) {
  const deleteUser = useDeleteUser({
    onSuccess: () => {
      console.log("User deleted");
    },
  });

  return (
    <button
      onClick={() => deleteUser.mutate(userId)}
      disabled={deleteUser.isPending}
    >
      {deleteUser.isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
```

---

## Advanced Usage | الاستخدام المتقدم

### 1. Disable Toast Messages | تعطيل رسائل Toast

Sometimes you don't want to show toast messages:

```jsx
// For queries
const { data } = useApiQuery(
  ["users"],
  "users",
  { showToast: false } // Disable toast
);

// For mutations
const createUser = useApiMutation("POST", "users", {
  showToast: false, // Disable toast
});
```

### 2. Conditional Fetching | الجلب الشرطي

```jsx
const { data } = useUsers(
  {},
  {
    enabled: !!userId && isAuthenticated, // Only fetch if conditions are met
  }
);
```

### 3. Custom Query Keys | مفاتيح استعلام مخصصة

Query keys should be unique and include all dependencies:

```jsx
// Good ✅
useApiQuery(["users", { page: 1, filter: "active" }], "users");

// Bad ❌
useApiQuery(["users"], "users"); // Missing params in key
```

### 4. Manual Cache Invalidation | إبطال التخزين المؤقت يدوياً

```jsx
import { useQueryClient } from "@tanstack/react-query";

function MyComponent() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    // Invalidate specific query
    queryClient.invalidateQueries({ queryKey: ["users"] });

    // Invalidate all queries
    queryClient.invalidateQueries();
  };

  return <button onClick={handleRefresh}>Refresh All</button>;
}
```

### 5. Optimistic Updates | التحديثات التفاؤلية

```jsx
const updateUser = useApiMutation("PUT", (data) => `users/${data.id}`, {
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ["users"] });

    // Snapshot previous value
    const previousUsers = queryClient.getQueryData(["users"]);

    // Optimistically update
    queryClient.setQueryData(["users"], (old) =>
      old.map((user) => (user.id === newData.id ? { ...user, ...newData } : user))
    );

    return { previousUsers };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(["users"], context.previousUsers);
  },
  onSettled: () => {
    // Refetch to ensure consistency
    queryClient.invalidateQueries({ queryKey: ["users"] });
  },
});
```

---

## Creating New API Hooks | إنشاء Hooks جديدة

### Step 1: Create Repository | إنشاء Repository

```jsx
// src/repositories/product.repository.js
import { BaseRepository } from "./base.repository";

export class ProductRepository extends BaseRepository {
  constructor() {
    super("products"); // endpoint: /products
  }

  // Custom methods
  async getByCategory(categoryId) {
    return this.getAll({ category: categoryId });
  }
}
```

### Step 2: Create Hooks | إنشاء Hooks

```jsx
// src/hooks/api/useProducts.js
import { useApiQuery, useApiMutation } from "@/lib/react-query/hooks";

export const useProducts = (params = {}, options = {}) => {
  return useApiQuery(
    ["products", params],
    "products",
    options,
    { params }
  );
};

export const useProduct = (id, options = {}) => {
  return useApiQuery(
    ["products", id],
    `products/${id}`,
    { enabled: !!id, ...options }
  );
};

export const useCreateProduct = (options = {}) => {
  return useApiMutation("POST", "products", {
    invalidateQueries: ["products"],
    ...options,
  });
};

export const useUpdateProduct = (options = {}) => {
  return useApiMutation(
    "PUT",
    (data) => `products/${data.id}`,
    {
      invalidateQueries: ["products"],
      ...options,
    }
  );
};

export const useDeleteProduct = (options = {}) => {
  return useApiMutation(
    "DELETE",
    (id) => `products/${id}`,
    {
      invalidateQueries: ["products"],
      ...options,
    }
  );
};
```

### Step 3: Use in Components | الاستخدام في المكونات

```jsx
import { useProducts, useCreateProduct } from "@/hooks/api/useProducts";

function ProductsPage() {
  const { data, isLoading } = useProducts();
  const createProduct = useCreateProduct();

  // ... your component code
}
```

---

## Best Practices | أفضل الممارسات

### ✅ DO | افعل

1. **Use meaningful query keys** | استخدم مفاتيح استعلام واضحة
   ```jsx
   ["users", { page: 1 }] // ✅ Good
   ["data"] // ❌ Too generic
   ```

2. **Invalidate queries after mutations** | أبطِل الاستعلامات بعد التحولات
   ```jsx
   useApiMutation("POST", "users", {
     invalidateQueries: ["users"], // ✅ Refresh list after create
   });
   ```

3. **Handle loading and error states** | تعامل مع حالات التحميل والخطأ
   ```jsx
   if (isLoading) return <Spinner />;
   if (error) return <ErrorMessage error={error} />;
   ```

4. **Use `enabled` for conditional fetching** | استخدم `enabled` للجلب الشرطي
   ```jsx
   useApiQuery(["user", id], `users/${id}`, {
     enabled: !!id, // Only fetch if ID exists
   });
   ```

### ❌ DON'T | لا تفعل

1. **Don't fetch in loops** | لا تجلب في الحلقات
   ```jsx
   // ❌ Bad
   users.map((user) => {
     const { data } = useUser(user.id); // Don't do this!
   });
   ```

2. **Don't mutate query keys directly** | لا تعدل مفاتيح الاستعلام مباشرة
   ```jsx
   // ❌ Bad
   queryClient.setQueryData(["users"], newData);
   // Use optimistic updates pattern instead
   ```

3. **Don't ignore errors** | لا تتجاهل الأخطاء
   ```jsx
   // ❌ Bad
   const { data } = useUsers(); // Error handling is missing
   ```

---

## Common Patterns | الأنماط الشائعة

### Pattern 1: List with Pagination | قائمة مع التصفح

```jsx
function UsersList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUsers({ page, limit: 10 });

  return (
    <div>
      {data?.users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <Pagination page={page} onChange={setPage} />
    </div>
  );
}
```

### Pattern 2: Form with Mutation | نموذج مع تحول

```jsx
function UserForm() {
  const createUser = useCreateUser({
    onSuccess: () => {
      navigate("/users");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        createUser.mutate(Object.fromEntries(formData));
      }}
    >
      {/* form fields */}
    </form>
  );
}
```

### Pattern 3: Dependent Queries | استعلامات تابعة

```jsx
function UserProfile({ userId }) {
  // Fetch user first
  const { data: user } = useUser(userId);

  // Then fetch user's orders
  const { data: orders } = useApiQuery(
    ["orders", userId],
    `users/${userId}/orders`,
    {
      enabled: !!user, // Only fetch if user exists
    }
  );

  return <div>{/* render */}</div>;
}
```

---

## Troubleshooting | حل المشاكل

### Issue: Query not refetching | الاستعلام لا يعيد الجلب

**Solution**: Check if `enabled` option is `true` and query key hasn't changed.

### Issue: Stale data | بيانات قديمة

**Solution**: Use `invalidateQueries` after mutations or adjust `staleTime`.

### Issue: Too many requests | طلبات كثيرة

**Solution**: Check query keys are stable and use `enabled` option properly.

---

## Resources | المصادر

- [React Query Documentation](https://tanstack.com/query/latest)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
- [Axios Documentation](https://axios-http.com/)

---

## Summary | الملخص

This architecture provides:

- ✅ **Clean separation of concerns** | فصل واضح للمسؤوليات
- ✅ **Reusable code** | كود قابل لإعادة الاستخدام
- ✅ **Type safety** (when using TypeScript) | أمان الأنواع
- ✅ **Automatic caching** | تخزين مؤقت تلقائي
- ✅ **Error handling** | معالجة الأخطاء
- ✅ **Toast notifications** | إشعارات Toast

Happy coding! 🚀

