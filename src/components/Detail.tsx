import { ChevronLeft, ChevronRight, Columns3, Ribbon as RibbonIcon, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { byNumber, total } from '../data'
import type { Idea } from '../data'
import { Ribbon, ScoreBars, SdgChips, SourceLinks, TrackTag } from './bits'

function Section({ title, children, tone }: { title: string; children: ReactNode; tone?: 'quiet' }) {
  return (
    <section className={`grid gap-2 ${tone === 'quiet' ? 'rounded-xl bg-panel p-4' : ''}`}>
      <h3 className="text-[0.9375rem] font-semibold">{title}</h3>
      <div className="text-[0.9375rem] text-ink-2">{children}</div>
    </section>
  )
}
const List = ({ items, ordered }: { items: string[]; ordered?: boolean }) => {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={`grid gap-1.5 pl-5 ${ordered ? 'list-decimal' : 'list-disc'} marker:text-ink-3`}>
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </Tag>
  )
}

/** Turns "#12" references into links that open that idea. */
function Linked({ text, onGo }: { text: string; onGo: (n: number) => void }) {
  const parts = text.split(/(#\d{1,3})/g)
  return (
    <>
      {parts.map((p, i) => {
        const m = /^#(\d{1,3})$/.exec(p)
        const target = m ? byNumber.get(Number(m[1])) : undefined
        return target ? (
          <button key={i} type="button" onClick={() => onGo(target.n)} className="num font-semibold text-ink underline decoration-line-2 underline-offset-3 hover:decoration-ink" title={target.name}>
            {p}
          </button>
        ) : (
          <span key={i}>{p}</span>
        )
      })}
    </>
  )
}

export function Detail({
  idea,
  tied,
  inCompare,
  compareFull,
  onTie,
  onCompare,
  onGo,
  prev,
  next,
  onClose,
}: {
  idea: Idea
  tied: boolean
  inCompare: boolean
  compareFull: boolean
  onTie: () => void
  onCompare: () => void
  onGo: (n: number) => void
  prev?: number
  next?: number
  onClose?: () => void
}) {
  const d = idea.detail
  const u = idea.upgrade
  const before = total(idea.scoreBefore)
  const after = total(idea.score)
  return (
    <article className="grid gap-7 px-5 pt-5 pb-16 sm:px-7" aria-labelledby="detail-title">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1">
          <button type="button" disabled={!prev} onClick={() => prev && onGo(prev)} className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-[0.8125rem] font-medium text-ink-2 hover:bg-panel hover:text-ink disabled:opacity-35">
            <ChevronLeft className="size-4" aria-hidden /> ก่อนหน้า
          </button>
          <button type="button" disabled={!next} onClick={() => next && onGo(next)} className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-[0.8125rem] font-medium text-ink-2 hover:bg-panel hover:text-ink disabled:opacity-35">
            ถัดไป <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="inline-flex size-9 items-center justify-center rounded-lg text-ink-2 hover:bg-panel hover:text-ink" aria-label="ปิดรายละเอียด">
            <X className="size-5" aria-hidden />
          </button>
        )}
      </div>

      <header className="grid grid-cols-[auto_1fr] gap-4">
        <div className="-mt-5 sm:-mt-5">
          <Ribbon idea={idea} tied={tied} size="lg" />
        </div>
        <div className="grid min-w-0 gap-2">
          <h2 id="detail-title" className="text-[1.5rem] leading-tight font-semibold tracking-[-0.01em]">
            <span className="num mr-2 text-[1rem] font-medium text-ink-3">#{idea.n}</span>
            {idea.name}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <TrackTag idea={idea} />
            <SdgChips sdgs={idea.sdgs} />
          </div>
          <p className="max-w-[65ch] text-[1rem] text-ink-2">{idea.idea}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={tied}
              onClick={onTie}
              className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-[0.875rem] font-medium transition-colors duration-150 ${
                tied ? 'border-sun bg-sun text-on-sun' : 'border-line-2 hover:border-ink'
              }`}
            >
              <RibbonIcon className="size-4" aria-hidden /> {tied ? 'อยู่ใน Shortlist' : 'ผูก Ribbon เข้า Shortlist'}
            </button>
            <button
              type="button"
              aria-pressed={inCompare}
              disabled={!inCompare && compareFull}
              onClick={onCompare}
              className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-[0.875rem] font-medium transition-colors duration-150 disabled:opacity-40 ${
                inCompare ? 'border-ink bg-ink text-paper' : 'border-line-2 hover:border-ink'
              }`}
            >
              <Columns3 className="size-4" aria-hidden /> {inCompare ? 'อยู่ในเปรียบเทียบ' : compareFull ? 'เปรียบเทียบเต็มแล้ว' : 'เพิ่มในเปรียบเทียบ'}
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-5 rounded-xl border border-line p-5 sm:grid-cols-[auto_1fr] sm:gap-8">
        <div className="grid content-start gap-1">
          <span className="num text-[2.5rem] leading-none font-semibold tracking-[-0.02em]">
            {after}
            <span className="text-[1rem] font-normal text-ink-3">/20</span>
          </span>
          <span className="num text-[0.8125rem] text-ink-3">{before !== after ? `อัปเกรดจาก ${before}` : 'ไม่เปลี่ยนหลังอัปเกรด'}</span>
          <span className="mt-1 text-[0.75rem] text-ink-3">ค่าประมาณ ไม่ใช่ผลจริง</span>
        </div>
        <ScoreBars score={idea.score} />
      </div>

      <blockquote className="max-w-[65ch] text-[1.125rem] leading-relaxed font-medium">“{d.pitch}”</blockquote>

      <div className="grid gap-5">
        <Section title="Thai twist">{idea.twist}</Section>
        <Section title="ต่อยอดจาก">
          <SourceLinks idea={idea} />
        </Section>
      </div>

      <div className="grid gap-5 rounded-xl border-[1.5px] border-ink p-5">
        <h3 className="text-[1.125rem] font-semibold">เวอร์ชันอัปเกรด</h3>
        <Section title="จุดอ่อนที่กรรมการจะเห็น">{u.weakness}</Section>
        <Section title="อัปเกรด 3 ข้อ">
          <List items={u.fixes} ordered />
        </Section>
        <Section title="Killer feature">
          <span className="text-ink">{u.killer}</span>
        </Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <Section title="ตัวเลขพิสูจน์บนเวที">{u.proof}</Section>
          <Section title="รวมกับไอเดียอื่น">
            <Linked text={u.combo} onGo={onGo} />
          </Section>
        </div>
      </div>

      <div className="grid gap-6">
        <Section title="ปัญหา">{d.problem}</Section>
        <Section title="ผู้ใช้">{d.users}</Section>
        <Section title="ระบบทำงานอย่างไร">
          <List items={d.how} ordered />
        </Section>
        {d.domain && (
          <div className="grid gap-5 lg:grid-cols-2">
            <Section title="ความรู้เชิงลึกที่ระบบใส่ไว้" tone="quiet">
              <List items={d.domain} />
            </Section>
            <Section title="ผู้เชี่ยวชาญที่ควรคุยก่อนแข่ง" tone="quiet">
              {d.expert}
            </Section>
          </div>
        )}
        <div className="grid gap-5 lg:grid-cols-2">
          <Section title="ทำเอง หรือ ถามคน" tone="quiet">
            {d.autonomy}
          </Section>
          <Section title="เรื่องไม่คาดคิด และวิธีรับมือ" tone="quiet">
            <List items={d.unexpected} />
          </Section>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Section title="งานของ Codex">
            <List items={d.codex} />
          </Section>
          <Section title="สร้างให้ทันใน 12 ชั่วโมง">
            <List items={d.mvp} />
          </Section>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Section title="ข้อมูลสำหรับเดโม">{d.data}</Section>
          <Section title="ช่วงว้าวในเดโม">{d.demo}</Section>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Section title="SDG">{d.sdg}</Section>
          <Section title="เชื่อมกับ Sea">{d.sea}</Section>
        </div>
        <Section title="ความเสี่ยง และทางแก้">
          <List items={d.risks} />
        </Section>
      </div>
    </article>
  )
}
