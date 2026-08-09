import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import axios from "axios";
import StatCard, { formatMoney, formatNumber } from "../../components/ui/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import EmployeeLineChart from "../../components/charts/EmployeeLineChart";
import EmployeePieChart from "../../components/charts/EmployeePieChart";
import EmployeeBarChart from "../../components/charts/EmployeeBarChart";

const chartCard = (title) => ({
  mb: 3,
  bgcolor: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
});

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
      <Card>
        <CardContent>
          <Skeleton width="55%" height={28} sx={{ mb: 2 }} />
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} height={24} sx={{ my: 1 }} />
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
                <ListItem disableGutters sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <FiberManualRecordIcon sx={{ fontSize: 10, color: "var(--primary)" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        Employee <b>{p.empName}</b> was paid <b>{formatMoney(p.netPay)}</b>
                      </Typography>
                    }
                    secondary={p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""}
                  />
                </ListItem>
                {i < payrolls.length - 1 ? <Divider /> : null}
              </Box>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

const EmployeeDashboard = () => {
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
      <PageHeader title="Employee Dashboard" subtitle="Overview of payroll and employee metrics" />

      <Grid container spacing={2.5} sx={{ mb: 2 }}>
        {[
          { title: "Total Net Pay", value: stats ? formatMoney(stats.net) : "", icon: LocalAtmIcon, accent: "primary", caption: "Payroll net this year" },
          { title: "Total Tax Pay", value: stats ? formatMoney(stats.tax) : "", icon: PersonIcon, accent: "accent", caption: "Deducted taxes" },
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
