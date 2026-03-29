import { useEffect, useState } from "react";
import { resolveImage } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function SareeGrid() {
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const response = await fetch(`${API_URL}/inventory?available=true`);
        if (!response.ok) {
          throw new Error("Failed to fetch inventory");
        }

        const data = await response.json();
        setSarees(data);
      } catch (err) {
        setError(err.message || "Unable to load sarees");
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

  if (loading) {
    return <p>Loading collection...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {sarees.map((saree) => (
        <article
          key={saree._id}
          style={{
            border: "1px solid #e7dcc9",
            borderRadius: "20px",
            overflow: "hidden",
            background: "#fffaf2",
          }}
        >
          <img
            src={resolveImage(saree.images?.[0]?.url) || "https://placehold.co/640x800?text=Mana+Vastra"}
            alt={saree.name}
            style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover" }}
          />
          <div style={{ padding: "18px" }}>
            <p style={{ margin: 0, color: "#8d6a2d", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {saree.category}
            </p>
            <h3 style={{ margin: "10px 0 6px", fontSize: "22px" }}>{saree.name}</h3>
            <p style={{ margin: 0, color: "#6b6254", lineHeight: 1.6 }}>{saree.description}</p>
            <p style={{ margin: "16px 0 0", fontWeight: 600 }}>
              Rs. {Number(saree.salePrice || saree.price || 0).toLocaleString("en-IN")}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
