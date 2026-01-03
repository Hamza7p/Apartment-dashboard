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
        rowCount={pagination?.total}
        page={pagination?.page}
        pageSize={pagination?.pageSize}
        onPageChange={(page) => onPageChange?.(page)}
        onPageSizeChange={(pageSize) =>
          onPageChange?.(pagination.page, pageSize)
        }

        rowsPerPageOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}

        sx={{
          border: "none",
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiDataGrid-columnHeaders": {
            background: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }}
      />
    </Box>
  );
}
