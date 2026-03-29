import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const BACKEND = (import.meta.env.VITE_API_URL || "http://localhost:5001/api").replace("/api", "");

export const resolveImage = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${BACKEND}${url}`;
};
