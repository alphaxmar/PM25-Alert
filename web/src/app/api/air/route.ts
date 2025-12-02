export const runtime = "nodejs";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const token = process.env.WAQI_TOKEN;

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "missing_lat_lon" }), { status: 400 });
  }
  if (!token) {
    return new Response(JSON.stringify({ error: "missing_token" }), { status: 500 });
  }

  const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`;
  const res = await fetch(url);
  if (!res.ok) {
    return new Response(JSON.stringify({ error: "upstream_error" }), { status: 502 });
  }
  const data = await res.json();
  return Response.json(data);
}

