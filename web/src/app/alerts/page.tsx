"use client";

import React, { useState } from "react";
import AlertsButton from "@/components/AlertsButton";
import { provinces } from "@/data/provinces";

export default function AlertsPage() {
  const [selectedProvince, setSelectedProvince] = useState("");

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
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>เลือกจังหวัดที่ต้องการรับแจ้งเตือน</label>
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: "1rem",
            marginBottom: 24,
            fontFamily: "inherit"
          }}
        >
          <option value="" disabled>-- กรุณาเลือกจังหวัด --</option>
          {provinces.map((p) => (
            <option key={p.slug} value={p.nameTh}>{p.nameTh}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 0 }}>
        <AlertsButton province={selectedProvince || undefined} />
        {selectedProvince && (
          <p style={{ marginTop: 12, fontSize: "0.9rem", color: "var(--secondary)" }}>
            * ระบบจะบันทึกการตั้งค่าสำหรับ <strong>{selectedProvince}</strong> หลังจากที่คุณเพิ่มเพื่อนใน LINE
          </p>
        )}
      </div>
    </div>
  );
}
