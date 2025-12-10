"use client";
import React from "react";
import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 24, textAlign: "center" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: 12 }}>เกิดข้อผิดพลาดขณะโหลดหน้าเว็บ</h1>
      <p style={{ color: "var(--secondary)", marginBottom: 16 }}>
        โปรดลองรีเฟรชหน้า หรือกลับเข้าสู่หน้าแรกอีกครั้ง
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => reset()}>รีเฟรช</button>
        <Link className="btn btn-outline" href="/">กลับหน้าหลัก</Link>
      </div>
    </div>
  );
}
