import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อเรา - PM2.5 Alert",
  description: "ช่องทางการติดต่อทีมงาน PM2.5 Alert",
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 16 }}>ติดต่อเรา</h1>
      
      <p style={{ marginBottom: 24, lineHeight: 1.6 }}>
        หากคุณมีข้อเสนอแนะ แจ้งปัญหาการใช้งาน หรือต้องการสอบถามข้อมูลเพิ่มเติม 
        สามารถติดต่อทีมงาน PM2.5 Alert ได้ผ่านช่องทางดังนี้
      </p>

      <div style={{ 
        padding: 24, 
        border: "1px solid #eee", 
        borderRadius: 12, 
        backgroundColor: "#f9f9f9" 
      }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 16 }}>ช่องทางติดต่อ</h3>
        
        <div style={{ marginBottom: 12 }}>
          <strong>อีเมล:</strong> contact@pm25alert.com
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <strong>LINE Official Account:</strong> @pm25alert
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <strong>Facebook Page:</strong> PM2.5 Alert Thailand
        </div>

        <div style={{ marginTop: 24, fontSize: "0.9rem", color: "#666" }}>
          * ทีมงานจะพยายามตอบกลับภายใน 24 ชั่วโมง
        </div>
      </div>
    </div>
  );
}