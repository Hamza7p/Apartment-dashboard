import DataTable from "@/components/layouts/DataTable";
import { UserStatus } from "@/enums/UserStatus";
import { USER_STATUS_MAP } from "@/utils/UserStatus.helper";
import {
  Close,
  Done,
  RemoveRedEyeOutlined,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Chip, Avatar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useUpdateUser, useDeleteUser } from "@/hooks/api/useUsers";

const UsersTable = ({ users, loading = false, error, onPageChange, highlightUserId }) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const updateUser = useUpdateUser({
    onSuccess: () => {
      // Query will be invalidated automatically
    },
  });

  const deleteUser = useDeleteUser({
    onSuccess: () => {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      // Query will be invalidated automatically
    },
  });

  /** ✅ فصل البيانات */
  const rows = users?.data ?? [];

  const pagination = {
    page: users?.page ?? 0,
    pageSize: users?.perPage ?? 10,
    total: users?.total ?? 0,
  };

  const handleUpdateStatus = (id, status) => {
    updateUser.mutate({ id, status });
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete?.id) {
      deleteUser.mutate(userToDelete.id);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  // Get row className to highlight specific user
  const getRowClassName = (params) => {
    if (highlightUserId && params.row.id === highlightUserId) {
      return "highlighted";
    }
    return "";
  };

  const columns = [
    { field: "id", headerName: t("users.id"), width: 70 },

    {
      field: "personal_photo",
      headerName: t("users.photo"),
      width: 100,
      renderCell: ({ row }) => (
        <Avatar
          src={row.personal_photo?.url || "/assets/images/user.png"}
          sx={{ width: 45, height: 45 }}
        />
      ),
    },

    { field: "first_name", headerName: t("users.first_name"), width: 180 },
    { field: "last_name", headerName: t("users.last_name"), width: 180 },
    { field: "phone", headerName: t("users.phone"), width: 220 },
    {
      field: "role",
      headerName: t("users.role"),
      width: 150,
      renderCell: ({ value }) => {
        const isAdmin = value === "admin";
        return (
          <Chip
            label={isAdmin ? t("users.admin") : t("users.user")}
            color={isAdmin ? "info" : "default"}
            variant="outlined"
            size="large"
            p={2}
          />
        );
      },
    },

    {
      field: "status",
      headerName: t("users.status"),
      width: 160,
      renderCell: ({ value }) => {
        const status = USER_STATUS_MAP[value];
        if (!status) return null;

        return (
          <Chip
            icon={status.icon}
            label={status.label}
            color={status.color}
            variant="filled"
            size="small"
          />
        );
      },
    },

    {
      field: "actions",
      headerName: t("users.actions"),
      type: "actions",
      flex: 1,
      minWidth: 200,
      getActions: (params) => [
        <GridActionsCellItem
          key="reject"
          icon={<Close color="error" sx={{ fontSize: '28px', padding: '3px', border: '1px solid red', borderRadius: '50%' }}/>}
          label="Reject"
          onClick={() =>
            handleUpdateStatus(params.row.id, UserStatus.rejected)
          }
          disabled={updateUser.isPending}
        />,
        <GridActionsCellItem
          key="approve"
          icon={<Done color="success" sx={{ fontSize: '28px', p: '3px', border: '1px solid green', borderRadius: '50%' }} />}
          label="Approve"
          onClick={() =>
            handleUpdateStatus(params.row.id, UserStatus.approved)
          }
          disabled={updateUser.isPending}
        />,
        <GridActionsCellItem
          key="view"
          icon={<RemoveRedEyeOutlined  sx={{ fontSize: '28px', padding: '3px', border: '1px solid silver', borderRadius: '50%' }} />}
          label="Show"
          onClick={() => navigate(`/users/${params.row.id}`)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon color="error" sx={{ fontSize: '28px', padding: '3px', border: '1px solid red', borderRadius: '50%' }} />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row)}
          disabled={deleteUser.isPending}
        />,
      ],
    },
  ];

  const isNetworkError =
    error &&
    (!error.response ||
      error.code === "ERR_NETWORK" ||
      error.message === "Network Error" ||
      error.message?.includes("timeout"));

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {isNetworkError
          ? t("users.networkError") || "Network error. Please check your connection."
          : error?.response?.data?.message ||
            error?.message ||
            t("users.errorLoadingUsers") ||
            "Error loading users"}
      </Alert>
    );
  }

  // Scroll to highlighted user when data is loaded
  const tableRef = useRef(null);
  useEffect(() => {
    if (highlightUserId && rows.length > 0 && !loading) {
      // Find the row index
      const rowIndex = rows.findIndex((row) => row.id === highlightUserId);
      if (rowIndex !== -1 && tableRef.current) {
        // Scroll to the row after a short delay to ensure DOM is ready
        setTimeout(() => {
          // Try multiple selectors for DataGrid rows
          const selectors = [
            `[data-id="${highlightUserId}"]`,
            `[data-rowindex="${rowIndex}"]`,
            `.MuiDataGrid-row[data-id="${highlightUserId}"]`,
          ];
          
          let rowElement = null;
          for (const selector of selectors) {
            rowElement = tableRef.current?.querySelector(selector);
            if (rowElement) break;
          }
          
          if (rowElement) {
            rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
            // Add a temporary flash effect
            rowElement.style.transition = "background-color 0.3s";
            setTimeout(() => {
              if (rowElement) {
                rowElement.style.transition = "";
              }
            }, 2000);
          }
        }, 500);
      }
    }
  }, [highlightUserId, rows, loading]);

  const getUserDisplayName = (user) => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.first_name) {
      return user.first_name;
    }
    if (user?.username) {
      return user.username;
    }
    return t("users.user");
  };

  return (
    <>
      <div ref={tableRef}>
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading || updateUser.isPending || deleteUser.isPending}
          pagination={pagination}
          onPageChange={onPageChange}
          getRowClassName={getRowClassName}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {t("users.deleteConfirmTitle")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {t("users.deleteConfirmMessage", { name: getUserDisplayName(userToDelete) })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleteUser.isPending}
          >
            {deleteUser.isPending ? t("common.deleting") : t("common.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersTable;
