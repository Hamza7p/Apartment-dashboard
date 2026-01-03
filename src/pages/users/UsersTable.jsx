import DataTable from "@/components/layouts/DataTable";
import { UserStatus } from "@/enums/UserStatus";
import { USER_STATUS_MAP } from "@/utils/userStatus.helper";
import {
  Cancel,
  Close,
  Done,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Chip, Avatar, Stack } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router";

const UsersTable = ({ users, loading = false, onPageChange }) => {
  const navigate = useNavigate();

  /** ✅ فصل البيانات */
  const rows = users?.data ?? [];

  const pagination = {
    page: users?.page ?? 0,
    pageSize: users?.perPage ?? 10,
    total: users?.total ?? 0,
  };

  const handleUpdateStatus = (id, status) => {
    // API call
  };

  const columns = [
    { field: "id", headerName: t("users.id"), width: 70 },

    {
      field: "personal_photo",
      headerName: t("users.photo"),
      width: 100,
      renderCell: ({ row }) => (
        <Avatar
          src={row.personal_photo ?? "/assets/images/user.png"}
          sx={{ width: 45, height: 45 }}
        />
      ),
    },

    { field: "first_name", headerName: t("users.first_name"), width: 180 },
    { field: "last_name", headerName: t("users.last_name"), width: 180 },
    { field: "phone", headerName: t("users.phone"), width: 220 },
    { field: "role", headerName: t("users.role"), width: 150 },

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
          icon={<Close color="error" sx={{ fontSize: '25px', padding: '3px', border: '1px solid red', borderRadius: '50%' }}/>}
          label="Reject"
          onClick={() =>
            handleUpdateStatus(params.row.id, UserStatus.rejected)
          }
        />,
        <GridActionsCellItem
          key="approve"
          icon={<Done color="success" sx={{ fontSize: '25px', p: '3px', border: '1px solid green', borderRadius: '50%' }} />}
          label="Approve"
          onClick={() =>
            handleUpdateStatus(params.row.id, UserStatus.approved)
          }
        />,
        <GridActionsCellItem
          key="view"
          icon={<RemoveRedEyeOutlined  sx={{ fontSize: '25px', padding: '3px', border: '1px solid silver', borderRadius: '50%' }} />}
          label="Show"
          onClick={() => navigate(`/users/${params.row.id}`)}
        />,
      ],
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      loading={loading}
      pagination={pagination}
      onPageChange={onPageChange}
    />
  );
};

export default UsersTable;
