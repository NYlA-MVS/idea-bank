import { Search, X } from 'lucide-react'
import { ideas, SDGS, TRACKS } from '../data'
import type { Sdg, Track } from '../data'

export type SortKey = 'score' | 'number' | 'build'
export interface FilterState {
  q: string
  tracks: Track[]
  sdgs: Sdg[]
  min: number
  sort: SortKey
}
export const EMPTY_FILTERS: FilterState = { q: '', tracks: [], sdgs: [], min: 0, sort: 'score' }

const trackCount = (t: Track) => ideas.filter((i) => i.track === t).length
const MAX_TRACK = Math.max(...TRACKS.map((t) => trackCount(t.id)))
const MINS = [
  { v: 0, label: 'ทั้งหมด' },
  { v: 15, label: '15+' },
  { v: 17, label: '17+' },
  { v: 18, label: '18+' },
]

const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

export function Filters({
  f,
  set,
  shown,
}: {
  f: FilterState
  set: (next: FilterState) => void
  shown: number
}) {
  const active = f.q || f.tracks.length || f.sdgs.length || f.min || f.sort !== 'score'
  return (
    <div className="grid gap-6">
      <label className="relative block">
        <span className="sr-only">ค้นหาไอเดีย</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-3" aria-hidden />
        <input
          id="q"
          type="search"
          value={f.q}
          onChange={(e) => set({ ...f, q: e.target.value })}
          placeholder="ค้นหา เช่น ภาษี, scam, Shopee"
          className="h-10 w-full rounded-lg border border-line-2 bg-raise pr-3 pl-9 text-[0.9375rem] placeholder:text-ink-3 focus:border-ink focus:outline-none"
        />
      </label>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-[0.8125rem] font-semibold text-ink-2">Track</legend>
        {TRACKS.map((t) => {
          const on = f.tracks.includes(t.id)
          const c = trackCount(t.id)
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={on}
              onClick={() => set({ ...f, tracks: toggle(f.tracks, t.id) })}
              className={`grid gap-1.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 ${on ? '' : 'hover:bg-panel'}`}
              style={on ? { background: `color-mix(in oklab, ${t.color} 16%, var(--paper))` } : undefined}
            >
              <span className="flex items-baseline justify-between gap-2 text-[0.875rem]">
                <span className="font-medium">
                  {t.short} {t.label}
                </span>
                <span className="num text-ink-3">{c}</span>
              </span>
              <span className="block h-1.5 rounded-[1px]" style={{ width: `${(c / MAX_TRACK) * 100}%`, background: t.color }} />
            </button>
          )
        })}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-[0.8125rem] font-semibold text-ink-2">SDG</legend>
        <div className="flex flex-wrap gap-1.5">
          {SDGS.map((s) => {
            const on = f.sdgs.includes(s.id)
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                title={s.label}
                onClick={() => set({ ...f, sdgs: toggle(f.sdgs, s.id) })}
                className={`num h-8 rounded-md border px-2.5 text-[0.8125rem] font-medium transition-colors duration-150 ${
                  on ? 'border-ink bg-ink text-paper' : 'border-line-2 text-ink-2 hover:border-ink hover:text-ink'
                }`}
              >
                SDG {s.id}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-[0.8125rem] font-semibold text-ink-2">คะแนนรวมขั้นต่ำ</legend>
        <div className="grid grid-cols-4 rounded-lg border border-line-2 p-0.5">
          {MINS.map((m) => (
            <button
              key={m.v}
              type="button"
              aria-pressed={f.min === m.v}
              onClick={() => set({ ...f, min: m.v })}
              className={`num h-8 rounded-md text-[0.8125rem] font-medium transition-colors duration-150 ${
                f.min === m.v ? 'bg-ink text-paper' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2">
        <span className="text-[0.8125rem] font-semibold text-ink-2">เรียงตาม</span>
        <select
          id="sort"
          value={f.sort}
          onChange={(e) => set({ ...f, sort: e.target.value as SortKey })}
          className="h-10 rounded-lg border border-line-2 bg-raise px-2.5 text-[0.9375rem] focus:border-ink focus:outline-none"
        >
          <option value="score">คะแนนรวมสูงสุด</option>
          <option value="build">สร้างทันใน 1 วันได้ง่ายสุด</option>
          <option value="number">เลขไอเดีย</option>
        </select>
      </label>

      <div className="flex items-center justify-between gap-3 border-t border-line pt-4 text-[0.8125rem] text-ink-2">
        <span className="num">แสดง {shown} จาก {ideas.length}</span>
        {active ? (
          <button type="button" onClick={() => set(EMPTY_FILTERS)} className="inline-flex items-center gap-1 font-medium text-ink hover:underline">
            <X className="size-3.5" aria-hidden /> ล้างตัวกรอง
          </button>
        ) : null}
      </div>
    </div>
  )
}
