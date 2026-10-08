import { ArrowDown, ArrowUp, Columns3, Ribbon as RibbonIcon } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { BAND_COLOR, BAND_LABEL, byNumber, total, TRACKS, trackOf } from '../data'
import type { Band, Idea } from '../data'
import { Empty, IconButton, Ribbon, ScoreBars, SdgChips, Total, TrackTag } from './bits'

/* ---------- Shortlist: ranked อันดับ 1..n ---------- */

export function ShortlistView({
  list,
  onOpen,
  onMove,
  onTie,
  compare,
  onCompare,
  compareFull,
  onCompareTop,
}: {
  list: number[]
  onOpen: (n: number) => void
  onMove: (n: number, dir: -1 | 1) => void
  onTie: (n: number) => void
  compare: number[]
  onCompare: (n: number) => void
  compareFull: boolean
  onCompareTop: () => void
}) {
  if (!list.length)
    return (
      <Empty title="ยังไม่มีไอเดียใน Shortlist">
        <p>
          กดปุ่ม <RibbonIcon className="inline size-4 align-[-2px] text-sun" aria-label="Ribbon" /> ที่ไอเดียในหน้ารายการ เพื่อผูก Ribbon สีแดง แล้วไอเดียจะมาเรียงอันดับที่นี่
        </p>
      </Empty>
    )
  return (
    <div className="mx-auto grid w-full max-w-[56rem] gap-5 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[1.375rem] font-semibold">Shortlist</h2>
          <p className="text-[0.9375rem] text-ink-2">เรียงอันดับที่ทีมอยากทำมากที่สุดไว้บนสุด ใช้ลูกศรเลื่อนขึ้นลง</p>
        </div>
        {list.length > 1 && (
          <button type="button" onClick={onCompareTop} className="inline-flex h-9 items-center gap-2 rounded-lg border border-line-2 px-3 text-[0.875rem] font-medium hover:border-ink">
            <Columns3 className="size-4" aria-hidden /> เปรียบเทียบ {Math.min(4, list.length)} อันดับแรก
          </button>
        )}
      </div>
      <ol className="grid border-t border-line">
        {list.map((n, i) => {
          const idea = byNumber.get(n)!
          return (
            <li key={n} className="grid grid-cols-[2.75rem_auto_1fr] items-start gap-x-3 border-b border-line py-4 sm:grid-cols-[3.25rem_auto_1fr_auto]">
              <span className="num pt-1 text-[1.5rem] leading-none font-semibold" aria-label={`อันดับ ${i + 1}`}>
                {i + 1}
              </span>
              <div className="-mt-4">
                <Ribbon idea={idea} tied />
              </div>
              <button type="button" onClick={() => onOpen(n)} className="grid min-w-0 gap-1 text-left">
                <span className="text-[1rem] leading-snug font-semibold hover:underline">{idea.name}</span>
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="num text-[0.8125rem] text-ink-3">#{n}</span>
                  <TrackTag idea={idea} />
                </span>
                <span className="line-clamp-2 text-[0.875rem] text-ink-2">{idea.upgrade.killer}</span>
              </button>
              <div className="col-start-3 mt-3 flex items-center justify-between gap-3 sm:col-start-4 sm:mt-0 sm:flex-col sm:items-end">
                <Total score={idea.score} />
                <div className="flex gap-1.5">
                  <IconButton label="เลื่อนขึ้น" onClick={() => onMove(n, -1)} disabled={i === 0}>
                    <ArrowUp className="size-4" aria-hidden />
                  </IconButton>
                  <IconButton label="เลื่อนลง" onClick={() => onMove(n, 1)} disabled={i === list.length - 1}>
                    <ArrowDown className="size-4" aria-hidden />
                  </IconButton>
                  <IconButton
                    label={compare.includes(n) ? 'เอาออกจากเปรียบเทียบ' : 'เพิ่มในเปรียบเทียบ'}
                    pressed={compare.includes(n)}
                    disabled={!compare.includes(n) && compareFull}
                    onClick={() => onCompare(n)}
                  >
                    <Columns3 className="size-4" aria-hidden />
                  </IconButton>
                  <IconButton label="แก้ Ribbon ออกจาก Shortlist" pressed tone="sun" onClick={() => onTie(n)}>
                    <RibbonIcon className="size-4" aria-hidden />
                  </IconButton>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ---------- Compare: columns never move, only values ---------- */

const ROWS: { label: string; render: (i: Idea) => ReactNode }[] = [
  { label: 'คะแนนรวม', render: (i) => <Total score={i.score} before={i.scoreBefore} /> },
  { label: 'เกณฑ์ 4 ข้อ', render: (i) => <ScoreBars score={i.score} compact /> },
  { label: 'Track และ SDG', render: (i) => (<span className="grid gap-1.5"><TrackTag idea={i} /><SdgChips sdgs={i.sdgs} /></span>) },
  { label: 'Killer feature', render: (i) => <span className="text-ink">{i.upgrade.killer}</span> },
  { label: 'จุดอ่อนที่กรรมการจะเห็น', render: (i) => i.upgrade.weakness },
  { label: 'สร้างให้ทันใน 12 ชั่วโมง', render: (i) => <ul className="grid list-disc gap-1 pl-4 marker:text-ink-3">{i.detail.mvp.map((m, k) => <li key={k}>{m}</li>)}</ul> },
  { label: 'ช่วงว้าวในเดโม', render: (i) => i.detail.demo },
  { label: 'ตัวเลขพิสูจน์บนเวที', render: (i) => i.upgrade.proof },
  { label: 'ความเสี่ยง', render: (i) => <ul className="grid list-disc gap-1 pl-4 marker:text-ink-3">{i.detail.risks.map((m, k) => <li key={k}>{m}</li>)}</ul> },
  { label: 'เชื่อมกับ Sea', render: (i) => i.detail.sea },
]

export function CompareView({
  list,
  shortlist,
  onOpen,
  onRemove,
  onFill,
}: {
  list: number[]
  shortlist: number[]
  onOpen: (n: number) => void
  onRemove: (n: number) => void
  onFill: () => void
}) {
  if (!list.length)
    return (
      <Empty title="ยังไม่ได้เลือกไอเดียมาเปรียบเทียบ">
        <p>
          กดปุ่ม <Columns3 className="inline size-4 align-[-2px]" aria-label="เปรียบเทียบ" /> ที่ไอเดียในหน้ารายการหรือ Shortlist ได้สูงสุด 4 ไอเดีย
        </p>
        {shortlist.length > 1 && (
          <button type="button" onClick={onFill} className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-ink px-4 font-medium text-paper">
            ใช้ {Math.min(4, shortlist.length)} อันดับแรกจาก Shortlist
          </button>
        )}
      </Empty>
    )
  const items = list.map((n) => byNumber.get(n)!)
  return (
    <div className="grid gap-4 px-4 py-6 sm:px-6">
      <div>
        <h2 className="text-[1.375rem] font-semibold">เปรียบเทียบ</h2>
        <p className="text-[0.9375rem] text-ink-2">อ่านแนวนอนทีละแถวเพื่อเทียบเรื่องเดียวกัน คะแนนทั้งหมดเป็นค่าประมาณ</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full border-collapse text-left text-[0.875rem] sm:min-w-[44rem]">
          <thead>
            <tr className="align-top">
              <th scope="col" className="sticky left-0 z-10 hidden w-40 bg-paper p-4 text-[0.8125rem] font-semibold text-ink-2 sm:table-cell">
                <span className="sr-only">หัวข้อ</span>
              </th>
              {items.map((i) => (
                <th key={i.n} scope="col" className="min-w-[calc((100vw-2rem)/2)] border-line p-3 font-normal sm:min-w-[14rem] sm:border-l sm:p-4 [&:not(:first-of-type)]:border-l">
                  <div className="flex items-start gap-3">
                    <div className="-mt-4">
                      <Ribbon idea={i} tied={shortlist.includes(i.n)} />
                    </div>
                    <div className="grid min-w-0 gap-1">
                      <button type="button" onClick={() => onOpen(i.n)} className="text-left text-[0.9375rem] leading-snug font-semibold hover:underline">
                        <span className="num mr-1.5 font-medium text-ink-3">#{i.n}</span>
                        {i.name}
                      </button>
                      <button type="button" onClick={() => onRemove(i.n)} className="justify-self-start text-[0.8125rem] text-ink-3 underline decoration-line-2 hover:text-ink">
                        เอาออก
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <Fragment key={r.label}>
                <tr className="border-t border-line sm:hidden">
                  <th scope="colgroup" colSpan={items.length} className="sticky left-0 bg-panel px-3 py-1.5 text-[0.8125rem] font-semibold text-ink-2">
                    {r.label}
                  </th>
                </tr>
                <tr className="align-top sm:border-t sm:border-line">
                  <th scope="row" className="sticky left-0 z-10 hidden bg-paper p-4 text-[0.8125rem] font-semibold text-ink-2 sm:table-cell">
                    {r.label}
                  </th>
                  {items.map((i) => (
                    <td key={i.n} className="border-line p-3 text-ink-2 sm:border-l sm:p-4 [&:not(:nth-child(2))]:border-l">
                      {r.render(i)}
                    </td>
                  ))}
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------- Score map: a 3 × 6 grid of real score cells, dot size = total ---------- */

const W = 900
const H = 540
const PAD = { l: 56, r: 16, t: 16, b: 52 }
const BS = [3, 4, 5]
const RESTS = [15, 14, 13, 12, 11, 10]
const CW = (W - PAD.l - PAD.r) / BS.length
const RH = (H - PAD.t - PAD.b) / RESTS.length
const STEP = 19

export function ScoreMap({
  items,
  selected,
  shortlist,
  onOpen,
}: {
  items: Idea[]
  selected?: number
  shortlist: number[]
  onOpen: (n: number) => void
}) {
  const [hover, setHover] = useState<number | null>(null)
  const points = useMemo(() => {
    const cells = new Map<string, Idea[]>()
    for (const i of items) {
      const key = `${i.score[1]}-${i.score[0] + i.score[2] + i.score[3]}`
      cells.set(key, [...(cells.get(key) ?? []), i])
    }
    const out: { i: Idea; x: number; y: number; r: number; t: number }[] = []
    for (const [key, list] of cells) {
      const [b, rest] = key.split('-').map(Number)
      const cx = BS.indexOf(b)
      const ry = RESTS.indexOf(rest)
      if (cx < 0 || ry < 0) continue
      // Shrink the dot grid in crowded cells so every dot stays inside its cell.
      const step = Math.min(STEP, Math.floor(Math.sqrt(((CW - 24) * (RH - 10)) / list.length)))
      const perRow = Math.floor((CW - 24) / step)
      const scale = step / STEP
      list
        .sort((a, z) => total(z.score) - total(a.score) || a.n - z.n)
        .forEach((i, k) => {
          const t = total(i.score)
          out.push({
            i,
            t,
            r: Math.max(2.2, (3.6 + (t - 13) * 0.62) * scale),
            x: PAD.l + cx * CW + 12 + step / 2 + (k % perRow) * step,
            y: PAD.t + ry * RH + RH / 2 - (Math.ceil(list.length / perRow) - 1) * (step / 2) + Math.floor(k / perRow) * step,
          })
        })
    }
    return out
  }, [items])
  const focus = points.find((p) => p.i.n === (hover ?? selected))
  const bands: Band[] = ['high', 'mid', 'low']
  return (
    <div className="grid gap-4 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[62ch]">
          <h2 className="text-[1.375rem] font-semibold">แผนที่คะแนน</h2>
          <p className="text-[0.9375rem] text-ink-2">
            คอลัมน์คือคะแนนสร้างทันใน 1 วัน (B) แถวคือคะแนนตั้งโจทย์ ความลึก และ Codex รวมกัน (P+D+C) หนึ่งจุดคือหนึ่งไอเดีย จุดใหญ่คือคะแนนรวมสูง ช่องที่แรเงาคือจุดที่ควรเล็ง ตัวกรองด้านซ้ายใช้ได้กับแผนที่นี้ด้วย
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-ink-2">
          {TRACKS.map((t) => (
            <span key={t.id} className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: t.color }} /> {t.short}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full border-2 border-sun" /> อยู่ใน Shortlist
          </span>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-line bg-raise">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full min-w-[40rem]" role="img" aria-label={`แผนที่คะแนนของ ${items.length} ไอเดีย`}>
          <rect x={PAD.l + CW} y={PAD.t} width={CW * 2} height={RH * 3} fill="color-mix(in oklab, var(--ink) 7%, transparent)" />
          <text x={W - PAD.r - 10} y={PAD.t + 18} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--ink-2)">
            จุดที่ควรเล็ง
          </text>
          {[0, 1, 2, 3].map((k) => (
            <line key={`v${k}`} x1={PAD.l + k * CW} x2={PAD.l + k * CW} y1={PAD.t} y2={PAD.t + RH * RESTS.length} stroke="var(--line)" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <line key={`h${k}`} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + k * RH} y2={PAD.t + k * RH} stroke="var(--line)" />
          ))}
          {BS.map((b, cx) => (
            <text key={b} x={PAD.l + cx * CW + CW / 2} y={H - PAD.b + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink-2)" className="num">
              B {b}
            </text>
          ))}
          {RESTS.map((v, ry) => (
            <text key={v} x={PAD.l - 12} y={PAD.t + ry * RH + RH / 2 + 4} textAnchor="end" fontSize="13" fill="var(--ink-3)" className="num">
              {v}
            </text>
          ))}
          <text x={(PAD.l + W - PAD.r) / 2} y={H - 8} textAnchor="middle" fontSize="12.5" fill="var(--ink-3)">
            สร้างทันใน 1 วัน (B) จาก 5
          </text>
          <text transform={`translate(16 ${(PAD.t + H - PAD.b) / 2}) rotate(-90)`} textAnchor="middle" fontSize="12.5" fill="var(--ink-3)">
            P+D+C จาก 15
          </text>
          {points.map((p) => {
            const tied = shortlist.includes(p.i.n)
            const on = p.i.n === (hover ?? selected)
            return (
              <g key={p.i.n}>
              {on && <circle cx={p.x} cy={p.y} r={p.r + 4.5} fill="none" stroke="var(--ink)" strokeWidth={1.5} />}
              <circle
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={trackOf(p.i.track).color}
                stroke={tied ? 'var(--sun)' : 'none'}
                strokeWidth={tied ? 2.5 : 0}
                tabIndex={0}
                role="button"
                aria-label={`#${p.i.n} ${p.i.name} คะแนน ${p.t}`}
                onMouseEnter={() => setHover(p.i.n)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(p.i.n)}
                onBlur={() => setHover(null)}
                onClick={() => onOpen(p.i.n)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(p.i.n))}
                className="cursor-pointer focus:outline-none"
              />
              </g>
            )
          })}
        </svg>
      </div>
      <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 rounded-xl bg-panel px-4 py-3" aria-live="polite">
        {focus ? (
          <>
            <span className="grid min-w-0 gap-0.5">
              <span className="font-semibold">
                <span className="num mr-1.5 font-medium text-ink-3">#{focus.i.n}</span>
                {focus.i.name}
              </span>
              <span className="num text-[0.8125rem] text-ink-3">
                B {focus.i.score[1]} · P+D+C {focus.i.score[0] + focus.i.score[2] + focus.i.score[3]}
              </span>
            </span>
            <span className="flex items-center gap-3">
              <Total score={focus.i.score} />
              <button type="button" onClick={() => onOpen(focus.i.n)} className="h-9 rounded-lg bg-ink px-3 text-[0.875rem] font-medium text-paper">
                เปิดรายละเอียด
              </button>
            </span>
          </>
        ) : (
          <span className="text-[0.875rem] text-ink-2">ชี้หรือแตะจุดเพื่อดูชื่อไอเดีย</span>
        )}
      </div>
      <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-ink-3">
        <span>สีหางริบบิ้นในหน้ารายการบอกช่วงคะแนนรวม:</span>
        {bands.map((b) => (
          <span key={b} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-4 rounded-[1px]" style={{ background: BAND_COLOR[b] }} /> {BAND_LABEL[b]}
          </span>
        ))}
      </p>
    </div>
  )
}
