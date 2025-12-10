"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { provinces } from "@/data/provinces";
import { aqiToThaiCategory } from "@/lib/aqi";
import { initLiff, closeWindow } from "@/lib/liff";
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
  const router = useRouter();

  useEffect(() => {
    initLiff().then((info) => {
      if (info && info.loggedIn && info.displayName) setGreet(`สวัสดี ${info.displayName}`);
      if (info?.isInClient) setIsInClient(true);
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
          setCity(json.data.city?.name || "");
        } else {
          setError("ไม่พบข้อมูลพื้นที่นี้");
        }
      },
      () => {
        setError("ไม่ได้รับอนุญาตให้เข้าถึงพิกัด");
      }
    );
  }, []);

  const category = aqi != null ? aqiToThaiCategory(aqi) : null;

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>ตรวจค่าฝุ่น PM2.5</h1>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        <Link href="/" style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8 }}>หน้าแรก</Link>
        <Link href="/dashboard" style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8 }}>สถานการณ์ทั่วประเทศ</Link>
        <Link href="/province/bangkok" style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8 }}>กรุงเทพฯ</Link>
        <Link href="/province/chiang-mai" style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8 }}>เชียงใหม่</Link>
        <Link href="/province/khon-kaen" style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8 }}>ขอนแก่น</Link>
        <Link href="/province/phuket" style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8 }}>ภูเก็ต</Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>เลือกจังหวัด:</span>
          <select
            onChange={(e) => {
              const slug = e.target.value;
              if (slug) router.push(`/province/${slug}`);
            }}
            defaultValue=""
            style={{ padding: "8px", borderRadius: 8, border: "1px solid #ddd" }}
         >
            <option value="" disabled>เลือกจังหวัดทั้งหมด</option>
            {provinces.map((p) => (
              <option key={p.slug} value={p.slug}>{p.nameTh}</option>
            ))}
          </select>
        </div>
      </div>
      {greet && <p>{greet}</p>}
      {aqi != null && category ? (
        <div style={{ borderRadius: 12, padding: 16, background: category.color, color: "#fff" }}>
          <div style={{ fontSize: 48, fontWeight: 700 }}>{aqi}</div>
          <div>{city}</div>
          <div>{category.level}</div>
          <div>{category.advice}</div>
        </div>
      ) : (
        <p>กำลังค้นหาพิกัดและดึงข้อมูลคุณภาพอากาศ...</p>
      )}
      {error && <p style={{ color: "#c00" }}>{error}</p>}
      {isInClient && (
        <button
          onClick={closeWindow}
          style={{
            marginTop: 16,
            padding: "10px 20px",
            background: "#06c755",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            width: "100%",
            fontSize: 16,
          }}
        >
          ปิดหน้าต่าง
        </button>
      )}
      <Banner aqi={aqi} />
      <div style={{ marginTop: 32, textAlign: "center", fontSize: 12, color: "#666" }}>
        Last updated: {new Date().toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' })}
      </div>
    </div>
  );
}
