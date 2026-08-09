import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ScaleIcon from "@mui/icons-material/Scale";
import StorageIcon from "@mui/icons-material/Storage";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import axios from "axios";
import StatCard, { formatNumber } from "../../components/ui/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import { useAuth } from "../../context/AuthContext";

const STORAGE_CAPACITY = 5000;

const WelcomeBanner = () => {
  const { user } = useAuth();
  const name = user?.name || "Manager";
  return (
    <Card sx={{ mb: 3, background: "linear-gradient(120deg, #115a31 0%, #1d7a46 70%, #2f9e44 100%)", color: "#fff", border: "none" }}>
      <CardContent sx={{ py: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}!
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Today is a great day to manage the inventory.
        </Typography>
      </CardContent>
    </Card>
  );
};

const LatestInventories = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/inventory/")
      .then((res) => {
        const sorted = [...res.data].sort((a, b) => new Date(b.timestamp || b.updatedAt || 0) - new Date(a.timestamp || a.updatedAt || 0));
        setData(sorted.slice(0, 5));
      })
      .catch(() => setData([]));
  }, []);

  if (data === null) {
    return (
      <Card>
        <CardContent>
          <Skeleton height={28} width="40%" sx={{ mb: 2 }} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={24} sx={{ my: 1 }} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Latest Inventories
        </Typography>
        {data.length === 0 ? (
          <EmptyState icon={Inventory2Icon} title="No inventory yet" description="Add inventory items to see them here." />
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Supplier</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>{item.Id}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                    <TableCell align="right" className="tabular">
                      {formatNumber(item.quantity)}
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

const StorageSummary = ({ totalQty }) => {
  const percentage = Math.min(100, ((totalQty || 0) / STORAGE_CAPACITY) * 100);
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Storage Summary
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Tea Leaf
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }} className="tabular">
            {formatNumber(totalQty)} <Typography component="span" variant="body2" color="text.secondary">Kg / {formatNumber(STORAGE_CAPACITY)} Kg</Typography>
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Capacity usage: <b className="tabular">{percentage.toFixed(1)}%</b>
        </Typography>
        <LinearProgress variant="determinate" value={percentage} sx={{ height: 10, borderRadius: 5 }} />
      </CardContent>
    </Card>
  );
};

const InventoryDashboard = () => {
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

  const fade = {
    hidden: { opacity: 0, y: 12 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.35 } }),
  };

  return (
    <Box>
      <PageHeader title="Inventory Dashboard" subtitle="Overview of stock levels and storage" />
      <WelcomeBanner />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {[
          { title: "Total Quantity", value: summary === null ? "" : `${formatNumber(summary)}`, suffix: "KG", icon: ScaleIcon, accent: "primary", caption: "Tea leaf stock" },
          { title: "Total Items", value: itemCount === null ? "" : formatNumber(itemCount), icon: WarehouseIcon, accent: "accent", caption: "Inventory records" },
          { title: "Capacity", value: summary === null ? "" : `${Math.min(100, ((summary || 0) / STORAGE_CAPACITY) * 100).toFixed(0)}`, suffix: "%", icon: StorageIcon, accent: "info", caption: `of ${formatNumber(STORAGE_CAPACITY)} KG` },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} lg={4} key={card.title}>
            <motion.div variants={fade} custom={i} initial="hidden" animate="show">
              <StatCard {...card} loading={summary === null} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <LatestInventories />
        </Grid>
        <Grid item xs={12} lg={4}>
          <StorageSummary totalQty={summary} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventoryDashboard;
