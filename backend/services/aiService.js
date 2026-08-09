// Heuristic AI service — pure, rule-based analytics over employees + payrolls.
// No external API calls, no secrets. All functions are deterministic and testable.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const money = (n) => `LKR ${Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
const round = (n) => Math.round(Number(n || 0) * 100) / 100;

const std = (arr) => {
  if (!arr.length) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
};

const mean = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

// ---------------------------------------------------------------
// Anomaly detection
// ---------------------------------------------------------------

// Flags outliers (z-score >= threshold) in overtime, bonus and netPay,
// comparing each slip against the employee's own history (peers when sparse).
const detectAnomalies = (employees, payrolls, threshold = 2) => {
  const byId = new Map(employees.map((e) => [String(e._id), e]));
  const grouped = {};
  payrolls.forEach((p) => {
    const key = String(p.employee || p.empId);
    (grouped[key] = grouped[key] || []).push(p);
  });

  const flags = [];
  for (const [key, list] of Object.entries(grouped)) {
    const emp = byId.get(key);
    const sorted = [...list].sort((a, b) => (a.period < b.period ? -1 : 1));
    for (const field of ["overtime", "bonus", "netPay"]) {
      const values = sorted.map((p) => Number(p[field]) || 0);
      const m = mean(values);
      const s = std(values);
      if (s === 0 || values.length < 2) continue;
      sorted.forEach((p, i) => {
        const z = s === 0 ? 0 : (Number(p[field]) - m) / s;
        if (Math.abs(z) < threshold) return;
        const severity = Math.abs(z) >= 3 ? "high" : "medium";
        flags.push({
          employeeId: emp ? emp.employeeId : String(key).slice(-4),
          employeeName: p.employeeName || (emp ? emp.name : "Unknown"),
          period: p.period,
          field,
          value: round(p[field]),
          expected: round(m),
          zScore: round(z),
          severity,
          reason: `${capitalize(field)} of ${money(p[field])} deviates from the employee's typical ${money(m)} (z=${round(z)}) in ${p.period}.`,
        });
      });
    }
  }
  flags.sort((a, b) => Math.abs(b.zScore) - Math.abs(a.zScore));
  return flags.slice(0, 100);
};

// ---------------------------------------------------------------
// Attrition risk
// ---------------------------------------------------------------

const ROLE_RISK = { "Production Worker": 3, "Inventory Clerk": 2, "HR Assistant": 2, "Quality Inspector": 2 };

const attritionRisk = (employees, payrolls) => {
  const now = new Date();
  const results = [];
  for (const e of employees) {
    let score = 20; // base
    const factors = [];

    const hire = e.hireDate ? new Date(e.hireDate) : e.createdAt ? new Date(e.createdAt) : now;
    const tenureMonths = Math.max(0, (now - hire) / (1000 * 60 * 60 * 24 * 30));
    if (tenureMonths < 12) {
      score += 15;
      factors.push("Recently hired (under 1 year)");
    }
    if (tenureMonths > 96) {
      score += 10;
      factors.push("Long tenure (near retirement)");
    }

    const age = Number(e.age) || 0;
    if (age > 0 && age < 30) {
      score += 10;
      factors.push("Younger age bracket");
    } else if (age >= 55) {
      score += 12;
      factors.push("Retirement age approaching");
    }

    const roleRisk = ROLE_RISK[e.role] || 1;
    if (roleRisk >= 3) {
      score += 10;
      factors.push("High-churn role");
    }

    const own = payrolls.filter((p) => String(p.employee) === String(e._id));
    if (own.length > 0) {
      const pending = own.filter((p) => p.status === "pending").length;
      if (pending > 0) {
        score += pending * 8;
        factors.push(`${pending} pending pay slip(s)`);
      }
      const net = own.map((p) => Number(p.netPay) || 0);
      const s = std(net);
      if (s > 0 && s / mean(net) > 0.3) {
        score += 8;
        factors.push("Unstable net pay history");
      }
    }

    const scoreRounded = Math.min(100, Math.max(0, Math.round(score)));
    results.push({
      employeeId: e.employeeId,
      name: e.name,
      role: e.role,
      age: e.age,
      tenureMonths: Math.round(tenureMonths),
      riskScore: scoreRounded,
      riskLevel: scoreRounded >= 70 ? "high" : scoreRounded >= 40 ? "medium" : "low",
      factors: factors.slice(0, 3),
    });
  }
  return results.sort((a, b) => b.riskScore - a.riskScore);
};

// ---------------------------------------------------------------
// Natural-language query answering
// ---------------------------------------------------------------

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const yearFrom = (q) => {
  const m = q.match(/20\d{2}/);
  return m ? m[0] : String(new Date().getFullYear());
};

const periodFrom = (q) => {
  const m = q.match(/(20\d{2})-(\d{2})/);
  return m ? m[0] : null;
};

const groupBy = (payrolls, employees, field) => {
  const byId = new Map(employees.map((e) => [String(e._id), e]));
  const groups = {};
  payrolls.forEach((p) => {
    const emp = byId.get(String(p.employee));
    const key = emp ? emp[field] || "Unknown" : "Unknown";
    groups[key] = (groups[key] || 0) + (Number(p.netPay) || 0);
  });
  return groups;
};

const answerQuery = (employees, payrolls, question) => {
  const q = (question || "").toLowerCase();
  if (!q.trim()) return { answer: "Please ask a question about your employees or payroll." };

  // Gender split
  if (q.includes("gender") || q.includes("male") || q.includes("female")) {
    const male = employees.filter((e) => e.gender === "male").length;
    const female = employees.filter((e) => e.gender === "female").length;
    return {
      answer: `There are ${male} male and ${female} female employees.`,
      series: { type: "pie", labels: ["Male", "Female"], data: [male, female] },
    };
  }

  // Count employees
  if (q.includes("count") || q.includes("how many employees")) {
    const roleMatch = q.match(/by role ([a-z ]+)/);
    if (roleMatch) {
      const role = capitalize(roleMatch[1].trim());
      const count = employees.filter((e) => e.role.toLowerCase() === role.toLowerCase()).length;
      return { answer: `${count} employee(s) hold the ${role} role.` };
    }
    if (q.includes("by department") || q.includes("department")) {
      const depMatch = q.match(/department ([a-z ]+)/);
      if (depMatch) {
        const dep = capitalize(depMatch[1].trim());
        const count = employees.filter((e) => e.department.toLowerCase() === dep.toLowerCase()).length;
        return { answer: `${count} employee(s) work in ${dep}.` };
      }
      const groups = {};
      employees.forEach((e) => {
        groups[e.department || "General"] = (groups[e.department || "General"] || 0) + 1;
      });
      return { answer: "Employee count by department:\n" + Object.entries(groups).map(([k, v]) => `${k}: ${v}`).join(", ") };
    }
    const active = employees.filter((e) => e.status !== "terminated").length;
    return { answer: `There are ${active} active employees in the system.` };
  }

  // Total net pay
  if (q.includes("total net pay") || q.includes("total pay") || q.includes("net pay total") || q.includes("paid in total")) {
    const period = periodFrom(q);
    const year = yearFrom(q);
    let total = 0;
    let label = "of all time";
    if (period) {
      total = payrolls.filter((p) => p.period === period).reduce((a, p) => a + (Number(p.netPay) || 0), 0);
      label = `for ${period}`;
    } else if (year) {
      total = payrolls.filter((p) => p.period && p.period.startsWith(year)).reduce((a, p) => a + (Number(p.netPay) || 0), 0);
      label = `for ${year}`;
    } else if (q.includes("this year")) {
      const y = String(new Date().getFullYear());
      total = payrolls.filter((p) => p.period && p.period.startsWith(y)).reduce((a, p) => a + (Number(p.netPay) || 0), 0);
      label = `for this year`;
    } else {
      total = payrolls.reduce((a, p) => a + (Number(p.netPay) || 0), 0);
    }
    return { answer: `Total net pay ${label} is ${money(total)}.` };
  }

  // Average net pay (optionally by role/department)
  if (q.includes("average net pay") || q.includes("average pay") || q.includes("avg net")) {
    const period = periodFrom(q);
    const year = q.includes("this year") ? String(new Date().getFullYear()) : yearFrom(q);
    let subset = payrolls;
    if (period) subset = subset.filter((p) => p.period === period);
    else if (year && !q.includes("of all time")) subset = subset.filter((p) => p.period && p.period.startsWith(year));
    const vals = subset.map((p) => Number(p.netPay) || 0);
    if (!vals.length) return { answer: "No payroll data found for that period." };
    if (q.includes("by role")) {
      const groups = groupBy(subset, employees, "role");
      return { answer: "Average net pay by role:\n" + Object.entries(groups).map(([k, v]) => `${k}: ${money(round(v))}`).join(", ") };
    }
    if (q.includes("by department")) {
      const groups = groupBy(subset, employees, "department");
      return { answer: "Average net pay by department:\n" + Object.entries(groups).map(([k, v]) => `${k}: ${money(round(v))}`).join(", ") };
    }
    return { answer: `Average net pay is ${money(round(mean(vals)))}.` };
  }

  // Top/bottom earners
  if (q.includes("top") || q.includes("highest") || q.includes("most overtime") || q.includes("most paid") || q.includes("biggest")) {
    const period = periodFrom(q);
    let subset = payrolls;
    if (period) subset = subset.filter((p) => p.period === period);
    if (subset.length === 0) return { answer: "No payroll data found for that period." };
    let key = "netPay";
    let noun = "paid";
    if (q.includes("overtime")) {
      key = "overtime";
      noun = "overtime";
    }
    const top = [...subset].sort((a, b) => (Number(b[key]) || 0) - (Number(a[key]) || 0)).slice(0, 5);
    const lines = top.map((p, i) => `${i + 1}. ${p.employeeName} — ${money(p[key])} (${p.period})`);
    return { answer: `Top ${top.length} by ${noun}:\n` + lines.join("\n") };
  }

  if (q.includes("lowest") || q.includes("least") || q.includes("bottom")) {
    const period = periodFrom(q);
    let subset = payrolls;
    if (period) subset = subset.filter((p) => p.period === period);
    if (subset.length === 0) return { answer: "No payroll data found for that period." };
    const bottom = [...subset].sort((a, b) => (Number(a.netPay) || 0) - (Number(b.netPay) || 0)).slice(0, 5);
    const lines = bottom.map((p, i) => `${i + 1}. ${p.employeeName} — ${money(p.netPay)} (${p.period})`);
    return { answer: "Lowest 5 by net pay:\n" + lines.join("\n") };
  }

  // Monthly payroll trend
  if (q.includes("by month") && (q.includes("pay") || q.includes("salary"))) {
    const year = yearFrom(q);
    const subset = payrolls.filter((p) => p.period && p.period.startsWith(year));
    const perMonth = Array(12).fill(0);
    subset.forEach((p) => {
      const m = parseInt(p.period.split("-")[1], 10);
      if (m >= 1 && m <= 12) perMonth[m - 1] += Number(p.netPay) || 0;
    });
    const labels = MONTHS.map((m, i) => `${m} ${year}`);
    return {
      answer: `Net pay by month for ${year}: ${MONTHS.map((m, i) => `${m} ${money(perMonth[i])}`).filter((x, i) => perMonth[i] > 0).join(", ") || "no data"}.`,
      series: { type: "line", labels, data: perMonth },
    };
  }

  // Monthly hires
  if (q.includes("hired") && q.includes("month")) {
    const year = yearFrom(q);
    const perMonth = Array(12).fill(0);
    employees.forEach((e) => {
      const d = e.createdAt || e.hireDate;
      if (!d) return;
      const date = new Date(d);
      if (String(date.getFullYear()) !== year) return;
      perMonth[date.getMonth()] += 1;
    });
    const labels = MONTHS.map((m, i) => `${m} ${year}`);
    return {
      answer: `Employees hired by month in ${year}: ${MONTHS.map((m, i) => `${m}: ${perMonth[i]}`).filter((x, i) => perMonth[i] > 0).join(", ") || "no hires yet"}.`,
      series: { type: "bar", labels, data: perMonth },
    };
  }

  if (q.includes("hired")) {
    const count = employees.length;
    return { answer: `${count} employees have been hired into the system.` };
  }

  // Anomaly / risk summaries
  if (q.includes("anomal") || q.includes("unusual") || q.includes("outlier")) {
    const flags = detectAnomalies(employees, payrolls);
    if (!flags.length) return { answer: "No anomalies detected in the payroll data. Everything looks consistent." };
    const high = flags.filter((f) => f.severity === "high").length;
    return { answer: `Detected ${flags.length} payroll anomalies (${high} high severity). Check the Insights page for details.` };
  }
  if (q.includes("risk") || q.includes("attrition")) {
    const risks = attritionRisk(employees, payrolls);
    const high = risks.filter((r) => r.riskLevel === "high").length;
    const med = risks.filter((r) => r.riskLevel === "medium").length;
    return { answer: `${high} employee(s) at high attrition risk and ${med} at medium risk. See the Insights page for the full breakdown.` };
  }

  return {
    answer:
      "I couldn't understand that question yet. Try asking things like:\n" +
      "· How many employees do we have?\n" +
      "· Total net pay for 2026-05\n" +
      "· Average net pay by role\n" +
      "· Top 5 highest paid\n" +
      "· Net pay by month for 2026\n" +
      "· Employees hired by month",
  };
};

const SUGGESTIONS = [
  "How many employees do we have?",
  "Total net pay for this year",
  "Average net pay by role",
  "Top 5 highest paid",
  "Who earns the most overtime?",
  "Net pay by month for " + new Date().getFullYear(),
  "Employees hired by month",
  "Any payroll anomalies?",
  "How many employees are at attrition risk?",
];

module.exports = { detectAnomalies, attritionRisk, answerQuery, SUGGESTIONS, mean, std };
