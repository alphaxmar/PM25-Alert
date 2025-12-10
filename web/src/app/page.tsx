"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { provinces } from "@/data/provinces";
import { aqiToThaiCategory } from "@/lib/aqi";
import { initLiff, closeWindow, login, openHalfView } from "@/lib/liff";
import Banner from "@/components/Banner";

type AirResponse = {
  status: string;
  data?: { aqi: number; city?: { name?: string } };
};

export default function Home() {
  const [aqi, setAqi] = useState<number | null>(null);
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [greet, setGreet] = useState<string>("");
  const [isInClient, setIsInClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [compact, setCompact] = useState(false);

  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('th-TH', { dateStyle: 'long', timeStyle: 'short' }));
  }, []);

  useEffect(() => {
    initLiff().then((info) => {
      if (info && info.loggedIn && info.displayName) setGreet(`สวัสดี ${info.displayName}`);
      if (info?.isInClient) setIsInClient(true);
      if (info) setIsLoggedIn(info.loggedIn);
    });

    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(3);
        const lon = pos.coords.longitude.toFixed(3);
        const res = await fetch(`/api/air?lat=${lat}&lon=${lon}`);
        if (!res.ok) {
          setError("ไม่สามารถดึงข้อมูลได้");
          return;
        }
        const json: AirResponse = await res.json();
        if (json.status === "ok" && json.data) {
          setAqi(json.data.aqi);
          setCity(json.data.city?.name || "พิกัดปัจจุบัน");
        } else {
          setError("ไม่พบข้อมูลพื้นที่นี้");
        }
      },
      () => {
        setError("ไม่ได้รับอนุญาตให้เข้าถึงพิกัด");
      }
    );
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get("view");
      if (v === "half") setCompact(true);
      if (v === "full") setCompact(false);
    } catch {}
  }, []);

  const category = aqi != null ? aqiToThaiCategory(aqi) : null;

  return (
    <div style={{ padding: compact ? 12 : 24, maxWidth: 720, margin: "0 auto", paddingBottom: 80 }}>
      {/* Header / Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: compact ? "1.5rem" : "1.75rem", color: "var(--foreground)" }}>PM2.5 Alert</h1>
        {!isLoggedIn ? (
          <button onClick={login} className="btn btn-primary" style={{ fontSize: "0.875rem", padding: "6px 12px" }}>
            เข้าสู่ระบบ LINE
          </button>
        ) : (
          <span style={{ fontSize: "0.875rem", color: "var(--secondary)" }}>{greet}</span>
        )}
      </div>

      {/* Main AQI Card */}
      {aqi != null && category ? (
        <div className="card" style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: "1.125rem", fontWeight: 500, marginBottom: 8, color: "var(--secondary)" }}>
            {city}
          </div>
          <div style={{ fontSize: "0.875rem", color: "#999", marginBottom: 16 }}>
            {currentDate}
          </div>
          
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 16 }}>
             {/* Placeholder for mascot */}
            <div style={{ fontSize: "4rem" }}>😷</div>
            <div>
              <div style={{ fontSize: "0.875rem", color: "var(--secondary)", fontWeight: 600 }}>PM2.5</div>
              <div style={{ fontSize: "4rem", fontWeight: 700, lineHeight: 1, color: category.color }}>
                {aqi}
              </div>
              <div style={{ fontSize: "0.875rem", color: "#999" }}>µg/m³</div>
            </div>
          </div>

          <div style={{ 
            background: category.color, 
            color: "#fff", 
            padding: "8px 16px", 
            borderRadius: 8, 
            display: "inline-block", 
            fontWeight: 600,
            marginBottom: 12
          }}>
            {category.level}
          </div>
          
          <div style={{ 
            background: "#F5F5F5", 
            padding: "12px", 
            borderRadius: 12, 
            fontSize: "0.9rem",
            color: "#555"
          }}>
            {category.advice}
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: "center", padding: 48, marginBottom: 24 }}>
           {error ? (
             <p style={{ color: "var(--danger)" }}>{error}</p>
           ) : (
             <p style={{ color: "var(--secondary)" }}>กำลังค้นหาพิกัดและดึงข้อมูล...</p>
           )}
        </div>
      )}

      {/* Quick Menu */}
      <h2 style={{ fontSize: "1.25rem", marginBottom: 12, color: "var(--foreground)" }}>เมนูลัด</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}>
        <Link href="/dashboard" className="card" style={{ padding: 16, textAlign: "center", display: "block" }}>
           <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>🇹🇭</div>
           <div style={{ fontWeight: 600 }}>อันดับทั่วไทย</div>
        </Link>
        <Link href="/alerts" className="card" style={{ padding: 16, textAlign: "center", display: "block" }}>
           <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>🔔</div>
           <div style={{ fontWeight: 600 }}>ตั้งแจ้งเตือน</div>
        </Link>
        <Link href="/guide" className="card" style={{ padding: 16, textAlign: "center", display: "block" }}>
           <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>📖</div>
           <div style={{ fontWeight: 600 }}>คำแนะนำ</div>
        </Link>
        <div className="card" style={{ padding: 16, textAlign: "center", cursor: "pointer" }} onClick={() => isInClient ? openHalfView() : setCompact(!compact)}>
           <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>📱</div>
           <div style={{ fontWeight: 600 }}>{compact ? "Full View" : "Half View"}</div>
        </div>
      </div>

      {/* Province Selector */}
      {!compact && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: 12, color: "var(--foreground)" }}>ดูค่าฝุ่นรายจังหวัด</h2>
          <div style={{ position: "relative" }}>
            <select
              onChange={(e) => {
                const slug = e.target.value;
                if (slug) router.push(`/province/${slug}`);
              }}
              defaultValue=""
              style={{ 
                width: "100%", 
                padding: "12px", 
                borderRadius: 12, 
                border: "1px solid #ddd",
                background: "#fff",
                fontFamily: "inherit",
                fontSize: "1rem"
              }}
            >
              <option value="" disabled>เลือกจังหวัด...</option>
              {provinces.map((p) => (
                <option key={p.slug} value={p.slug}>{p.nameTh}</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: "flex", gap: 8, marginTop: 12, overflowX: "auto", paddingBottom: 8 }}>
            {["bangkok", "chiang-mai", "khon-kaen", "phuket"].map(slug => {
               const p = provinces.find(x => x.slug === slug);
               return p ? (
                 <Link key={slug} href={`/province/${slug}`} className="btn btn-outline" style={{ whiteSpace: "nowrap" }}>
                   {p.nameTh}
                 </Link>
               ) : null;
            })}
          </div>
        </div>
      )}

      {isInClient && (
        <button
          onClick={closeWindow}
          className="btn"
          style={{
            width: "100%",
            background: "#06c755",
            color: "#fff",
            marginTop: 12
          }}
        >
          ปิดหน้าต่าง
        </button>
      )}

      <Banner aqi={aqi} />
    </div>
  );
}
