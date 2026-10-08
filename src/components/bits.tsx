import { useId } from 'react'
import type { ReactNode } from 'react'
import { BAND_COLOR, bandOf, CRITERIA, sources, total, trackOf } from '../data'
import type { Idea, Score, Sdg } from '../data'

/**
 * The signature ribbon: a cut ribbon hanging from the row's top edge.
 * Upper band = track colour, tail = score band. A red ribbon slides
 * down beside it when the idea is shortlisted.
 */
export function Ribbon({ idea, tied, size = 'md' }: { idea: Idea; tied: boolean; size?: 'md' | 'lg' }) {
  const id = useId().replace(/:/g, '')
  const h = size === 'lg' ? 64 : 46
  const w = size === 'lg' ? 16 : 12
  const notch = size === 'lg' ? 8 : 6
  const t = total(idea.score)
  const cut = `M0 0 H${w} V${h} L${w / 2} ${h - notch} L0 ${h} Z`
  return (
    <span className="relative inline-flex shrink-0 gap-[3px]" aria-hidden="true" style={{ height: h }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <clipPath id={`c${id}`}>
          <path d={cut} />
        </clipPath>
        <g clipPath={`url(#c${id})`}>
          <rect width={w} height={h * 0.62} fill={trackOf(idea.track).color} />
          <rect y={h * 0.62} width={w} height={h * 0.38} fill={BAND_COLOR[bandOf(t)]} />
        </g>
      </svg>
      <span className="overflow-hidden" style={{ width: w - 4, height: h - 6 }}>
        <svg className="tie block" data-on={tied} width={w - 4} height={h - 6} viewBox={`0 0 ${w - 4} ${h - 6}`}>
          <path d={`M0 0 H${w - 4} V${h - 6} L${(w - 4) / 2} ${h - 6 - notch} L0 ${h - 6} Z`} fill="var(--sun)" />
        </svg>
      </span>
    </span>
  )
}

export function TrackTag({ idea }: { idea: Idea }) {
  const t = trackOf(idea.track)
  return (
    <span className="inline-flex items-start gap-1.5 text-[0.8125rem] font-medium text-ink-2">
      <span className="mt-[0.4em] size-2.5 shrink-0 rounded-full" style={{ background: t.color }} />
      {t.short} {t.label}
    </span>
  )
}

export function SdgChips({ sdgs }: { sdgs: Sdg[] }) {
  return (
    <span className="inline-flex flex-wrap gap-1">
      {sdgs.map((s) => (
        <span key={s} className="num rounded-md border border-line-2 px-1.5 text-[0.75rem] leading-5 font-medium text-ink-2">
          SDG {s}
        </span>
      ))}
    </span>
  )
}

export function ScoreBars({ score, compact = false }: { score: Score; compact?: boolean }) {
  return (
    <div className={compact ? 'grid grid-cols-4 gap-1.5' : 'grid gap-2'}>
      {CRITERIA.map((c, i) => (
        <div key={c.key} className={compact ? 'grid gap-1' : 'grid grid-cols-[7.5rem_1fr_1.5rem] items-center gap-3'}>
          <span className={compact ? 'num text-[0.6875rem] font-medium text-ink-3' : 'text-[0.8125rem] text-ink-2'}>
            {compact ? `${c.key} ${score[i]}` : c.th}
          </span>
          <span className="flex gap-[2px]" role="img" aria-label={`${c.label} ${score[i]} จาก 5`}>
            {[1, 2, 3, 4, 5].map((k) => (
              <span key={k} className={`h-1.5 flex-1 rounded-[1px] ${k <= score[i] ? 'bg-ink' : 'bg-line'}`} />
            ))}
          </span>
          {!compact && <span className="num text-right text-[0.875rem] font-semibold">{score[i]}</span>}
        </div>
      ))}
    </div>
  )
}

export function Total({ score, before }: { score: Score; before?: Score }) {
  const t = total(score)
  const b = before ? total(before) : t
  return (
    <span className="num inline-flex items-baseline gap-0.5 whitespace-nowrap">
      <span className="text-[1.75rem] leading-none font-semibold tracking-[-0.02em]">{t}</span>
      <span className="text-[0.8125rem] text-ink-3">/20</span>
      {before && b !== t && (
        <span className="ml-1.5 text-[0.75rem] text-ink-3" title={`ก่อนอัปเกรด ${b}`}>
          จาก {b}
        </span>
      )}
    </span>
  )
}

export function SourceLinks({ idea }: { idea: Idea }) {
  return (
    <span>
      {idea.basedOn.map((b, i) => {
        const s = sources[b]
        return (
          <span key={b}>
            {i > 0 && ' + '}
            {s ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline decoration-line-2 hover:decoration-ink">
                {b}
              </a>
            ) : (
              b
            )}
            {s && <span className="text-ink-3"> ({s.event})</span>}
          </span>
        )
      })}
    </span>
  )
}

export function IconButton({
  label,
  pressed,
  onClick,
  children,
  tone = 'ink',
  disabled,
}: {
  label: string
  pressed?: boolean
  onClick: () => void
  children: ReactNode
  tone?: 'ink' | 'sun'
  disabled?: boolean
}) {
  const on = pressed
    ? tone === 'sun'
      ? 'bg-sun text-on-sun border-sun hover:brightness-95'
      : 'bg-ink text-paper border-ink'
    : 'border-line-2 text-ink-2 hover:border-ink hover:text-ink'
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`inline-flex size-9 items-center justify-center rounded-lg border transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${on}`}
    >
      {children}
    </button>
  )
}

export function Empty({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-[34rem] gap-3 px-4 py-16 text-center">
      <h3 className="text-[1.125rem] font-semibold">{title}</h3>
      <div className="text-ink-2">{children}</div>
    </div>
  )
}
