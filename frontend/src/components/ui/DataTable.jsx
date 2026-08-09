import React, { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import EmptyState from "./EmptyState";
import { formatNumber } from "./StatCard";

export const DataTable = ({
  rows = [],
  columns,
  loading = false,
  getRowId,
  searchKeys = [],
  searchPlaceholder = "Search...",
  emptyIcon,
  emptyTitle = "No records found",
  emptyDescription = "There is no data to display yet.",
  emptyAction,
  pageSize = 10,
  headerBg = "var(--surface-muted)",
}) => {
  const [q, setQ] = useState("");

  const filtered = q && searchKeys.length ? rows.filter((r) => searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(q.toLowerCase()))) : rows;

  const showSearch = searchKeys.length > 0;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: showSearch ? "space-between" : "flex-end", alignItems: "center", mb: 2, gap: 2, flexWrap: "wrap" }}>
        {showSearch ? (
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{ width: { xs: "100%", sm: 280 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "var(--text-faint)" }} />
                </InputAdornment>
              ),
            }}
          />
        ) : null}
        {emptyAction ? <Box>{emptyAction}</Box> : null}
      </Box>

      {!loading && filtered.length === 0 ? (
        <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} action={emptyAction && !showSearch ? emptyAction : undefined} />
      ) : (
        <Box sx={{ bgcolor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            loading={loading}
            getRowId={getRowId}
            autoHeight
            disableRowSelectionOnClick
            disableColumnMenu
            pageSizeOptions={[5, 10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize } } }}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": { bgcolor: headerBg, fontWeight: 600 },
              "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 600 },
              "& .MuiDataGrid-cell": { borderColor: "var(--border)" },
              "& .MuiDataGrid-footerContainer": { borderTopColor: "var(--border)" },
              "& .MuiTablePagination-toolbar": { color: "var(--text-muted)" },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export { formatNumber };
export default DataTable;
