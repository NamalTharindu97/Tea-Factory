import React, { useCallback, useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Grid, Skeleton, Typography, Button, Alert } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GppGoodIcon from "@mui/icons-material/GppGood";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import EmptyState from "../../components/ui/EmptyState";
import axios from "axios";

const severityTone = (severity) => {
  if (severity === "high") return "error";
  if (severity === "medium") return "warning";
  return "info";
};

const riskTone = (level) => {
  if (level === "high") return "error";
  if (level === "medium") return "warning";
  return "success";
};

const Insights = () => {
  const [anomalies, setAnomalies] = useState(null);
  const [risks, setRisks] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const [a, r] = await Promise.all([axios.get("/ai/anomalies"), axios.get("/ai/attrition")]);
      setAnomalies(a.data);
      setRisks(r.data);
    } catch {
      setError("Could not load AI insights. Make sure the backend is running.");
      setAnomalies([]);
      setRisks([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const columns = [
    { field: "employeeId", headerName: "ID", width: 90, renderCell: (p) => <strong>{p.value}</strong> },
    { field: "name", headerName: "Name", width: 190, renderCell: (p) => <strong>{p.value}</strong> },
    { field: "role", headerName: "Role", width: 170 },
    { field: "age", headerName: "Age", width: 70 },
    { field: "tenureMonths", headerName: "Tenure (mo)", width: 105 },
    {
      field: "riskScore",
      headerName: "Risk Score",
      width: 110,
      renderCell: (p) => <strong>{p.value} / 100</strong>,
    },
    {
      field: "riskLevel",
      headerName: "Level",
      width: 100,
      renderCell: (p) => <Chip label={p.value} size="small" color={riskTone(p.value)} />,
    },
    { field: "factors", headerName: "Top Factors", width: 330, renderCell: (p) => (Array.isArray(p.value) ? p.value.join(" · ") : p.value) },
  ];

  return (
    <Box>
      <PageHeader
        title="AI Insights"
        subtitle="Heuristic analytics computed locally from your data"
        actions={
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={load}>
            Refresh
          </Button>
        }
      />

      {error ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : null}

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <WarningAmberIcon sx={{ color: "var(--danger)" }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Payroll Anomalies
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Outliers in overtime, bonus or net pay compared to each employee's own history.
              </Typography>
              {anomalies === null ? (
                <Box>
                  <Skeleton height={24} sx={{ my: 1 }} />
                  <Skeleton height={24} sx={{ my: 1 }} />
                  <Skeleton height={24} sx={{ my: 1 }} />
                </Box>
              ) : anomalies.length === 0 ? (
                <EmptyState icon={GppGoodIcon} title="No anomalies detected" description="Payroll values look consistent with each employee's history." />
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {anomalies.slice(0, 12).map((a, i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: "1px solid var(--border)",
                        bgcolor: a.severity === "high" ? "var(--danger-soft)" : "var(--surface-muted)",
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {a.employeeName}
                          <Typography component="span" variant="caption" color="text.secondary">
                            {" "}· {a.period} · {a.employeeId}
                          </Typography>
                        </Typography>
                        <Chip label={a.severity} size="small" color={severityTone(a.severity)} />
                      </Box>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {a.reason}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <EmojiPeopleIcon sx={{ color: "var(--accent)" }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Attrition Risk
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {risks === null ? "Scoring employee retention risk..." : `Summary: ${risks.filter((r) => r.riskLevel === "high").length} high risk · ${risks.filter((r) => r.riskLevel === "medium").length} medium risk of ${risks.length}.`}
              </Typography>
              {risks === null ? (
                <Box>
                  <Skeleton height={24} sx={{ my: 1 }} />
                  <Skeleton height={24} sx={{ my: 1 }} />
                  <Skeleton height={24} sx={{ my: 1 }} />
                </Box>
              ) : risks.length === 0 ? (
                <EmptyState icon={GppGoodIcon} title="No employees" description="Add employees to see attrition insights." />
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {risks.slice(0, 6).map((r) => (
                    <Box key={r.employeeId} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {r.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {r.employeeId} · {r.role}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }} className="tabular">
                          {r.riskScore}
                        </Typography>
                        <Chip label={r.riskLevel} size="small" color={riskTone(r.riskLevel)} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Full Attrition Ranking
          </Typography>
          <DataTable
            rows={risks || []}
            columns={columns}
            loading={risks === null}
            getRowId={(r) => r.employeeId}
            searchKeys={["name", "role", "employeeId"]}
            searchPlaceholder="Search employees..."
            emptyIcon={EmojiPeopleIcon}
            emptyTitle="No employee risk data"
            emptyDescription="Employees will appear here once added."
            pageSize={8}
          />
        </CardContent>
      </Card>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
        Insights are heuristic and run entirely on this server (no external AI services).
      </Typography>
    </Box>
  );
};

export default Insights;
