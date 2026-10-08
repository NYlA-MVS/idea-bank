---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Idea Bank: main app surface

Scope: the whole single-page app (list + detail, compare, shortlist, score map). Visitor mode: Operate.
Audience and job: a Thai hackathon team of 3–4 narrowing 145 ideas to one before 23 Oct 2026, on laptops in team sessions and phones in between.
Constraints from the team: not too decorative, not generic SaaS, not too dense, must work on phone.
Content: 145 ideas, scores are estimates, unverified figures stay flagged.

## Direction contract

THESIS: Colour as identity, the way every Thai reader decodes สีประจำวัน. Each idea wears a short ribbon whose colours say its track and its score band; shortlisting ties a red ribbon on. Refuses the category default of neutral cards with one indigo accent and tag-pill soup.

OWN-WORLD: White paper ground (warm-neutral, not cream) and near-black ink. The seven day colours each own exactly one job: Friday blue = T1, Saturday purple = T2, Thursday orange = T3, Sunday red = shortlisted (reserved, nowhere else), Wednesday green / Monday yellow / Tuesday pink = score bands (≥18 / 15–17 / ≤14). Colour lives on ribbons, track rail bars, score-map dots and selection fills only, never on large surfaces. Flat ink, no gradients, no shadows beyond one panel edge. One Thai UI family (Anuphan), tabular figures for every number.

STORY: The team scans ranked ideas, filters by track and SDG, opens one to read the full breakdown and upgrade, ties a red ribbon on the ones worth keeping, ranks them อันดับ 1–n, lines up 2–4 in compare, and checks the score map for the sweet spot of buildable and deep.

FIRST VIEWPORT: Top bar: name คลังไอเดีย, four view tabs (รายการ, Shortlist, เปรียบเทียบ, แผนที่คะแนน) with counts. Left rail (desktop): search, track rail with bars sized by idea count, SDG chips, sort. Centre: ranked rows, each led by its vertical ribbon, then #, name, one-line idea, SDG chips, total /20 in large tabular figures with P B D C beneath, tie-ribbon toggle. Right (≥1280px): the selected idea's detail panel, open on the top idea. Phone: rail collapses into a filter sheet, detail opens as a full-height sheet.

FORM: Day-Colour Ribbons, assigned as candidate 5 of my grounded list after re-roll 1. Raises: reserved shortlist colour (orienteering), strict tabular numerics (datamatics), selection as colour fill not chrome (metro tiles), track rail sized by count (acetate tab manual). Seed key 5d245e78. Signature interaction: tying the red ribbon (a 200ms band slide on the row ribbon), mirrored in shortlist and compare.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
