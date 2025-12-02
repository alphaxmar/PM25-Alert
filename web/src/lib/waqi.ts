type Station = { aqi: number | string; station?: { name?: string } };

export async function fetchProvinceAQI(keyword: string): Promise<{ aqi: number | null; stationName?: string }>
{
  const token = process.env.WAQI_TOKEN;
  if (!token) return { aqi: null };
  const url = `https://api.waqi.info/search/?token=${token}&keyword=${encodeURIComponent(keyword)}`;
  const res = await fetch(url);
  if (!res.ok) return { aqi: null };
  const json = await res.json();
  const data: Station[] = json?.data || [];
  const numeric = data
    .map((d) => ({ aqi: typeof d.aqi === "string" ? parseInt(d.aqi as string, 10) : (d.aqi as number), name: d.station?.name }))
    .filter((d) => Number.isFinite(d.aqi));
  if (numeric.length === 0) return { aqi: null };
  numeric.sort((a, b) => b.aqi - a.aqi);
  return { aqi: numeric[0].aqi, stationName: numeric[0].name };
}

