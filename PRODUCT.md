# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Tailwind CSS (v4) on Vite, chosen by the user. Built into a single self-contained HTML file and published to a private Claude artifact link that the team opens in a browser.

## Users

A Thai hackathon team of 3–4 people preparing for the Sea × OpenAI Regional Codex Hackathon Thailand (event Saturday 21 Nov 2026; applications close 23 Oct 2026). Together they browse, shortlist and compare ideas to choose one to build and pitch. They read on laptops in team sessions and on phones in between.

## Product Purpose

Help the team pick one idea with confidence. Each idea is scored against the four judging criteria and carries enough depth (problem, flow, autonomy, Codex role, 12-hour scope, demo moment, risks, upgrade plan) to judge whether it can win and be built in one day. Success: the team narrows 145 ideas to a shortlist, compares finalists, and commits to one.

## Positioning

Every idea is adapted from a real winning project at a Thai or international hackathon and linked to its source, then given a Thai twist and an honest critique (the weakness a judge would spot and how to fix it). It is a decision tool, not an idea generator.

## Operating Context

- Hackathon tracks: T1 Autonomous & Adaptive AI, T2 AI-Native Products & Operations, T3 Deep Domain AI.
- Judging criteria: problem framing, build quality, depth of thinking, effective use of Codex. Scores shown as P / B / D / C, each out of 5, total out of 20.
- Team also wants alignment with UN SDG 2, 3, 8, 9 and 16.
- One-day build (8:30–21:00), teams of 3–4; pre-built code is likely banned.

## Capabilities and Constraints

- 145 ideas (#1–#145): 105 Track 1/2, 40 Track 3. Data in `src/data/ideas.json`, sources in `src/data/sources.json`.
- Each idea: name, track, SDGs, based-on projects, idea, Thai twist, score before and after upgrade, detail (problem, users, how, autonomy, unexpected, codex, mvp, data, demo, sdg, sea, risks, pitch; Track 3 also domain + expert), upgrade (weakness, fixes, killer, proof, combo).
- Required: search, filter by track and SDG, sort by score, shortlist (per viewer, browser storage), full detail view, jump between ideas and to combo ideas, links to sources.
- Artifact constraints: single HTML file, no external requests except Google Fonts, no downloads, no print, works at phone width, light and dark themes.
- UI language: Thai labels and headings, with terms like Track, SDG, Codex, agent kept in English. Idea content stays in its current language (mixed English summary, Thai detail).

## Evidence on Hand

- Winner sources (59) with event names and URLs in `src/data/sources.json`.
- Scores, details and upgrades are Claude's estimates and proposals, not results. Figures marked "(หาตัวเลขอ้างอิงก่อน pitch)" or "(ตรวจสอบกับแหล่งทางการ)" are unverified and must stay marked. Do not present any number as a measured result.

## Product Principles

1. Decision over browsing: every view should help the team compare and eliminate.
2. Honest by default: estimates look like estimates; unverified facts stay flagged.
3. Depth on demand: scan fast in the list, go deep in the detail.
4. Every idea traces back to a real winner.
