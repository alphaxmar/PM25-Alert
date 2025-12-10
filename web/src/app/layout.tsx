import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: "swap",
});

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
      <body className={prompt.variable}>
        {children}
      </body>
    </html>
  );
}
