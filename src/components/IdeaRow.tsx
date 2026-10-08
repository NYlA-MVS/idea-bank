import { Columns3, Ribbon as RibbonIcon } from 'lucide-react'
import { trackOf } from '../data'
import type { Idea } from '../data'
import { IconButton, Ribbon, ScoreBars, SdgChips, Total } from './bits'

export function IdeaRow({
  idea,
  selected,
  tied,
  inCompare,
  compareFull,
  onOpen,
  onTie,
  onCompare,
}: {
  idea: Idea
  selected: boolean
  tied: boolean
  inCompare: boolean
  compareFull: boolean
  onOpen: () => void
  onTie: () => void
  onCompare: () => void
}) {
  return (
    <li
      className={`group relative grid grid-cols-[auto_1fr] gap-x-4 border-b border-line py-4 pr-2 pl-3 transition-colors duration-150 sm:grid-cols-[auto_1fr_auto] ${
        selected ? '' : 'hover:bg-panel/60'
      }`}
      style={selected ? { background: `color-mix(in oklab, ${trackOf(idea.track).color} 8%, var(--paper))` } : undefined}
    >
      <div className="-mt-4">
        <Ribbon idea={idea} tied={tied} />
      </div>
      <button
        type="button"
        onClick={onOpen}
        aria-current={selected ? 'true' : undefined}
        className="grid min-w-0 gap-1 text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-ink"
      >
        <span className="flex items-baseline gap-2">
          <span className="num shrink-0 text-[0.8125rem] text-ink-3">#{idea.n}</span>
          <span className="text-[1rem] leading-snug font-semibold">{idea.name}</span>
        </span>
        <span className="line-clamp-2 text-[0.875rem] text-ink-2">{idea.idea}</span>
        <span className="mt-1">
          <SdgChips sdgs={idea.sdgs} />
        </span>
      </button>
      <div className="relative col-span-2 mt-3 flex items-center justify-between gap-3 pl-[calc(12px+3px+8px+1rem)] sm:col-span-1 sm:mt-0 sm:flex-col sm:items-end sm:justify-start sm:pl-0">
        <span className="grid gap-1.5 sm:justify-items-end">
          <Total score={idea.score} />
          <span className="num text-[0.75rem] text-ink-3 sm:hidden">
            P{idea.score[0]} B{idea.score[1]} D{idea.score[2]} C{idea.score[3]}
          </span>
          <span className="hidden w-[8rem] sm:block">
            <ScoreBars score={idea.score} compact />
          </span>
        </span>
        <div className="flex gap-1.5">
          <IconButton label={tied ? 'แก้ Ribbon ออกจาก Shortlist' : 'ผูก Ribbon เข้า Shortlist'} pressed={tied} tone="sun" onClick={onTie}>
            <RibbonIcon className="size-4" aria-hidden />
          </IconButton>
          <IconButton
            label={inCompare ? 'เอาออกจากเปรียบเทียบ' : compareFull ? 'เปรียบเทียบเต็มแล้ว (สูงสุด 4)' : 'เพิ่มในเปรียบเทียบ'}
            pressed={inCompare}
            disabled={!inCompare && compareFull}
            onClick={onCompare}
          >
            <Columns3 className="size-4" aria-hidden />
          </IconButton>
        </div>
      </div>
    </li>
  )
}
