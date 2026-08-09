import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, LinearProgress } from "@mui/material";
import ScaleIcon from "@mui/icons-material/Scale";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import axios from "axios";
import PageHeader from "../../components/ui/PageHeader";
import StatCard, { formatNumber } from "../../components/ui/StatCard";
import InventoryAreaChart from "../../components/charts/InventoryAreaChart";

const STORAGE_CAPACITY = 5000;

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [itemCount, setItemCount] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [qty, all] = await Promise.all([axios.get("/inventory/count/getquantity"), axios.get("/inventory/")]);
        setSummary(qty.data.totalQty || 0);
        setItemCount(all.data.length);
      } catch {
        setSummary(0);
        setItemCount(0);
      }
    };
    load();
  }, []);

  const percentage = Math.min(100, ((summary || 0) / STORAGE_CAPACITY) * 100);

  return (
    <Box>
      <PageHeader title="Inventory Analytics" subtitle="Quantity trends and storage insights" />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Total Quantity" value={summary === null ? "" : formatNumber(summary)} suffix="KG" icon={ScaleIcon} accent="primary" caption="Tea leaf stock" loading={summary === null} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Total Items" value={itemCount === null ? "" : formatNumber(itemCount)} icon={WarehouseIcon} accent="accent" caption="Inventory records" loading={itemCount === null} />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Storage Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tea Leaf capacity usage
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }} className="tabular">
                {percentage.toFixed(1)}%
              </Typography>
              <LinearProgress variant="determinate" value={percentage} sx={{ height: 10, borderRadius: 5, mt: 1.5 }} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                {formatNumber(summary || 0)} KG used of {formatNumber(STORAGE_CAPACITY)} KG
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Inventory Quantity by Item
          </Typography>
          <InventoryAreaChart height={360} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Analytics;
