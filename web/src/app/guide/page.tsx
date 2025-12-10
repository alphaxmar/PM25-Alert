import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำแนะนำสุขภาพตามค่าฝุ่น PM2.5",
  description: "แนวทางปฏิบัติเมื่อค่าฝุ่นอยู่ในระดับต่าง ๆ",
};

export default function GuidePage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 16 }}>คำแนะนำสุขภาพตามค่าฝุ่น PM2.5</h1>
      <div style={{ lineHeight: 1.8 }}>
        <p>ดี (0–50): ออกกำลังกายได้ตามปกติ</p>
        <p>ปานกลาง (51–100): ผู้มีโรคประจำตัวเริ่มระวัง</p>
        <p>เริ่มมีผลกระทบ (101–150): สวมหน้ากากเมื่อออกนอกอาคาร</p>
        <p>มีผลกระทบ (151–200): หลีกเลี่ยงกิจกรรมกลางแจ้ง</p>
        <p>วิกฤต (201–300): อยู่ภายในอาคารและใช้เครื่องฟอกอากาศ</p>
        <p>อันตรายมาก (300+): งดกิจกรรมกลางแจ้งทั้งหมด</p>
      </div>
    </div>
  );
}
