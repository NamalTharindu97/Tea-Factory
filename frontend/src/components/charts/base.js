const cssVar = (name, fallback = "") => {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

export const chartPalette = () => ({
  text: cssVar("--text-muted", "#5f7166"),
  primary: cssVar("--primary", "#1d7a46"),
  accent: cssVar("--accent", "#d9a441"),
  danger: cssVar("--danger", "#c0392b"),
  info: cssVar("--info", "#2563eb"),
  grid: cssVar("--border", "#e3e9e4"),
  fontFamily: '"Poppins", sans-serif',
});

export const baseOptions = (extra = {}) => ({
  chart: {
    toolbar: { show: false },
    fontFamily: chartPalette().fontFamily,
    foreColor: chartPalette().text,
    background: "transparent",
  },
  ...extra,
});

export const currencyFormatter = (value) =>
  new Intl.NumberFormat("en-LK", { maximumFractionDigits: 0 }).format(Number(value) || 0);
