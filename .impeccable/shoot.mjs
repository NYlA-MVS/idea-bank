import { chromium } from 'playwright-core'
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const shots = [
  ['desktop.png', { width: 1440, height: 1000 }, '/', 'light'],
  ['desktop-map-dark.png', { width: 1440, height: 1000 }, '/#map', 'dark'],
  ['mobile.png', { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2, hasTouch: true }, '/', 'light'],
  ['mobile-dark-compare.png', { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2, hasTouch: true }, '/#compare', 'dark'],
]
for (const [file, vp, path, scheme] of shots) {
  const { width, height, ...rest } = vp
  const ctx = await b.newContext({ viewport: { width, height }, colorScheme: scheme, ...rest })
  const p = await ctx.newPage()
  await p.addInitScript(() => { try { localStorage.setItem('ideaBank.shortlist', '[3,50,106,70]'); localStorage.setItem('ideaBank.compare', '[3,50,106]') } catch {} })
  await p.goto('http://localhost:4317' + path); await p.waitForTimeout(1200)
  const over = await p.evaluate(() => {
    const W = document.documentElement.clientWidth
    const bad = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.right > W + 1 && !e.closest('[class*="overflow-x-auto"]') && getComputedStyle(e).position !== 'fixed' })
    return { W, scrollW: document.documentElement.scrollWidth, bad: bad.slice(0, 6).map(e => e.tagName + '.' + (e.className?.baseVal ?? e.className).toString().slice(0, 90) + ' r=' + Math.round(e.getBoundingClientRect().right)) }
  })
  console.log(file, JSON.stringify(over))
  await p.screenshot({ path: '.impeccable/review/' + file })
  await ctx.close()
}
await b.close()
