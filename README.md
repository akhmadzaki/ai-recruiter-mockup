# Recruiter Talent AI

An AI-assisted recruitment workspace, built as a single-page portfolio piece. AI ranks and
summarises candidates; **humans make every hiring decision**.

Built with **React 18**, **Vite 5**, **Tailwind CSS 3**, and **Framer Motion 11**. All data is
mocked in [`src/data/mockData.js`](src/data/mockData.js) — there is no backend and no real Google
OAuth call.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build
```

Click **Continue with Google** on the login screen. The session is simulated (1.1s round-trip) and
persisted in `localStorage` until you log out.

## What's inside

| Area | Details |
| --- | --- |
| **Auth** | Mock Google sign-in with loading state, persisted session, account menu, logout. |
| **Dashboard** | Company workspace, hiring stats, searchable open-role cards with pipeline distribution, review queue, AI policy panel. |
| **Pipeline** | Five stages (Screening → HR Interview → Technical Test → CEO Interview → Offer) as accessible tabs with live counts. |
| **Candidates** | AI-ranked cards showing fit score, rank, strengths, watch-outs, and self-declared accessibility needs. |
| **AI analysis** | Code-split drawer with full summary, score breakdown, evidence, accommodations, and an explicit "what the model did not see" note. |
| **Human decision** | Advance / Hold / Reject recorded per candidate with toast feedback. The AI score never changes. |
| **Data density** | Card ⇄ table view, sortable columns, column visibility toggles, pagination, expandable rows, search, and sort controls. |
| **Theming** | Class-based dark mode with a pre-paint theme script (no flash, no CLS) and a spring-animated switch. |

## Design system

Reusable primitives live in [`src/components/ui`](src/components/ui):

- `Button` — 7 variants, 4 sizes, loading state
- `Card`, `Badge`, `Avatar`, `Skeleton` (shimmer), `ScoreRing` / `ScoreBar`
- `Tabs` — WAI-ARIA roving tabindex + arrow/Home/End keys
- `Drawer` — portal, focus trap, Escape to close, scroll lock, focus restoration
- `Toast` — `aria-live` region with auto-dismiss
- `ThemeToggle` — `role="switch"` with `aria-checked`

Colour semantics are centralised in [`src/lib/utils.js`](src/lib/utils.js) (`scoreTone`) and
[`src/lib/stageTones.js`](src/lib/stageTones.js), so a score or stage always maps to the same
colour **and** text label — colour is never the only signal.

## Accessibility

- Skip link, semantic landmarks, and a single `<h1>` per view.
- Keyboard-first: visible focus rings, roving tabindex on tabs, focus trap in the drawer, Escape
  to close, focus restored to the trigger.
- `aria-live` announcements for loading, result counts, and recorded decisions.
- `aria-sort` on sortable table headers, `aria-expanded` on expandable rows, `aria-pressed` on
  toggles.
- WCAG AA contrast in both themes; `prefers-reduced-motion` disables animation and smooth scroll.
- Accessibility disclosures are labelled as self-declared, excluded from scoring, and shown only
  to arrange accommodations.

## Performance

- System font stack — no webfont request on the critical path.
- Theme applied by an inline script before first paint (avoids flash and layout shift).
- Route-level code splitting: the analysis drawer is a lazy chunk.
- Vendor chunks split for `react` and `framer-motion`; CSS is split per chunk.
- Memoised sorting/filtering, `content`-light DOM, and no layout-thrashing animations.
- Production build: ~24 kB gzip app JS, ~40 kB motion, ~43 kB React, ~8 kB CSS.

## Project structure

```
src/
├── App.jsx                 # providers, view routing, skip link, footer
├── components/
│   ├── auth/               # LoginScreen
│   ├── dashboard/          # Dashboard, JobCard
│   ├── job/                # JobDetail, ApplicantCard, ApplicantTable, ApplicantDrawer
│   ├── layout/             # Header, Logo
│   └── ui/                 # design-system primitives + icons
├── context/                # ThemeContext, AuthContext
├── data/mockData.js        # company, jobs, stages, 27 candidates
├── hooks/useFocusTrap.js
└── lib/                    # utils, stage tones
```

## Notes

- Scores, summaries, and evidence are generated deterministically from the mock records so the
  demo is stable across reloads.
- The "AI" is a template-based simulation — no model is called.
- This is a portfolio demo; do not use it to process real candidate data.
