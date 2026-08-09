import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Button } from "@mui/material";
import { motion } from "framer-motion";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import axios from "axios";
import StatCard, { formatNumber } from "../../components/ui/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import { useAuth } from "../../context/AuthContext";

const SupplierDashboard = () => {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState(null);

  useEffect(() => {
    axios
      .get("/supliers/")
      .then((res) => setSuppliers(res.data || []))
      .catch(() => setSuppliers([]));
  }, []);

  const itemCount = suppliers ? new Set(suppliers.map((s) => s.item).filter(Boolean)).size : 0;
  const recent = (suppliers || []).slice(-5).reverse();

  const fade = {
    hidden: { opacity: 0, y: 12 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.35 } }),
  };

  const name = user?.name || "Manager";

  return (
    <Box>
      <PageHeader
        title="Supplier Dashboard"
        subtitle="Manage tea suppliers"
        actions={
          <Button variant="contained" startIcon={<PersonAddIcon />} component={Link} to="/SupplierAdminPanal/AddSupplier">
            Add Supplier
          </Button>
        }
      />

      <Card sx={{ mb: 3, background: "linear-gradient(120deg, #7a3c0d 0%, #a8581f 60%, #c97c2d 100%)", color: "#fff", border: "none" }}>
        <CardContent sx={{ py: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}!
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Keep your supplier network up to date.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {[
          { title: "Total Suppliers", value: suppliers ? formatNumber(suppliers.length) : "", icon: LocalShippingIcon, accent: "primary", caption: "Registered suppliers" },
          { title: "Supplied Items", value: suppliers ? formatNumber(itemCount) : "", icon: CategoryIcon, accent: "accent", caption: "Distinct item types" },
          { title: "Bank Partners", value: suppliers ? formatNumber(new Set(suppliers.map((s) => s.bank).filter(Boolean)).size) : "", icon: AccountBalanceIcon, accent: "info", caption: "Distinct banks" },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} lg={4} key={card.title}>
            <motion.div variants={fade} custom={i} initial="hidden" animate="show">
              <StatCard {...card} loading={!suppliers} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Recent Suppliers
          </Typography>
          {suppliers === null ? (
            <Box>
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height={28} sx={{ my: 1 }} />
              ))}
            </Box>
          ) : recent.length === 0 ? (
            <EmptyState icon={LocalShippingIcon} title="No suppliers yet" description="Add your first supplier to build the network." />
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Bank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recent.map((s) => (
                    <TableRow key={s._id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{s.name}</TableCell>
                      <TableCell>{s.item}</TableCell>
                      <TableCell>{s.phone}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{s.bank}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SupplierDashboard;
