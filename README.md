# Idea Bank — Sea × OpenAI Codex Hackathon Thailand

เครื่องมือช่วยทีมเลือกไอเดียสำหรับ **Sea × OpenAI Regional Codex Hackathon Thailand** (งานวันเสาร์ 21 พ.ย. 2026 · ปิดรับสมัคร 23 ต.ค. 2026)

- **317 ไอเดีย** — Track 1 (Autonomous & Adaptive AI) 104 · Track 2 (AI-Native Products & Operations) 120 · Track 3 (Deep Domain AI) 93
- ทุกไอเดียดัดแปลงจากผลงานที่ชนะ hackathon จริง พร้อมลิงก์แหล่งที่มา (**158 sources**)
- ให้คะแนนตามเกณฑ์ตัดสิน 4 ข้อ: **P**roblem framing · **B**uild quality · **D**epth of thinking · **C**odex use (ข้อละ 5 รวม 20)
- มี detail เชิงลึก (problem, flow, autonomy, Codex role, MVP 12 ชม., demo, risks) และแผน upgrade

> คะแนนและรายละเอียดเป็นการประเมินของ Claude ไม่ใช่ผลจริง ตัวเลขที่มีป้าย "(หาตัวเลขอ้างอิงก่อน pitch)" ต้องตรวจสอบก่อนใช้

## ฟีเจอร์

ค้นหา · กรองตาม Track / SDG (2, 3, 8, 9, 16) · เรียงตามคะแนน · shortlist (เก็บใน browser ของแต่ละคน) · เปรียบเทียบไอเดีย · ดู detail และกระโดดไปไอเดีย combo · light/dark · ใช้บนมือถือได้

## Stack

React 19 + TypeScript + Tailwind CSS v4 บน Vite → build เป็น HTML ไฟล์เดียวแล้ว publish เป็น Claude artifact

```bash
npm install
npm run dev      # dev server
npm run build    # tsc + vite build + dist/artifact.html สำหรับ publish
npm run lint     # oxlint
```

## โครงสร้าง

| Path | เนื้อหา |
|---|---|
| `src/data/ideas.json` | ไอเดียทั้งหมด (name, track, sdgs, basedOn, idea, twist, score, detail, upgrade) |
| `src/data/sources.json` | ผลงานที่ชนะ hackathon ที่ใช้อ้างอิง พร้อมชื่องานและ URL |
| `src/components/` | UI: list, filters, detail, views |
| `scripts-artifact.mjs` | แปลง `dist/index.html` เป็นรูปแบบ artifact page |
| `PRODUCT.md`, `DESIGN.md` | product brief และ design system |
