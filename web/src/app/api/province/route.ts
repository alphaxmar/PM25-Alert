export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { fetchProvinceAQI } from "@/lib/waqi";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  if (!keyword) return new Response(JSON.stringify({ error: "missing_keyword" }), { status: 400 });
  const result = await fetchProvinceAQI(keyword);
  return Response.json({ status: "ok", data: result });
}

