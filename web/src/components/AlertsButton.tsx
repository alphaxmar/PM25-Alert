"use client";

import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import { initLiff } from "@/lib/liff";

export default function AlertsButton({ province }: { province?: string }) {
  const [url, setUrl] = useState<string>("#");
  const [inClient, setInClient] = useState(false);

  useEffect(() => {
    const oaUrl = process.env.NEXT_PUBLIC_LINE_OA_URL || "https://lin.ee/AN1qObp";
    setUrl(oaUrl);
    initLiff().then((info) => {
      if (info?.isInClient) setInClient(true);
    });
  }, []);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (url === "#") return;

    if (inClient) {
      try {
        if (province) {
          await liff.sendMessages([{ type: "text", text: `Subscribe ${province}` }]);
        }
      } catch {}
      try {
        liff.openWindow({ url, external: true });
      } catch {}
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <a
      href={url}
      onClick={handleClick}
      style={{
        display: "inline-block",
        padding: "12px 24px",
        borderRadius: 8,
        background: "#06c755",
        color: "#fff",
        fontWeight: "bold",
        textDecoration: "none",
        boxShadow: "0 4px 6px rgba(6, 199, 85, 0.2)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      เปิดใช้งานผ่าน LINE
    </a>
  );
}
