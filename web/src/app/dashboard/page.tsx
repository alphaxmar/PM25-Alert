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
  const ranked = results
    .filter((r) => r.aqi != null)
    .sort((a, b) => (b.aqi as number) - (a.aqi as number))
    .slice(0, 20);

  return (
    <div style={{ padding: 24 }}>
      <h1>สถานการณ์ฝุ่นทั่วไทย</h1>
      <p>จัดอันดับ 20 จังหวัดที่อากาศแย่สุด</p>
      <ul>
        {ranked.map((r) => {
          const cat = aqiToThaiCategory(r.aqi as number);
          return (
            <li key={r.slug} style={{ marginBottom: 8 }}>
              <Link href={`/province/${r.slug}`}>{r.nameTh}</Link>{" "}
              <span style={{ background: cat.color, color: "#fff", padding: "2px 6px", borderRadius: 6, marginLeft: 8 }}>
                {r.aqi}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
