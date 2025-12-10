"use client";
import { aqiToThaiCategory } from "@/lib/aqi";

export default function Banner({ aqi }: { aqi: number | null }) {
  const cat = aqi != null ? aqiToThaiCategory(aqi) : null;
  const style = {
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    background: cat ? cat.color : "var(--card-bg)",
    color: cat ? "#fff" : "var(--foreground)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
  };
  const cta = cat && cat.level.includes("วิกฤต") ? "ซื้อหน้ากากด่วน" : "ดูเครื่องฟอกอากาศ";
  const url = process.env.NEXT_PUBLIC_AFFILIATE_URL || "#";
  return (
    <div style={style}>
      <div style={{ fontWeight: 600 }}>{cat ? cat.level : "อัพเดตอากาศแบบเรียลไทม์"}</div>
      <a href={url} style={{ background: "var(--foreground)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600 }}>
        {cta}
      </a>
    </div>
  );
}

