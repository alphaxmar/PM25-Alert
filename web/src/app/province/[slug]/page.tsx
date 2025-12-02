import { provinces } from "@/data/provinces";
import { fetchProvinceAQI } from "@/lib/waqi";
import { aqiToThaiCategory } from "@/lib/aqi";
import type { Metadata } from "next";
import Banner from "@/components/Banner";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const p = provinces.find((x) => x.slug === resolvedParams.slug);
  const title = p ? `ค่าฝุ่น PM2.5 จังหวัด${p.nameTh} วันนี้` : "ค่าฝุ่น PM2.5";
  const description = p ? `เช็คค่าฝุ่น PM2.5 ${p.nameTh} แบบเรียลไทม์ พร้อมคำแนะนำสุขภาพ` : "ตรวจคุณภาพอากาศแบบเรียลไทม์";
  return { title, description };
}

export default async function ProvincePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const p = provinces.find((x) => x.slug === resolvedParams.slug);
  if (!p) return <div style={{ padding: 24 }}>ไม่พบจังหวัด</div>;

  const data = await fetchProvinceAQI(p.keyword);
  const cat = data.aqi != null ? aqiToThaiCategory(data.aqi) : null;

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>ค่าฝุ่น PM2.5 จังหวัด{p.nameTh}</h1>
      {data.aqi != null && cat ? (
        <div style={{ borderRadius: 12, padding: 16, background: cat.color, color: "#fff", marginTop: 16 }}>
          <div style={{ fontSize: 48, fontWeight: 700 }}>{data.aqi}</div>
          <div>{data.stationName || p.nameTh}</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{cat.level}</div>
          <div style={{ marginTop: 8 }}>{cat.advice}</div>
        </div>
      ) : (
        <p>ไม่พบข้อมูลจุดตรวจวัดในขณะนี้</p>
      )}
      <div style={{ marginTop: 24 }}>
        <h2>เกี่ยวกับคุณภาพอากาศใน{p.nameTh}</h2>
        <p>
          หน้านี้แสดงข้อมูลคุณภาพอากาศล่าสุดในจังหวัด{p.nameTh} โดยดึงข้อมูลจากสถานีตรวจวัดที่ใกล้ที่สุด
          เพื่อให้คุณวางแผนกิจกรรมประจำวันได้อย่างเหมาะสม หากค่าฝุ่นสูงเกินมาตรฐาน ควรใช้อุปกรณ์ป้องกันและหลีกเลี่ยงกิจกรรมกลางแจ้ง
        </p>
      </div>
      <Banner aqi={data.aqi} />
    </div>
  );
}

