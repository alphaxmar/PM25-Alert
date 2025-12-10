"use client";

import React, { useEffect, useState } from "react";
import liff from "@line/liff";

export default function AlertsButton() {
  const [url, setUrl] = useState<string>("#");

  useEffect(() => {
    // In a real app, this should be an env var like process.env.NEXT_PUBLIC_LINE_OA_URL
    // For now, we'll use a placeholder or the user needs to set it.
    const oaUrl = process.env.NEXT_PUBLIC_LINE_OA_URL || "https://line.me/R/ti/p/@pm25alert";
    setUrl(oaUrl);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (url === "#") return;

    // Check if running in LIFF
    if (liff.isInClient()) {
      liff.openWindow({
        url: url,
        external: true,
      });
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
        background: "#06c755", // LINE Green
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
