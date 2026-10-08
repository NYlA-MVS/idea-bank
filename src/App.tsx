import { SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Detail } from './components/Detail'
import { EMPTY_FILTERS, Filters } from './components/Filters'
import type { FilterState } from './components/Filters'
import { IdeaRow } from './components/IdeaRow'
import { CompareView, ScoreMap, ShortlistView } from './components/Views'
import { Empty } from './components/bits'
import { byNumber, ideas, sources, total } from './data'
import type { Idea } from './data'
import { useCompare, useShortlist, useView, useWide } from './store'
import type { View } from './store'

function applyFilters(f: FilterState): Idea[] {
  const q = f.q.trim().toLowerCase()
  const out = ideas.filter((i) => {
    if (f.tracks.length && !f.tracks.includes(i.track)) return false
    if (f.sdgs.length && !i.sdgs.some((s) => f.sdgs.includes(s))) return false
    if (f.min && total(i.score) < f.min) return false
    if (q) {
      const hay = `${i.n} ${i.name} ${i.idea} ${i.twist} ${i.basedOn.join(' ')} ${i.upgrade.killer} ${i.detail.problem}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })
  const t = (i: Idea) => total(i.score)
  if (f.sort === 'score') out.sort((a, b) => t(b) - t(a) || a.n - b.n)
  if (f.sort === 'build') out.sort((a, b) => b.score[1] - a.score[1] || t(b) - t(a) || a.n - b.n)
  if (f.sort === 'number') out.sort((a, b) => a.n - b.n)
  return out
}

/** Slide-over used for detail and filters below desktop width. */
function Sheet({ open, onClose, side, label, children }: { open: boolean; onClose: () => void; side: 'right' | 'left'; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeRef.current()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [open])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex" style={{ justifyContent: side === 'right' ? 'flex-end' : 'flex-start' }}>
      <button type="button" aria-label="ปิด" onClick={onClose} className="absolute inset-0 bg-[color-mix(in_oklab,var(--ink)_38%,transparent)]" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`sheet relative h-full w-full overflow-y-auto bg-paper focus:outline-none ${side === 'right' ? 'max-w-[44rem] border-l' : 'max-w-[22rem] border-r'} border-line`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {children}
      </div>
    </div>
  )
}

const TABS: { id: View; label: string; short: string }[] = [
  { id: 'list', label: 'รายการ', short: 'รายการ' },
  { id: 'shortlist', label: 'Shortlist', short: 'Shortlist' },
  { id: 'compare', label: 'เปรียบเทียบ', short: 'เทียบ' },
  { id: 'map', label: 'แผนที่คะแนน', short: 'แผนที่' },
]

export default function App() {
  const { view, go } = useView()
  const shortlist = useShortlist()
  const compare = useCompare()
  const wide = useWide(1280)
  const railVisible = useWide(1024)
  const [f, setF] = useState<FilterState>(EMPTY_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filtered = useMemo(() => applyFilters(f), [f])
  const [selected, setSelected] = useState<number | undefined>(() => applyFilters(EMPTY_FILTERS)[0]?.n)
  const [sheetOpen, setSheetOpen] = useState(false)

  const order = view === 'shortlist' ? shortlist.list : view === 'compare' ? compare.list : filtered.map((i) => i.n)
  const idx = selected ? order.indexOf(selected) : -1
  const open = (n: number) => {
    setSelected(n)
    if (!(wide && view === 'list')) setSheetOpen(true)
  }
  const inlineDetail = wide && view === 'list'
  const selIdea = selected ? byNumber.get(selected) : undefined
  const counts: Record<View, number> = { list: filtered.length, shortlist: shortlist.list.length, compare: compare.list.length, map: filtered.length }
  const showRail = view === 'list' || view === 'map'
  const filterCount = f.tracks.length + f.sdgs.length + (f.min ? 1 : 0) + (f.q ? 1 : 0)

  const detail = selIdea && (
    <Detail
      key={selIdea.n}
      idea={selIdea}
      tied={shortlist.has(selIdea.n)}
      inCompare={compare.has(selIdea.n)}
      compareFull={compare.full}
      onTie={() => shortlist.toggle(selIdea.n)}
      onCompare={() => compare.toggle(selIdea.n)}
      onGo={(n) => setSelected(n)}
      prev={idx > 0 ? order[idx - 1] : undefined}
      next={idx >= 0 && idx < order.length - 1 ? order[idx + 1] : undefined}
      onClose={inlineDetail ? undefined : () => setSheetOpen(false)}
    />
  )
  const filters = <Filters f={f} set={setF} shown={filtered.length} />

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky z-30 border-b border-line bg-paper" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 pt-3 sm:px-6 lg:flex-nowrap lg:pt-0">
          <div className="flex items-baseline gap-2 lg:py-3.5">
            <h1 className="text-[1.125rem] font-bold tracking-[-0.01em]">คลังไอเดีย</h1>
            <span className="hidden text-[0.8125rem] text-ink-3 sm:inline">Sea × OpenAI Codex Hackathon TH</span>
          </div>
          <nav aria-label="มุมมอง" className="-mx-3 grid w-[calc(100%+1.5rem)] grid-cols-4 sm:mx-0 sm:flex sm:w-auto">
            {TABS.map((t) => {
              const on = view === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-current={on ? 'page' : undefined}
                  onClick={() => go(t.id)}
                  className={`relative flex h-11 min-w-0 shrink-0 items-center justify-center gap-1 px-1 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-150 sm:justify-start sm:gap-1.5 sm:px-3 sm:text-[0.9375rem] lg:h-14 ${
                    on ? 'text-ink' : 'text-ink-3 hover:text-ink'
                  }`}
                >
                  <span className="sm:hidden">{t.short}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className={`num rounded-md px-1 text-[0.6875rem] leading-5 sm:px-1.5 sm:text-[0.75rem] ${t.id === 'shortlist' && counts.shortlist ? 'bg-sun text-on-sun' : 'bg-panel text-ink-2'}`}>
                    {counts[t.id]}
                  </span>
                  {on && <span className="absolute inset-x-1 bottom-0 h-[2px] bg-ink sm:inset-x-3" />}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <div className={`grid flex-1 ${showRail && railVisible ? 'lg:grid-cols-[17.5rem_minmax(0,1fr)]' : ''} ${inlineDetail ? 'xl:grid-cols-[17.5rem_minmax(0,1fr)_minmax(0,42rem)]' : ''}`}>
        {showRail && railVisible && (
          <aside aria-label="ตัวกรอง" className="border-r border-line px-5 py-6">
            <div className="sticky top-20">{filters}</div>
          </aside>
        )}

        <main className="min-w-0">
          {showRail && !railVisible && (
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 sm:px-6">
              <span className="num text-[0.875rem] text-ink-2">
                {filtered.length} ไอเดีย
              </span>
              <button type="button" onClick={() => setFiltersOpen(true)} className="inline-flex h-9 items-center gap-2 rounded-lg border border-line-2 px-3 text-[0.875rem] font-medium hover:border-ink">
                <SlidersHorizontal className="size-4" aria-hidden /> ตัวกรอง
                {filterCount > 0 && <span className="num rounded-md bg-ink px-1.5 text-[0.75rem] text-paper">{filterCount}</span>}
              </button>
            </div>
          )}

          {view === 'list' &&
            (filtered.length ? (
              <ul className="pb-10">
                {filtered.map((i) => (
                  <IdeaRow
                    key={i.n}
                    idea={i}
                    selected={inlineDetail && selected === i.n}
                    tied={shortlist.has(i.n)}
                    inCompare={compare.has(i.n)}
                    compareFull={compare.full}
                    onOpen={() => open(i.n)}
                    onTie={() => shortlist.toggle(i.n)}
                    onCompare={() => compare.toggle(i.n)}
                  />
                ))}
              </ul>
            ) : (
              <Empty title="ไม่มีไอเดียที่ตรงกับตัวกรอง">
                <p>ลองลดคะแนนขั้นต่ำ เอา Track หรือ SDG บางอันออก หรือค้นหาด้วยคำอื่น</p>
                <button type="button" onClick={() => setF(EMPTY_FILTERS)} className="mt-4 h-10 rounded-lg bg-ink px-4 font-medium text-paper">
                  ล้างตัวกรองทั้งหมด
                </button>
              </Empty>
            ))}

          {view === 'map' && <ScoreMap items={filtered} selected={selected} shortlist={shortlist.list} onOpen={open} />}

          {view === 'shortlist' && (
            <ShortlistView
              list={shortlist.list}
              onOpen={open}
              onMove={shortlist.move}
              onTie={shortlist.toggle}
              compare={compare.list}
              onCompare={compare.toggle}
              compareFull={compare.full}
              onCompareTop={() => {
                compare.replace(shortlist.list.slice(0, 4))
                go('compare')
              }}
            />
          )}

          {view === 'compare' && (
            <CompareView
              list={compare.list}
              shortlist={shortlist.list}
              onOpen={open}
              onRemove={compare.toggle}
              onFill={() => compare.replace(shortlist.list.slice(0, 4))}
            />
          )}
        </main>

        {inlineDetail && (
          <aside aria-label="รายละเอียดไอเดีย" className="border-l border-line">
            <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto">{detail}</div>
          </aside>
        )}
      </div>

      <footer className="border-t border-line px-4 py-6 text-[0.8125rem] text-ink-3 sm:px-6">
        <p className="max-w-[80ch]">
          คะแนน รายละเอียด และแผนอัปเกรดทั้งหมดเป็นการประเมินและข้อเสนอของ Claude ไม่ใช่ผลจริง ตัวเลขที่เขียนว่า “(หาตัวเลขอ้างอิงก่อน pitch)” หรือ “(ตรวจสอบกับแหล่งทางการ)” ต้องหาแหล่งอ้างอิงก่อนใช้
        </p>
        <details className="mt-3">
          <summary className="cursor-pointer font-medium text-ink-2 hover:text-ink">ผลงานต้นแบบ {Object.keys(sources).length} ชิ้นที่ไอเดียต่อยอดมา</summary>
          <ul className="mt-3 columns-1 gap-8 sm:columns-2 lg:columns-3">
            {Object.entries(sources).map(([name, s]) => (
              <li key={name} className="mb-1.5 break-inside-avoid">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink-2 underline decoration-line-2 hover:text-ink">
                  {name}
                </a>{' '}
                · {s.event}
              </li>
            ))}
          </ul>
        </details>
      </footer>

      <Sheet open={sheetOpen && !inlineDetail && !!selIdea} onClose={() => setSheetOpen(false)} side="right" label="รายละเอียดไอเดีย">
        {detail}
      </Sheet>
      <Sheet open={filtersOpen && showRail && !railVisible} onClose={() => setFiltersOpen(false)} side="left" label="ตัวกรอง">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 className="font-semibold">ตัวกรอง</h2>
          <button type="button" onClick={() => setFiltersOpen(false)} className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-panel" aria-label="ปิดตัวกรอง">
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="px-5 py-5">{filters}</div>
      </Sheet>
    </div>
  )
}
