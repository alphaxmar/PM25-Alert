export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { provinces } from "@/data/provinces";
import { fetchProvinceAQI } from "@/lib/waqi";

type KVNamespace = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
  list: (opts: { prefix?: string }) => Promise<{ keys: { name: string }[] }>;
};

type Env = { SUBSCRIPTIONS?: KVNamespace };

function getKV(): KVNamespace | undefined {
  const raw = (globalThis as unknown as { __env__?: Env; env?: Env });
  const env = raw.__env__ || raw.env;
  return env?.SUBSCRIPTIONS;
}

async function pushMessage(userId: string, text: string) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
  if (!token) return;
  try {
    await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ to: userId, messages: [{ type: "text", text }] }),
    });
  } catch {}
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key") || "";
  if (!process.env.CRON_SECRET || key !== process.env.CRON_SECRET) {
    return new Response("unauthorized", { status: 401 });
  }

  const kv = getKV();
  if (!kv) return new Response("kv_unavailable", { status: 500 });
  const list = await kv.list({ prefix: "sub:" });
  const keys = list?.keys || [];

  let sent = 0;
  for (const k of keys) {
    const userId = k.name.replace(/^sub:/, "");
    const val = await kv.get(k.name);
    if (!val) continue;
    const { province } = JSON.parse(val);
    const p = provinces.find((x) => x.nameTh === province);
    const keyword = p?.keyword || province;
    const res = await fetchProvinceAQI(keyword);
    if (res.aqi != null) {
      const aqi = res.aqi as number;
      if (aqi >= 100) {
        const text = `แจ้งเตือน PM2.5 (${province})\nAQI: ${aqi}\nดูรายละเอียด: ${req.nextUrl.origin}/province/${p?.slug || ""}`;
        await pushMessage(userId, text);
        sent++;
      }
    }
  }

  return Response.json({ status: "ok", sent, total: keys.length });
}

