---
name: คลังไอเดีย (Hackathon Idea Bank)
description: A Thai team's decision tool for narrowing 145 scored hackathon ideas to one, where each idea wears a day-colour ribbon.
colors:
  paper: "#fbfbf8"
  panel: "#f3f3ee"
  raise: "#ffffff"
  ink: "#17181c"
  ink-2: "#4a4c55"
  ink-3: "#6b6d76"
  line: "#e2e2da"
  line-2: "#cfcfc6"
  friday-blue: "#2f6fdb"
  saturday-purple: "#7a4fc9"
  thursday-orange: "#d86a10"
  sunday-red: "#d7263d"
  on-sunday-red: "#ffffff"
  wednesday-green: "#23915a"
  monday-yellow: "#d9ad00"
  tuesday-pink: "#e0508c"
typography:
  display:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\", \"lnum\""
  score-total:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\", \"lnum\""
  headline:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  view-title:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.4
  pitch:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.625
  title:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.375
  section-title:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.6
  body:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
  micro:
    fontFamily: "Anuphan, Noto Sans Thai, Leelawadee UI, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.25
    fontFeature: "\"tnum\", \"lnum\""
rounded:
  hair: "1px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "7": "28px"
  rail: "17.5rem"
  detail: "42rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "0 16px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.lg}"
    padding: "0 12px"
    height: "36px"
  button-tie-on:
    backgroundColor: "{colors.sunday-red}"
    textColor: "{colors.on-sunday-red}"
    typography: "{typography.body-small}"
    rounded: "{rounded.lg}"
    padding: "0 12px"
    height: "36px"
  button-compare-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body-small}"
    rounded: "{rounded.lg}"
    padding: "0 12px"
    height: "36px"
  icon-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.lg}"
    size: "36px"
  chip-sdg:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    typography: "{typography.micro}"
    rounded: "{rounded.md}"
    padding: "0 6px"
  chip-sdg-filter-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "32px"
  input-search:
    backgroundColor: "{colors.raise}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "0 12px 0 36px"
    height: "40px"
  view-tab:
    textColor: "{colors.ink-3}"
    typography: "{typography.body}"
    padding: "0 12px"
    height: "56px"
  view-tab-active:
    textColor: "{colors.ink}"
  card-score:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "20px"
  card-quiet:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.xl}"
    padding: "16px"
---

# Design System: คลังไอเดีย (Hackathon Idea Bank)

## Overview

**Creative North Star: "Day-Colour Ribbons"**

Colour is identity here, the way every Thai reader decodes สีประจำวัน (the colour of each weekday). Each of the seven day colours owns exactly one job, and an idea's identity is worn as a short cut ribbon hanging from the top edge of its row: the upper band says its track, the tail says its score band, and tying a Sunday-red ribbon beside it puts it on the shortlist. Everything else is white paper and near-black ink.

The surface is a working tool for a small team deciding together, so density is moderate: ranked rows with generous vertical rhythm, tabular figures everywhere a number appears, and depth kept in the detail panel rather than the list. The system is flat. There are no shadows and no gradients; structure comes from hairline rules, a pale panel tone, and one heavy ink outline that marks the upgrade plan. Colour appears only on ribbons, track bars, score-map dots, small swatches, and as a faint tint behind a selected row or track.

It rejects the category default of neutral cards with a single indigo accent and a soup of coloured tag pills. Tags here (SDG chips) are colourless outlines; colour is reserved for meaning.

**Key Characteristics:**
- Seven day colours, seven jobs, no overlap; Sunday red means shortlisted and nothing else.
- Flat paper and ink; hairline dividers instead of cards for list content.
- One Thai UI family (Anuphan) for everything; tabular lining figures on every number.
- Selection shown as a colour tint, not as added chrome.
- Light and dark themes share the same roles; dark mode lifts each day colour so it reads on charcoal paper.

## Colors

A warm-neutral paper and cool near-black ink carry the whole interface; seven saturated day colours act as a code, each mapped to one meaning.

### Primary
- **Ink** (`ink`): the only "accent" in the chrome. Primary buttons, active filter chips, the active tab underline, the 5-pip score bars, the focus ring, and the 1.5px outline around the upgrade plan.

### Secondary: the track code
- **Friday Blue** (`friday-blue`): Track 1, Autonomous & Adaptive AI. Upper ribbon band, track rail bar, track dot, score-map dot.
- **Saturday Purple** (`saturday-purple`): Track 2, AI-Native Products & Ops. Same placements.
- **Thursday Orange** (`thursday-orange`): Track 3, Deep Domain AI. Same placements.

### Tertiary: the shortlist and score-band code
- **Sunday Red** (`sunday-red`): shortlisted, and only that. The tied ribbon, the pressed tie button, the Shortlist tab count, the ring around a shortlisted score-map dot. Text on it is `on-sunday-red`: white in light mode, near-black `#151513` in dark mode (white on the dark-mode red `#f0525f` only reaches about 3.5:1).
- **Wednesday Green** (`wednesday-green`): score band 18 and above, on the ribbon tail and the map legend.
- **Monday Yellow** (`monday-yellow`): score band 15–17. Used only as a fill, never as text.
- **Tuesday Pink** (`tuesday-pink`): score band 14 and below.

### Neutral
- **Paper** (`paper`): the page ground everywhere, including sheets and the sticky header. Warm-neutral, not cream.
- **Panel** (`panel`): quiet section fills in the detail, row hover (at 60%), the map read-out bar, the mobile compare group headers, inactive tab counts.
- **Raise** (`raise`): inputs, select, and the score-map plot field.
- **Ink 2** (`ink-2`): secondary text, idea summaries, section bodies, fieldset legends.
- **Ink 3** (`ink-3`): tertiary text: idea numbers, "/20", hints, axis labels, placeholders. Holds about 5:1 on paper.
- **Line** (`line`): hairline row dividers, column rules, card borders, empty score pips.
- **Line 2** (`line-2`): control borders (outline buttons, chips, inputs), link underlines.

Dark theme swaps every role in place (values in the sidecar): paper becomes a near-black charcoal, ink becomes a pale warm grey, and each day colour is lifted in lightness so ribbons and dots keep their contrast.

### Named Rules
**The One Day, One Job Rule.** Each day colour encodes exactly one thing. A new feature that needs a colour picks a neutral or an ink treatment; it never borrows a day colour for a second meaning.

**The Reserved Sunday Rule.** Sunday red appears only where an idea is shortlisted (or on the control that ties it). Errors, warnings, deletes and badges do not use it.

**The Tint, Not Paint Rule.** A day colour may cover an area only as a selection tint mixed into paper (8% behind a selected row, 16% behind a selected track). Solid day colour stays on small marks: ribbons, bars, dots, swatches.

## Typography

**Display Font:** Anuphan (with Noto Sans Thai, Leelawadee UI, system-ui)
**Body Font:** Anuphan, the same family
**Label/Mono Font:** none; numbers use Anuphan with tabular lining figures

**Character:** One clean, open Thai-Latin sans does every job, so mixed Thai and English content sits on one baseline and one voice. Hierarchy comes from size and weight (400 to 700), never from a second family or from capitals.

### Hierarchy
- **Display** (600, 2.5rem, line-height 1, -0.02em, tabular): the total score in the detail panel's score card.
- **Score Total** (600, 1.75rem, line-height 1, -0.02em, tabular): the "/20" total on every list, shortlist and compare row; the shortlist rank numeral uses 1.5rem.
- **Headline** (600, 1.5rem, line-height 1.25, -0.01em): the idea name in the detail panel, preceded by its number in 1rem ink-3.
- **View Title** (600, 1.375rem): the heading of Shortlist, Compare and Score Map views. The app name in the header is 1.125rem at 700.
- **Pitch** (500, 1.125rem, relaxed): the one-line pitch quote in the detail, capped at 65ch.
- **Title** (600, 1rem, snug): idea names in rows.
- **Section Title** (600, 0.9375rem): headings of detail sections.
- **Body** (400, 15px, line-height 1.6): base text; summaries in rows step down to 0.875rem ink-2 and clamp to two lines. Long reading runs cap at 65ch.
- **Label** (500–600, 0.8125rem, ink-2 or ink-3): fieldset legends, idea numbers, button text in the detail rail, track tags.
- **Micro** (500, 0.75rem down to 0.6875rem, tabular): SDG chips, tab counts, the compact P B D C bars.

### Named Rules
**The Tabular Everything Rule.** Every number (scores, counts, idea numbers, ranks, axis ticks, SDG numbers) is set with tabular lining figures so columns of scores align.

**The No Capitals Rule.** Nothing is uppercased or letter-spaced for effect. Thai has no case, and labels stay in sentence form at small sizes.

## Layout

The app is a single page with a sticky top bar (app name plus four view tabs with counts) over a three-column working layout on wide screens: a 17.5rem filter rail, a flexible ranked list, and a detail column up to 42rem. Each column is separated by a single hairline rule, not by gaps or cards.

Responsive behaviour follows three breakpoints. At 1280px and up the selected idea's detail sits inline on the right, open on the top idea. Between 1024px and 1280px the rail stays and detail opens as a right-side sheet. Below 1024px the rail collapses into a "ตัวกรอง" button that opens a left sheet (max 22rem), and detail becomes a full-width sheet (max 44rem). Below 640px the four tabs become an even four-column grid with short labels, and row actions move beneath the row text. Sheets respect safe-area insets.

Spacing follows a 4px step. List rows use 16px vertical padding; the rail uses 20px by 24px; the detail uses 20–28px side padding with 28px between groups; secondary views centre at 56rem max with 24px vertical padding. Rows are separated by hairlines, never by gaps.

### Named Rules
**The Ribbon Hangs From The Edge Rule.** A ribbon always starts at the top edge of its row or header (negative top margin cancels the padding), so it reads as hanging from the rule above, not floating in the row.

## Elevation & Depth

The system is entirely flat: no box-shadows and no gradients anywhere. Depth is conveyed by three things only: tone (paper, then panel, then raise), hairline borders (line for structure, line-2 for controls), and a single heavy 1.5px ink outline reserved for the upgrade-plan block in the detail. Sheets sit over a scrim of ink at 38% and are separated from the page by a hairline edge, not a shadow. The score map marks its sweet spot with an ink wash at 7%.

### Named Rules
**The Flat Paper Rule.** Nothing floats. If something needs separation, give it a hairline or a panel tone; if it needs emphasis, give it ink.

## Shapes

Corners are gently rounded and small: 6px on chips, segment buttons and tab counts; 8px on buttons, icon buttons, inputs and selectable rail items; 12px on the few contained blocks (score card, quiet sections, compare table, map, map read-out). Score pips and track bars use a near-square 1px corner so they read as ink marks, and dots and track swatches are full circles.

The signature silhouette is the ribbon: a narrow vertical strip (12 by 46px in rows, 16 by 64px in the detail header) with a swallow-tail notch cut into its bottom edge, split 62/38 between track colour and score-band colour. The shortlist ribbon has the same cut, sits 3px to its right, and slides down from behind the top rule when tied.

## Components

### Buttons
Quiet and functional; ink does the talking.
- **Shape:** gently rounded (`rounded.lg`), 36px tall in toolbars and the detail, 40px for empty-state calls to action.
- **Primary:** solid ink with paper text, medium weight. Used for the single main action in an empty state or the map read-out ("open detail").
- **Outline:** paper with a line-2 border and ink text; the border turns ink on hover.
- **Toggle on:** compare-on fills with ink; tie-on fills with Sunday red and white text. Both carry `aria-pressed`.
- **Ghost:** previous / next / close in the detail are borderless ink-2 text that gains a panel fill on hover.
- **Disabled:** opacity drops to about 40%; the cursor shows not-allowed.
- **Focus:** a 2px ink outline offset 2px, on every interactive element.

### Icon Buttons
36px squares with an 8px corner and a line-2 border, holding a 16px line icon. Pressed state fills ink (compare) or Sunday red (tie). Every one has a Thai `aria-label` and title.

### Chips
- **SDG chip (display):** colourless outline (line-2 border, ink-2 text, micro size, 6px corner). It never takes a colour.
- **SDG chip (filter):** 32px tall outline chip; selected fills ink with paper text.
- **Segmented control:** the minimum-score picker is a four-cell group inside a line-2 bordered 8px frame; the selected cell fills ink.

### Track Rail
Each track is a selectable row with its name, its idea count in tabular ink-3, and a 6px bar in its day colour whose width is proportional to its share of ideas. Selecting tints the row with its day colour at 16% into paper.

### Cards / Containers
- **Score card:** 12px corner, line hairline border, 20px padding; the large total sits beside full-width 5-pip score bars.
- **Quiet section:** panel fill, 12px corner, 16px padding, no border; used for autonomy, edge cases and domain knowledge.
- **Upgrade block:** 12px corner with a 1.5px ink border, the one emphatic container in the system.
- **List content never uses cards;** rows are separated by hairlines.

### Inputs / Fields
Raise background, line-2 border, 8px corner, 40px tall, 15px text, ink-3 placeholder. Focus turns the border ink (the global ink focus ring also applies). Search carries a 16px leading magnifier icon.

### Navigation
Four text tabs in the sticky header, medium weight, ink-3 at rest and ink when active, with a 2px ink underline on the active tab. Each tab carries a count in a small 6px-cornered badge on panel; the Shortlist count turns Sunday red once anything is tied. On phones the tabs fill a four-column grid with short labels.

### Idea Row (signature)
The ranked row is the core unit: ribbon, then number (ink-3) and name (title), a two-line summary, colourless SDG chips; on the right the score total over compact P B D C pip bars, then the tie and compare icon buttons. The whole row is one click target. Hover tints with panel; the selected row is tinted with its track colour at 8% and marked `aria-current`.

### Score Pips
Each criterion out of 5 is five short 6px-tall segments: ink when earned, line when not. Compact form stacks four mini groups under the total; full form in the detail adds the Thai criterion name and the figure.

### Score Map
A plot of buildability (B) against the other three criteria, on a raise field with line gridlines. Dots are track-coloured, shortlisted dots carry a Sunday-red ring, and the hovered or selected dot gets a 1.5px ink halo. The read-out bar below names the focused idea and offers the primary "open" action.

### Motion
Colour and border changes ease over 150ms. The tie ribbon slides down from the knot over 220ms on `cubic-bezier(.16, 1, .3, 1)`. Under reduced-motion preferences the slide is removed.

## Do's and Don'ts

### Do:
- **Do** give every idea its ribbon wherever it appears (list row, detail header, shortlist, compare column), with the track band on top and the score-band tail below.
- **Do** keep each day colour on its one job: Friday blue T1, Saturday purple T2, Thursday orange T3, Sunday red shortlisted, Wednesday green 18+, Monday yellow 15–17, Tuesday pink 14 and below.
- **Do** set every number with tabular lining figures and show totals as "n/20".
- **Do** separate list content with hairlines (`line`) and reserve borders on controls for `line-2`.
- **Do** show selection as a day-colour tint mixed into paper (8% for rows, 16% for rail items) rather than adding outlines or badges.
- **Do** label every estimate as an estimate next to the number it qualifies.

### Don't:
- **Don't** use Sunday red for anything other than shortlisting: not for errors, deletes, alerts or emphasis.
- **Don't** colour SDG chips or other tags; colour is reserved for the day-colour code.
- **Don't** add box-shadows or gradients; separation comes from tone and hairlines.
- **Don't** fill large surfaces with solid day colour or use one as a page or header background.
- **Don't** use Monday yellow as text or icon colour; it is a fill only.
- **Don't** introduce a second typeface, uppercase labels, or letter-spaced captions.
