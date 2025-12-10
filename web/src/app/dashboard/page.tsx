import Link from "next/link";
import { provinces } from "@/data/provinces";
import { fetchProvinceAQI } from "@/lib/waqi";
import { aqiToThaiCategory } from "@/lib/aqi";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const results = await Promise.all(
    provinces.map(async (p) => {
      const res = await fetchProvinceAQI(p.keyword);
      return { slug: p.slug, nameTh: p.nameTh, aqi: res.aqi };
    })
  );
  
  // Sort descending by AQI
  const ranked = results
    .filter((r) => r.aqi != null)
    .sort((a, b) => (b.aqi as number) - (a.aqi as number))
    .slice(0, 20);

  const dateStr = new Date().toLocaleDateString('th-TH', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Asia/Bangkok'
  });
  
  const timeStr = new Date().toLocaleTimeString('th-TH', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Asia/Bangkok'
  });

  return (
    <div style={{ padding: "24px 16px", maxWidth: 600, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: "1.25rem", color: "var(--foreground)", marginBottom: 8 }}>
          (ค่าเฉลี่ยรายชั่วโมง)
        </h1>
        <h2 style={{ fontSize: "1.5rem", color: "var(--foreground)", marginBottom: 8 }}>
          ปริมาณฝุ่นรายจังหวัด
        </h2>
        <div style={{ color: "var(--secondary)", fontSize: "0.9rem" }}>
          {dateStr}
        </div>
        <div style={{ color: "var(--secondary)", fontSize: "0.9rem" }}>
          เวลา {timeStr} น.
        </div>
      </div>

      <div className="card" style={{ padding: "16px 0", overflow: "hidden" }}>
        {ranked.map((r, index) => {
          const cat = aqiToThaiCategory(r.aqi as number);
          return (
            <Link 
              key={r.slug} 
              href={`/province/${r.slug}`}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: index !== ranked.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                textDecoration: "none"
              }}
            >
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--secondary)", opacity: 0.8, marginBottom: 4 }}>
                  อันดับ {index + 1} :
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)" }}>
                  {r.nameTh}
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ 
                  background: cat.color, 
                  color: "#fff", 
                  padding: "6px 16px", 
                  borderRadius: 20, 
                  fontWeight: 700,
                  minWidth: 70,
                  textAlign: "center"
                }}>
                  {r.aqi}
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--secondary)", opacity: 0.8, width: 40 }}>
                  µg/m³
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link href="/" className="btn btn-outline">
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
