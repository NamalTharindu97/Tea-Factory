// Central place for statutory payroll configuration (Sri Lanka).
// Adjust these values when rates/bands change; the compute logic reads them only from here.

const EPF_EMPLOYEE_RATE = 0.08; // employee contribution (% of basic salary)
const EPF_EMPLOYER_RATE = 0.12; // employer contribution (reporting only)
const ETF_RATE = 0.03; // employer ETF contribution (reporting only)

// Monthly APIT (Pay As You Earn) bands — cumulative progressive rates.
// Each band applies to the portion of taxable income above the previous threshold.
const APIT_BANDS = [
  { upTo: 150000, rate: 0.0 },
  { upTo: 200000, rate: 0.06 },
  { upTo: 250000, rate: 0.12 },
  { upTo: 300000, rate: 0.18 },
  { upTo: 350000, rate: 0.24 },
  { upTo: 500000, rate: 0.3 },
  { upTo: Infinity, rate: 0.36 },
];

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

// Progressive APIT on monthly taxable income.
const computeApit = (taxable) => {
  let tax = 0;
  let prev = 0;
  for (const band of APIT_BANDS) {
    if (taxable <= prev) break;
    const slice = Math.min(taxable, band.upTo) - prev;
    if (slice > 0) tax += slice * band.rate;
    prev = band.upTo;
  }
  return round2(tax);
};

module.exports = {
  EPF_EMPLOYEE_RATE,
  EPF_EMPLOYER_RATE,
  ETF_RATE,
  APIT_BANDS,
  computeApit,
  round2,
};
