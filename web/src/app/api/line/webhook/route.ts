export const runtime = "nodejs";

import { NextRequest } from "next/server";
import crypto from "crypto";

type KVNamespace = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
  list: (opts: { prefix?: string }) => Promise<{ keys: { name: string }[] }>;
};

type Env = { SUBSCRIPTIONS?: KVNamespace };

function verifySignature(body: string, signature: string | null): boolean {
  const secret = process.env.LINE_CHANNEL_SECRET || "";
  if (!secret || !signature) return false;
  const hmac = crypto.createHmac("sha256", secret).update(body).digest("base64");
  return hmac === signature;
}

function getKV(): KVNamespace | undefined {
  const raw = (globalThis as unknown as { __env__?: Env; env?: Env });
  const env = raw.__env__ || raw.env;
  return env?.SUBSCRIPTIONS;
}

async function saveSubscription(userId: string, province: string) {
  const kv = getKV();
  if (!kv) return false;
  const data = JSON.stringify({ province, updatedAt: Date.now() });
  await kv.put(`sub:${userId}`, data);
  return true;
}

async function deleteSubscription(userId: string) {
  const kv = getKV();
  if (!kv) return false;
  await kv.delete(`sub:${userId}`);
  return true;
}

async function replyMessage(replyToken: string, text: string) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
  if (!token) return;
  try {
    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ replyToken, messages: [{ type: "text", text }] }),
    });
  } catch {}
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-line-signature");
  const bodyText = await req.text();
  if (!verifySignature(bodyText, signature)) {
    return new Response("invalid_signature", { status: 401 });
  }

  const json = JSON.parse(bodyText) as { events?: unknown[] };
  const events = (json?.events || []) as Array<{ type: string; message?: { type: string; text?: string }; source?: { userId?: string }; replyToken?: string }>;
  for (const ev of events) {
    const type = ev.type;
    const userId = ev?.source?.userId;
    const replyToken = ev?.replyToken;
    if (type === "message" && ev.message?.type === "text" && userId && ev.message?.text) {
      const text: string = (ev.message.text || "").trim();
      if (/^subscribe\s+/i.test(text)) {
        const province = text.replace(/^subscribe\s+/i, "").trim();
        if (province) {
          await saveSubscription(userId, province);
          if (replyToken) {
            await replyMessage(replyToken, `สมัครรับแจ้งเตือนจังหวัด: ${province} สำเร็จ`);
          }
        }
      } else if (/^unsubscribe/i.test(text)) {
        await deleteSubscription(userId);
        if (replyToken) {
          await replyMessage(replyToken, "ยกเลิกรับแจ้งเตือนเรียบร้อย");
        }
      }
    }
  }
  return new Response("ok");
}

