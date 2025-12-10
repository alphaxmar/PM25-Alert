import type { Metadata } from "next";
import "@fontsource/prompt/400.css";
import "@fontsource/prompt/500.css";
import "@fontsource/prompt/600.css";
import "@fontsource/prompt/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ตรวจค่าฝุ่น PM2.5 แบบเรียลไทม์",
  description: "เว็บตรวจคุณภาพอากาศสำหรับคนไทย รองรับ LINE LIFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        {children}
      </body>
    </html>
  );
}
