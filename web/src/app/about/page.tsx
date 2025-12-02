import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับ PM2.5 Alert",
  description: "ข้อมูลเกี่ยวกับแพลตฟอร์มแจ้งเตือนค่าฝุ่น PM2.5 เพื่อสุขภาพของคนไทย",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 16 }}>เกี่ยวกับ PM2.5 Alert</h1>
      
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 12 }}>พันธกิจของเรา</h2>
        <p style={{ lineHeight: 1.6, color: "#333" }}>
          PM2.5 Alert มุ่งมั่นที่จะให้ข้อมูลคุณภาพอากาศที่ถูกต้อง รวดเร็ว และเข้าใจง่ายสำหรับคนไทยทุกคน 
          เพื่อให้คุณสามารถวางแผนการใช้ชีวิตและป้องกันสุขภาพจากฝุ่นละอองขนาดเล็กได้อย่างมีประสิทธิภาพ
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 12 }}>แหล่งข้อมูล</h2>
        <p style={{ lineHeight: 1.6, color: "#333" }}>
          เราเชื่อมต่อข้อมูลโดยตรงจาก World Air Quality Index (WAQI) ซึ่งรวบรวมข้อมูลจากสถานีตรวจวัดคุณภาพอากาศที่เชื่อถือได้ทั่วประเทศไทย
          รวมถึงสถานีของกรมควบคุมมลพิษและกรุงเทพมหานคร
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 12 }}>ฟีเจอร์หลัก</h2>
        <ul style={{ listStyleType: "disc", paddingLeft: 24, lineHeight: 1.6, color: "#333" }}>
          <li>ตรวจสอบค่าฝุ่น PM2.5 แบบเรียลไทม์ตามพิกัดของคุณ</li>
          <li>แสดงระดับคุณภาพอากาศตามมาตรฐานประเทศไทย (ฟ้า เขียว เหลือง ส้ม แดง)</li>
          <li>คำแนะนำการปฏิบัติตัวเพื่อป้องกันสุขภาพ</li>
          <li>ค้นหาและดูข้อมูลคุณภาพอากาศรายจังหวัดครบ 77 จังหวัด</li>
          <li>ใช้งานง่ายผ่าน LINE Official Account</li>
        </ul>
      </section>
    </div>
  );
}
