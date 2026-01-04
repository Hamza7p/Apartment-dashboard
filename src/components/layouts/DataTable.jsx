import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

export default function DataTable({
  columns,
  rows,
  loading = false,
  pagination,
  onPageChange,
  getRowClassName,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 560,
        width: "100%",
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        p: 2,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}

        /** ✅ Server-side pagination */
        pagination
        paginationMode="server"
        rowCount={pagination?.total || 0}
        page={pagination?.page || 0}
        pageSize={pagination?.pageSize || 10}
        onPaginationModelChange={(model) => {
          onPageChange?.(model.page, model.pageSize);
        }}

        rowsPerPageOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        getRowClassName={getRowClassName}

        sx={{
          border: "none",
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiDataGrid-columnHeaders": {
            background: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiDataGrid-row.highlighted": {
            backgroundColor: theme.palette.mode === "dark"
              ? "rgba(144, 202, 249, 0.16)"
              : "rgba(25, 118, 210, 0.08)",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark"
                ? "rgba(144, 202, 249, 0.24)"
                : "rgba(25, 118, 210, 0.12)",
            },
          },
        }}
      />
    </Box>
  );
}
