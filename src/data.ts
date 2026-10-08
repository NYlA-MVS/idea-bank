import rawIdeas from './data/ideas.json'
import rawSources from './data/sources.json'

export type Track = 1 | 2 | 3
export type Sdg = 2 | 3 | 4 | 8 | 9 | 11 | 13 | 16
export type Score = [number, number, number, number]

export interface IdeaDetail {
  problem: string
  users: string
  how: string[]
  autonomy: string
  unexpected: string[]
  codex: string[]
  mvp: string[]
  data: string
  demo: string
  sdg: string
  sea: string
  risks: string[]
  pitch: string
  domain?: string[]
  expert?: string
}

export interface IdeaUpgrade {
  weakness: string
  fixes: string[]
  killer: string
  proof: string
  combo: string
}

export interface Idea {
  n: number
  name: string
  track: Track
  sdgs: Sdg[]
  basedOn: string[]
  idea: string
  twist: string
  scoreBefore: Score
  score: Score
  detail: IdeaDetail
  upgrade: IdeaUpgrade
}

export interface Source {
  event: string
  url: string
}

export const ideas = rawIdeas as Idea[]
export const sources = rawSources as Record<string, Source>
export const byNumber = new Map(ideas.map((i) => [i.n, i]))

export const total = (s: Score) => s[0] + s[1] + s[2] + s[3]

export const TRACKS: { id: Track; short: string; label: string; color: string }[] = [
  { id: 1, short: 'T1', label: 'Autonomous & Adaptive', color: 'var(--fri)' },
  { id: 2, short: 'T2', label: 'AI-Native Products & Ops', color: 'var(--sat)' },
  { id: 3, short: 'T3', label: 'Deep Domain', color: 'var(--thu)' },
]
export const trackOf = (t: Track) => TRACKS[t - 1]

export const SDGS: { id: Sdg; label: string }[] = [
  { id: 2, label: 'ขจัดความหิวโหย' },
  { id: 3, label: 'สุขภาพ' },
  { id: 4, label: 'การศึกษา' },
  { id: 8, label: 'งานที่มีคุณค่า' },
  { id: 9, label: 'อุตสาหกรรม โครงสร้างพื้นฐาน' },
  { id: 11, label: 'เมืองยั่งยืน' },
  { id: 13, label: 'รับมือโลกร้อน' },
  { id: 16, label: 'ยุติธรรม สถาบันที่เข้มแข็ง' },
]

export const CRITERIA = [
  { key: 'P', label: 'Problem framing', th: 'ตั้งโจทย์' },
  { key: 'B', label: 'Build quality', th: 'สร้างทันใน 1 วัน' },
  { key: 'D', label: 'Depth of thinking', th: 'ความลึกของความคิด' },
  { key: 'C', label: 'Use of Codex', th: 'ใช้ Codex' },
] as const

export type Band = 'high' | 'mid' | 'low'
export const bandOf = (t: number): Band => (t >= 18 ? 'high' : t >= 15 ? 'mid' : 'low')
export const BAND_COLOR: Record<Band, string> = { high: 'var(--wed)', mid: 'var(--mon)', low: 'var(--tue)' }
export const BAND_LABEL: Record<Band, string> = { high: '18 ขึ้นไป', mid: '15–17', low: '14 ลงมา' }
