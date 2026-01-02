// components/DataTable.jsx
"use client";

import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

export default function DataTable({ columns, rows, loading=false, pageSize = 10, onRowClick }) {
  const theme = useTheme();

  return (
    <Box sx={{
      height: 560,
      width: "100%",
      bgcolor: theme.palette.background.paper,
      borderRadius: 2,
      boxShadow: theme.shadows[1],
      p: 2
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5,10,25,50]}
        loading={loading}
        // checkboxSelection
        disableSelectionOnClick
        onRowClick={onRowClick}
        components={{ Toolbar: GridToolbar }}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": { borderBottom: `1px solid ${theme.palette.divider}` },
          "& .MuiDataGrid-columnHeaders": {
            background: theme.palette.background.default,
            borderRadius: 1,
            mb: 1,
            borderBottom: `1px solid ${theme.palette.divider}`
          },
          "& .MuiDataGrid-toolbarContainer": { p: 1, gap: 1 },
        }}
      />
    </Box>
  );
}
