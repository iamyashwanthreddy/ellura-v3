# ellura® India — v3 storefront (Ritual-inspired “clinic editorial” redesign)

A third, separate visual version of the ellura® India store. v1 (`../Ellura`) and v2 (`../ellura2`, Love Wellness–inspired) are untouched. Content, product data, commerce layer and photography are carried over from v2 unchanged; **the design system, layout, typography and motion are new**.

```bash
npm install
npm run dev       # http://localhost:5174  (/ redirects to /ellura)
npm run build     # type-check + production build → dist/
```

## Design direction
Benchmark: Ritual (ritual.com) — spacious, minimal, science-led, editorial. Not copied: no Ritual logo, copy, illustration or imagery.

- **Colour** (`src/styles/tokens.css`) — only what the brand already owns: plum `#5A2E58` (sampled from the logo), lilac `#D0A6D8` (carton band) and the `#FBF7F3` studio cream of the official pack shots, so product photography sits on the page without a box. Deep plum `#2B1429` is the ink and the dark-section colour. No accent hues were added.
- **Type** — Newsreader (light editorial serif, italic for emphasis words) for display; Hanken Grotesk for interface and body. Self-hosted through `@fontsource-variable`.
- **Shape** — hairline rules instead of boxes, 14–22 px radii, pill buttons. Accordions, lists, stats and steps are ruled rows.
- **Pack photography** is multiplied onto quiet tinted tiles (with a brightness lift and feathered edge) so the cream backdrop disappears.

## Homepage (supplied structure doc)
Hero (US copy) → at-a-glance facts → UGC loop (Section 2) → US→India + “Recommended by urologists” (Section 3) → How ellura works (4) → How it is different (5) → Take control (6) → shop packs → daily habits → Rewards (7) → US-store reviews → Learn → FAQs → References.
Other pages follow `ellura new.csv` exactly (every row and URL path under `/ellura`, header/footer placement as listed).

## Motion (GSAP 3 + ScrollTrigger + SplitText, via `useGSAP`)
Hero line/panel reveal with pointer depth; split-line heading reveals; scrubbed bladder diagram (CSS-sticky, no pin); route-draw map; scrubbed quote word brightening; stat count-ups; anti-adhesion chart build; sticky stacked pack cards; pinned horizontal habits and timeline (touch devices use native swipe); looping reels; gallery clip transitions and zoom; header hide/show. Everything is scoped, reverted on unmount, gated with `gsap.matchMedia` for `prefers-reduced-motion` and breakpoints. Cart and checkout interactions are never animated beyond opacity/transform micro-feedback.

## Commerce integration (still needs credentials)
Everything network-backed goes through `src/commerce/adapter.ts`. Until the e-commerce platform and payment gateway are chosen, checkout, promo codes, tracking, accounts, reviews, newsletter, notify-me and support forms run as clearly labelled **previews** (no payment, no order, no email). Open content items are in `content-sources.md` and appear on the site as “To be confirmed”.
