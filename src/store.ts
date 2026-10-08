import { useCallback, useEffect, useState } from 'react'
import { byNumber } from './data'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable: state lives for this visit only */
  }
}

const valid = (list: unknown): number[] =>
  Array.isArray(list) ? list.filter((n): n is number => typeof n === 'number' && byNumber.has(n)) : []

/** Ordered shortlist (อันดับ 1 first). Imports stars saved by the earlier page version. */
export function useShortlist() {
  const [list, setList] = useState<number[]>(() => {
    const saved = read<unknown>('ideaBank.shortlist', null)
    if (saved) return valid(saved)
    return valid(read<unknown>('ideaStars', []))
  })
  useEffect(() => write('ideaBank.shortlist', list), [list])

  const has = useCallback((n: number) => list.includes(n), [list])
  const toggle = useCallback(
    (n: number) => setList((l) => (l.includes(n) ? l.filter((x) => x !== n) : [...l, n])),
    [],
  )
  const move = useCallback(
    (n: number, dir: -1 | 1) =>
      setList((l) => {
        const i = l.indexOf(n)
        const j = i + dir
        if (i < 0 || j < 0 || j >= l.length) return l
        const next = [...l]
        ;[next[i], next[j]] = [next[j], next[i]]
        return next
      }),
    [],
  )
  return { list, has, toggle, move }
}

export const COMPARE_MAX = 4

export function useCompare() {
  const [list, setList] = useState<number[]>(() => valid(read<unknown>('ideaBank.compare', [])).slice(0, COMPARE_MAX))
  useEffect(() => write('ideaBank.compare', list), [list])
  const has = useCallback((n: number) => list.includes(n), [list])
  const toggle = useCallback(
    (n: number) =>
      setList((l) => (l.includes(n) ? l.filter((x) => x !== n) : l.length >= COMPARE_MAX ? l : [...l, n])),
    [],
  )
  const replace = useCallback((next: number[]) => setList(next.slice(0, COMPARE_MAX)), [])
  return { list, has, toggle, replace, full: list.length >= COMPARE_MAX }
}

export type View = 'list' | 'shortlist' | 'compare' | 'map'
const VIEWS: View[] = ['list', 'shortlist', 'compare', 'map']

export function useView() {
  const fromHash = (): View => {
    const h = location.hash.replace('#', '') as View
    return VIEWS.includes(h) ? h : 'list'
  }
  const [view, setView] = useState<View>(fromHash)
  const go = useCallback((v: View) => {
    setView(v)
    try {
      history.replaceState(null, '', v === 'list' ? ' ' : `#${v}`)
    } catch {
      /* ignore */
    }
  }, [])
  return { view, go }
}

export function useWide(min = 1280) {
  const q = `(min-width: ${min}px)`
  const [wide, setWide] = useState(() => matchMedia(q).matches)
  useEffect(() => {
    const m = matchMedia(q)
    const on = () => setWide(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [q])
  return wide
}
