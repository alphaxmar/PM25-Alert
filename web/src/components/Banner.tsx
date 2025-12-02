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
    background: cat ? cat.color : "#eee",
    color: cat ? "#fff" : "#333",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const cta = cat && cat.level.includes("วิกฤต") ? "ซื้อหน้ากากด่วน" : "ดูเครื่องฟอกอากาศ";
  const url = process.env.NEXT_PUBLIC_AFFILIATE_URL || "#";
  return (
    <div style={style}>
      <div>{cat ? cat.level : "อัพเดตอากาศแบบเรียลไทม์"}</div>
      <a href={url} style={{ background: "#000", color: "#fff", padding: "8px 12px", borderRadius: 8 }}>
        {cta}
      </a>
    </div>
  );
}

