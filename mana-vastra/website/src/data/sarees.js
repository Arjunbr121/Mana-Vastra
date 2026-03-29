export const CATEGORIES = [
  { key: "All", label: "All Sarees", dbValue: null },
  { key: "Silk", label: "Silk Saree", dbValue: "Silk Saree" },
  { key: "Cotton", label: "Cotton Saree", dbValue: "Cotton Saree" },
  { key: "Designer", label: "Designer Saree", dbValue: "Designer Saree" },
  { key: "Fancy", label: "Fancy Saree", dbValue: "Fancy Saree" },
  { key: "Ilkal", label: "Ilkal Saree", dbValue: "Ilkal Saree" },
  { key: "Banarasi", label: "Banarasi Saree", dbValue: "Banarasi Saree" },
  { key: "Daily", label: "Daily Wear Saree", dbValue: "Daily Wear Saree" },
];

export const SAREES = [
  // SILK
  {
    id: "MV1001",
    name: "Kanjivaram Classic",
    type: "Silk",
    category: "Silk",
    price: 4999,
    color: "#8B1A1A",
  },
  {
    id: "MV1002",
    name: "Pure Mysore Silk",
    type: "Silk",
    category: "Silk",
    price: 3799,
    color: "#4A235A",
  },
  {
    id: "MV1003",
    name: "South Silk Zari",
    type: "Silk",
    category: "Silk",
    price: 5499,
    color: "#1A3A5C",
  },
  // COTTON
  {
    id: "MV2001",
    name: "Handloom Cotton",
    type: "Cotton",
    category: "Cotton",
    price: 999,
    color: "#2C5F2E",
  },
  {
    id: "MV2002",
    name: "Tant Bengal Cotton",
    type: "Cotton",
    category: "Cotton",
    price: 1299,
    color: "#5C4827",
  },
  {
    id: "MV2003",
    name: "Venkatagiri Cotton",
    type: "Cotton",
    category: "Cotton",
    price: 1499,
    color: "#1A4A6B",
  },
  // DESIGNER
  {
    id: "MV3001",
    name: "Embroidered Fusion",
    type: "Designer",
    category: "Designer",
    price: 3299,
    color: "#7B1E4A",
  },
  {
    id: "MV3002",
    name: "Digital Print Chic",
    type: "Designer",
    category: "Designer",
    price: 2499,
    color: "#1E4A5C",
  },
  // FANCY
  {
    id: "MV4001",
    name: "Organza Glam",
    type: "Fancy",
    category: "Fancy",
    price: 2799,
    color: "#5A1A5A",
  },
  {
    id: "MV4002",
    name: "Net Party Wear",
    type: "Fancy",
    category: "Fancy",
    price: 1999,
    color: "#8B4513",
  },
  // ILKAL
  {
    id: "MV5001",
    name: "Traditional Ilkal",
    type: "Ilkal",
    category: "Ilkal",
    price: 1799,
    color: "#4A2C0A",
  },
  {
    id: "MV5002",
    name: "Ilkal with Kasuti",
    type: "Ilkal",
    category: "Ilkal",
    price: 2199,
    color: "#0A3A4A",
  },
  // BANARASI
  {
    id: "MV6001",
    name: "Banarasi Brocade",
    type: "Banarasi",
    category: "Banarasi",
    price: 6499,
    color: "#6B1A1A",
  },
  {
    id: "MV6002",
    name: "Pure Georgette Banarasi",
    type: "Banarasi",
    category: "Banarasi",
    price: 4299,
    color: "#1A1A6B",
  },
  // DAILY
  {
    id: "MV7001",
    name: "Morning Breeze Daily",
    type: "Daily Wear",
    category: "Daily",
    price: 699,
    color: "#2E5A2E",
  },
  {
    id: "MV7002",
    name: "Everyday Comfort",
    type: "Daily Wear",
    category: "Daily",
    price: 549,
    color: "#3A2A1A",
  },
  {
    id: "MV7003",
    name: "Office Drape",
    type: "Daily Wear",
    category: "Daily",
    price: 799,
    color: "#1A2A4A",
  },
];

export const PATTERNS = [
  ["#9B2335", "#C9A84C"],
  ["#2E6B3E", "#C9A84C"],
  ["#4A235A", "#F0D080"],
  ["#1A3A5C", "#C9A84C"],
  ["#6B1A1A", "#F0D080"],
  ["#0A3A4A", "#C9A84C"],
  ["#5A1A5A", "#F0D080"],
  ["#3A2A1A", "#C9A84C"],
];

export const formatPrice = (p) => "₹" + p.toLocaleString("en-IN");
