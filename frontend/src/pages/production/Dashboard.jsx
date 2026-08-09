import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Button } from "@mui/material";
import { motion } from "framer-motion";
import FactoryIcon from "@mui/icons-material/Factory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LoopIcon from "@mui/icons-material/Loop";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import axios from "axios";
import StatCard, { formatNumber } from "../../components/ui/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import { useAuth } from "../../context/AuthContext";

const statusColor = (status) => {
  if (status === "Completed") return "success";
  if (status === "In Progress") return "warning";
  if (status === "Cancelled") return "error";
  return "default";
};

const ProductionDashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState(null);

  useEffect(() => {
    axios
      .get("/productions/")
      .then((res) => setItems(res.data || []))
      .catch(() => setItems([]));
  }, []);

  const counts = {
    total: items?.length ?? 0,
    completed: items?.filter((i) => i.status === "Completed").length ?? 0,
    inProgress: items?.filter((i) => i.status === "In Progress").length ?? 0,
    pending: items?.filter((i) => i.status === "Pending" || !i.status).length ?? 0,
  };

  const recent = (items || []).slice(-5).reverse();

  const fade = {
    hidden: { opacity: 0, y: 12 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.35 } }),
  };

  return (
    <Box>
      <PageHeader
        title="Production Dashboard"
        subtitle="Production batches overview"
        actions={
          <Button variant="contained" startIcon={<AddIcon />} component={Link} to="/ProductionAdminPanal/ProductionAdd">
            New Production
          </Button>
        }
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {[
          { title: "Total Batches", value: items ? formatNumber(counts.total) : "", icon: FactoryIcon, accent: "primary", caption: "All production records" },
          { title: "Completed", value: items ? formatNumber(counts.completed) : "", icon: CheckCircleIcon, accent: "success", caption: "Finished batches" },
          { title: "In Progress", value: items ? formatNumber(counts.inProgress) : "", icon: LoopIcon, accent: "accent", caption: "Active batches" },
          { title: "Pending", value: items ? formatNumber(counts.pending) : "", icon: PendingActionsIcon, accent: "info", caption: "Not started" },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} lg={3} key={card.title}>
            <motion.div variants={fade} custom={i} initial="hidden" animate="show">
              <StatCard {...card} loading={!items} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Recent Productions
          </Typography>
          {items === null ? (
            <Box>
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height={28} sx={{ my: 1 }} />
              ))}
            </Box>
          ) : recent.length === 0 ? (
            <EmptyState icon={FactoryIcon} title="No productions yet" description="Create your first production batch to track output here." />
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tea Type</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recent.map((item) => (
                    <TableRow key={item._id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{item.ProdutionID}</TableCell>
                      <TableCell>{item.teaType}</TableCell>
                      <TableCell>{item.batchNumber}</TableCell>
                      <TableCell>{item.startDate}</TableCell>
                      <TableCell>{item.endDate}</TableCell>
                      <TableCell>
                        <Chip label={item.status} size="small" color={statusColor(item.status)} variant="outlined" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {user ? (
        <Typography variant="caption" color="text.faint" sx={{ display: "block", mt: 2, color: "var(--text-faint)" }}>
          Signed in as {user.name} ({user.role})
        </Typography>
      ) : null}
    </Box>
  );
};

export default ProductionDashboard;
