import React from "react";
import { Metadata } from "next";
import AlertsButton from "@/components/AlertsButton";

export const metadata: Metadata = {
  title: "แจ้งเตือนคุณภาพอากาศรายวัน",
  description: "ตั้งค่าการแจ้งเตือน PM2.5 รายวันผ่าน LINE OA",
};

export default function AlertsPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 16 }}>แจ้งเตือนคุณภาพอากาศรายวัน</h1>
      <p style={{ lineHeight: 1.6 }}>
        ระบบจะแจ้งเตือนค่าฝุ่น PM2.5 รายวันตามจังหวัดที่คุณสนใจ ผ่าน LINE Official Account
      </p>
      <ul style={{ marginTop: 16, paddingLeft: 20, lineHeight: 1.8 }}>
        <li>เลือกจังหวัดที่ต้องการติดตาม</li>
        <li>รับแจ้งเตือนทุกเช้า พร้อมคำแนะนำการปฏิบัติตัว</li>
        <li>สามารถหยุดรับแจ้งเตือนได้ทุกเมื่อ</li>
      </ul>
      <div style={{ marginTop: 24 }}>
        <AlertsButton />
      </div>
    </div>
  );
}
