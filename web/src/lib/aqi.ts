export type ThaiAqiLevel = {
  level: string;
  color: string;
  advice: string;
};

export function aqiToThaiCategory(aqi: number): ThaiAqiLevel {
  if (aqi <= 50) return { level: "ดี", color: "#4CAF50", advice: "ออกกำลังกายได้ตามปกติ" };
  if (aqi <= 100) return { level: "ปานกลาง", color: "#FFC107", advice: "เริ่มระวังสำหรับผู้มีโรคประจำตัว" };
  if (aqi <= 150) return { level: "เริ่มมีผลกระทบ", color: "#FF9800", advice: "สวมหน้ากากเมื่อออกนอกอาคาร" };
  if (aqi <= 200) return { level: "มีผลกระทบ", color: "#F44336", advice: "หลีกเลี่ยงกิจกรรมกลางแจ้ง" };
  if (aqi <= 300) return { level: "วิกฤต", color: "#9C27B0", advice: "อยู่ภายในอาคารและใช้เครื่องฟอกอากาศ" };
  return { level: "อันตรายมาก", color: "#6A1B9A", advice: "งดกิจกรรมกลางแจ้งทั้งหมด" };
}

