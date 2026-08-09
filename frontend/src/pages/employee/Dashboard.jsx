import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Skeleton, Button } from "@mui/material";
import { motion } from "framer-motion";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PaidIcon from "@mui/icons-material/Paid";
import axios from "axios";
import StatCard, { formatMoney, formatNumber } from "../../components/ui/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import EmployeeLineChart from "../../components/charts/EmployeeLineChart";
import EmployeePieChart from "../../components/charts/EmployeePieChart";
import EmployeeBarChart from "../../components/charts/EmployeeBarChart";
import { useAuth } from "../../context/AuthContext";
import { DEFAULT_AVATAR } from "../../config/constants";
import { useNavigate } from "react-router-dom";

const chartCard = (title) => ({
  mb: 3,
  bgcolor: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
});

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const RecentPayrolls = () => {
  const [payrolls, setPayrolls] = useState(null);

  useEffect(() => {
    axios
      .get("/payrolls/count/Lastest/Payroll")
      .then((res) => setPayrolls(res.data || []))
      .catch(() => setPayrolls([]));
  }, []);

  if (payrolls === null) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Skeleton width="55%" height={28} sx={{ mb: 2 }} />
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} height={48} sx={{ my: 1 }} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
          Latest Employee Payments
        </Typography>
        {payrolls.length === 0 ? (
          <EmptyState icon={PaymentsIcon} title="No recent payrolls" description="New pay slips will appear here as they are created." />
        ) : (
          <List disablePadding>
            {payrolls.map((p, i) => (
              <Box key={i}>
                <ListItem disableGutters alignItems="center" sx={{ px: 0, gap: 1.5 }}>
                  <ListItemAvatar sx={{ minWidth: 0 }}>
                    <Avatar src={p.empImg || DEFAULT_AVATAR} alt={p.empName} sx={{ width: 40, height: 40, bgcolor: "var(--primary-soft)", color: "var(--primary)", fontSize: "0.9rem" }}>
                      {p.empName ? p.empName.charAt(0).toUpperCase() : <PersonIcon fontSize="small" />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" noWrap>
                        <b>{p.empName}</b> was paid <b className="tabular">{formatMoney(p.netPay)}</b>
                      </Typography>
                    }
                    secondary={p.createdAt ? `Pay period ${p.createdAt}` : ""}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                </ListItem>
                {i < payrolls.length - 1 ? <Divider component="li" /> : null}
              </Box>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const year = new Date().getFullYear();
        const [net, count, tax, pay, empCount] = await Promise.all([
          axios.get("/payrolls/year/totalNetPay", { params: { year } }),
          axios.get("/payrolls/count/payroll"),
          axios.get("/payrolls/count/totalTax"),
          axios.get("/payrolls/count/totalPayment"),
          axios.get("/employees/count"),
        ]);
        setStats({
          net: net.data.totalNetPay,
          count: count.data,
          tax: tax.data.totalTax,
          pay: pay.data.totalPay,
          employees: empCount.data.count,
        });
      } catch {
        setStats({ net: 0, count: 0, tax: 0, pay: 0, employees: 0 });
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          p: { xs: 2.5, md: 3 },
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(120deg, var(--primary) 0%, #2f9e44 100%)",
          color: "#fff",
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: "1.4rem", md: "1.7rem" }, mt: 0.5 }}>
            {greeting()}, {user?.name || "there"} 👋
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Here's how the factory is doing today across payroll and employees.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button variant="contained" sx={{ bgcolor: "#fff", color: "var(--primary)", "&:hover": { bgcolor: "#f0f7f2" } }} startIcon={<PersonAddAlt1Icon />} onClick={() => navigate("/hr/employees/new")}>
            New Employee
          </Button>
          <Button variant="outlined" sx={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.12)" } }} startIcon={<PaidIcon />} onClick={() => navigate("/hr/payroll/new")}>
            Payroll Entry
          </Button>
        </Box>
      </Box>

      <PageHeader title="Employee Dashboard" subtitle="Overview of payroll and employee metrics" />

      <Grid container spacing={2.5} sx={{ mb: 2 }}>
        {[
          { title: "Total Net Pay", value: stats ? formatMoney(stats.net) : "", icon: LocalAtmIcon, accent: "primary", caption: "Payroll net this year" },
          { title: "Total Tax Pay", value: stats ? formatMoney(stats.tax) : "", icon: AccountBalanceWalletIcon, accent: "accent", caption: "Deducted taxes" },
          { title: "Payroll Count", value: stats ? formatNumber(stats.count) : "", icon: ReceiptLongIcon, accent: "info", caption: "Pay slips generated" },
          { title: "Total Payments", value: stats ? formatMoney(stats.pay) : "", icon: PaymentsIcon, accent: "danger", caption: "Gross payments" },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} lg={3} key={card.title}>
            <motion.div variants={fade} custom={i} initial="hidden" animate="show">
              <StatCard {...card} loading={!stats} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box sx={chartCard()}>
            <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total Net Pay by Month
              </Typography>
            </Box>
            <Box sx={{ px: 2, pb: 2 }}>
              <EmployeeLineChart height={300} />
            </Box>
          </Box>
          <Box sx={chartCard()}>
            <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Employee Count by Month
              </Typography>
            </Box>
            <Box sx={{ px: 2, pb: 2 }}>
              <EmployeeBarChart height={280} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={chartCard()}>
            <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Male &amp; Female Distribution
              </Typography>
            </Box>
            <Box sx={{ px: 2, pb: 2 }}>
              <EmployeePieChart height={280} />
            </Box>
          </Box>
          <RecentPayrolls />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;
