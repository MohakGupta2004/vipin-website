# DESIGN.md — Vipin Garg website

Read this before changing any UI. It records the design direction and the exact values in use, so every
agent makes the same choices. Values come from `app/globals.css`, `app/layout.tsx` and
`components/home/hero.tsx` (the reference implementation). If code and this file disagree, check
the code, then update this file in the same change.

## 1. Direction

- **What it is:** the personal course brand of one teacher (Vipin Garg, CFA). Canadian finance exam prep
  (IFC, CSC, CIRE, RSE, LLQP, WME, FP1, FP2…). It sells his courses. It is **not** an institution,
  regulator or government site. No serif-and-hairlines "official body" look.
- **Look:** Apple-like. Calm, light, lots of space, semibold sans display type with tight tracking,
  one accent colour (blue) used only on actions, and frosted glass over photography in the hero.
- **Main goal:** send people to the learning app (`app.vipingarg.com`: /signup, /login, /courses) with
  UTM tags. Build app links with `appUrl(kind, { campaign })` from `components/layout/app-links.ts`.
- **Competitors to benchmark:** only Business Career College and SeeWhy Learning.
- **Copy:** use the copy from the client's reference zip as-is. Do not rewrite headlines.
- **Honesty:** no invented proof (ratings, pass rates, reviews, logos, "as seen in"). The only proof
  allowed today is the four hero facts (§6). Unknown facts get a `PLACEHOLDER:` comment in code
  (exact format, the user greps for it).
- **Light theme only.** The `dark` variant is bound to a class that is never set.

## 2. Colour tokens

Use the Tailwind token names (`bg-primary`, `text-heading`…), not raw hex, unless the value is listed
under "Apple neutrals".

| Token | Value | Use |
|---|---|---|
| `--background` / `--surface` | `#ffffff` | Page and cards |
| `--surface-2` | `#f4f7fa` | Quiet fills, hover rows |
| `--surface-inverse` / `--heading` | `#102a42` | Navy: headings, dark bands, hero overlay base |
| `--foreground` | `#48566a` | Body text |
| `--muted-foreground` | `#5d6d82` | Secondary text, eyebrows, leads |
| `--primary` = `--cta` = `--link` = `--ring` | `#2463eb` | The one accent: buttons, links, focus |
| `--cta-hover` | `#1d4fd7` | Button hover |
| `--accent` / `--accent-foreground` | `#e5efff` / `#1d4fd7` | Tinted chips, badge fills |
| `--border` / `--border-strong` | `#dae3ec` / `#7a8ca1` | Hairlines / input borders |
| `--brand-teal` / `--teal-tint` | `#80b79c` / `#e9f6f0` | Rare secondary brand colour |
| `--success` / `--warning` / `--destructive` | `#1f6f4f` / `#92400e` / `#dc2828` | States only, with their `-bg` tints |
| `--inverse-fg` / `--inverse-muted` / `--inverse-link` | `#ffffff` / `#b8c7d9` / `#9cc0ff` | Text on navy |

**Apple neutrals (raw values, used as-is):**
- `#fbfbfd`: the lightest section background.
- `#f5f5f7`: alternate section background. It is the most-used band colour (26 uses).
- `#86868b`: grey second half of a headline on light backgrounds.

**Rules:** one accent per view. Blue goes on actions, never on decoration. No purple and no
multicolour gradients. Gradients are allowed only as overlays and fades on photos, plus the soft
radial light in the hero.

## 3. Typography

- **Three voices:**
  - **Main** (headings and the default "voice"): one selectable family, `--font-main`, used by `font-heading` and
    `font-serif`. Default is **Manrope**. Headings are `font-weight: 600`; never 700+ for display type.
  - **Secondary** (body text): the `system-ui` stack (`--font-sans`, SF Pro on Apple devices). No font file is loaded.
  - **Tertiary** (small accents): the Menlo stack (`--font-mono`, class `font-mono`). Used only on course codes
    (`course-card.tsx`, `course-catalogue.tsx`) and the "Step n of 3" counter in `exam-finder.tsx`, always with
    `tabular-nums tracking-normal`.
- **Font playground (testing tool):** the "Aa" button, bottom-left (`components/dev/font-playground.tsx`), switches the
  main font (Manrope, Inter, Inter Tight, Geist, Hanken Grotesk, Familjen Grotesk, Instrument Sans, Figtree, System) and the
  headline weight (350 / 450 / 600) live. It sets `<html data-font>` and `<html data-display-weight>` and remembers the
  choice in `localStorage`. It shows in development, and in production only when `fontPlayground.enabled` is `true` in
  `config/feature-flags.json` (default `false`). Candidate fonts are loaded in `app/layout.tsx` with `preload: false`
  (only Manrope is preloaded), so a font file downloads only once it is selected or shown in the playground panel.
- **Lock in a choice later:** change `data-font="..."` on `<html>` in `app/layout.tsx` and the default `--font-main` in
  `:root` of `app/globals.css` to the same family; then delete the other fonts from `layout.tsx`, the `[data-font]`
  rules, and the playground. A lighter headline weight means changing the `font-weight: 600` on headings in
  `globals.css` (h1–h4, `.text-display`, `.font-heading` users).
- **Body:** 17px (`1.0625rem`), line-height 1.65.
- **Tracking tightens as size grows** (Apple rule; never one value for every size):

| Element | Size | Line-height | Tracking (≥640px) | Tracking (phones) |
|---|---|---|---|---|
| h1 | `clamp(2.5rem, 1.75rem + 3vw, 4rem)` | 1.04 (1.06 on phones) | -0.04em | -0.035em |
| Hero h1 | 2.5rem → 2.75rem (≥400px) → 3.75rem (sm) → `clamp(2.75rem,4.4vw,4.25rem)` (lg) | 1.04 | -0.04em | -0.04em |
| h2 | `clamp(1.875rem, 1.45rem + 1.7vw, 2.75rem)` | 1.08 | -0.035em | -0.03em |
| h3 | `clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)` | 1.25 | -0.02em | -0.015em |
| h4 | 1.125rem | 1.35 | -0.01em | -0.01em |
| `.text-display` | `clamp(2.5rem, 1.75rem + 3vw, 5rem)` | 1.05 | -0.02em | -0.02em |
| `.text-lead` | `clamp(1.125rem, …, 1.3125rem)` (17px on phones) | 1.55 (1.6 on phones) | — | — |
| `.text-eyebrow` | 1.0625rem (15px on phones), weight 600, muted | 1.3 | -0.005em | -0.005em |
| Stat values | 1.75rem → 2.125rem (sm), `tabular-nums` | 1 | -0.035em | -0.035em |

- **Two-tone headline:** the last phrase is in a muted tone, for example "Pass Your Next Financial Exam
  *with Confidence*". On light backgrounds it is `#86868b`; on photos and dark backgrounds it is
  `text-white/60`.
- **Eyebrows:** sentence case and grey. Never spaced-out uppercase blue labels.
- **Wrapping:** use `text-balance` on headings, `text-pretty` on paragraphs, `tabular-nums` on numbers.
  Keep the measure at about 42ch for leads.

## 4. Layout and spacing

- **Containers:** `.container-site` is max 75rem, then 80rem at ≥1280 and 90rem at ≥1536. Side padding is
  1.25rem, then 2rem (sm), 2.5rem (lg) and 3rem (xl). Use it for every section's content.
- **Section rhythm:** `py-20 sm:py-28`. Alternate section backgrounds between white, `#fbfbfd` and `#f5f5f7`.
- **Hero height (desktop):** exactly one screen:
  `lg:min-h-[max(36rem,calc(100svh-var(--header-h)-2.75rem-1px))]`. That is the window minus the 2.75rem
  announcement bar and the header. `--header-h` is 3.75rem, or 4rem at ≥1024px.
- **Approach:** desktop-first, but must work at 320px with no horizontal scroll. Grid columns that
  hold no-wrap pills need `min-w-0`.
- **Use `h-dvh`/`svh`, never `h-screen`.** `body` already has `overflow-x-clip`.

## 5. Shape, depth and glass

- **Radius:**
  - Big surfaces (sections, media, large cards): `rounded-section` (1.75rem token).
  - Panels: `rounded-panel` (1.5rem token). Stat and glass cards: `rounded-2xl`.
  - Drop to `rounded-2xl` on phones when a big radius looks clumsy.
  - Buttons and chips in marketing areas are **pills** (`rounded-full`).
  - Theme radius tokens (`--radius-*`, 2–12px) are for small UI such as forms and app-like controls.
- **Hairline instead of border:** `shadow-[0_0_0_1px_rgb(0_0_0/0.06)]` (0.05–0.10 range).
- **Float shadow:** `--shadow-float`. Big media shadow: `shadow-[0_40px_80px_-48px_rgb(16_42_66/0.6)]`.
  Modal: `--shadow-modal`. Keep shadows soft, long and negative-spread. Never muddy.
- **Frosted glass over photography or navy (hero):**
  - Base: `bg-white/10 ring-1 ring-white/20 backdrop-blur-md`. Stat cards use `ring-white/15 backdrop-blur-xl`.
  - Glass button adds `ring-white/25 shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_8px_24px_-16px_rgb(0_0_0/0.7)] hover:bg-white/15`.
  - Text on glass is white. Secondary text is `white/75`, then `white/60`, then `white/45` for separators.
- **Glass utilities (`app/globals.css`, Apple-measured).** Each has a solid fallback inside
  `@supports not (backdrop-filter)` and sets `-webkit-backdrop-filter` too:

| Utility | Background | Blur | Shadow | Use |
|---|---|---|---|---|
| `glass-nav` | `rgb(251 251 253 / 0.8)` | `saturate(180%) blur(20px)` | `0 1px 0 rgb(0 0 0 / 0.06)` | Sticky header |
| `glass-control` | `rgb(232 232 237 / 0.72)` | `saturate(180%) blur(20px)` | `inset 0 0 0 0.5px rgb(0 0 0 / 0.11), 0 4px 8px rgb(0 0 0 / 0.05)` | Floating buttons and panels on light pages |
| `glass-control-dark` | `rgb(16 42 66 / 0.72)` | `saturate(180%) blur(20px)` | `inset 0 0 0 0.5px rgb(255 255 255 / 0.14), inset 0 1px 0 rgb(255 255 255 / 0.08)` | Floating controls over photos or navy |
| `glass-capsule` | `rgb(255 255 255 / 0.72)` | `saturate(180%) blur(20px)` | `inset 0 0 0 0.5px rgb(0 0 0 / 0.08), 0 8px 24px -12px rgb(16 42 66 / 0.25)` | Floating "Buy"-style bar |
| `curtain` | `rgb(232 232 237 / 0.4)` | `blur(20px)` | none | Behind open menus |
| `scrim` | `rgb(16 42 66 / 0.4)` | `blur(20px)` | none | Behind modals and sheets |

  Fallback backgrounds: `#fbfbfd`, `#e8e8ed`, `#102a42`, `#ffffff`, `rgb(232 232 237 / 0.85)`, `rgb(16 42 66 / 0.6)`.
  - **Rules:** glass is for chrome (header), floating controls and the curtain/scrim behind overlays. Never on content
    cards. At most 3 blurred surfaces visible at once. Never animate or transition `backdrop-filter`; fade the element's
    opacity instead. A utility only reaches the stylesheet once a component uses it.

## 6. The hero (reference implementation: `components/home/hero.tsx`)

The look is called "Glass" (reference: a coach hero with glassmorphism on the left). The client approved
it on 2026-11-05. Copy its patterns for other photo-led bands.

1. **Photo:** full-bleed `public/hero.jpg`, which shows two professionals learning at a laptop. It is a
   generic corporate scene. **Do not use Vipin's portrait or a model as the hero image, and do not cut out
   the photo's background.** Use `object-cover object-[70%_50%] saturate-[.85]`, `sizes="100vw"` and
   `priority`.
2. **Navy fade over the photo** (base `rgb(16 42 66)`):
   - Desktop: left-to-right fade, `0.85 → 0.48 → transparent`.
   - Phones: bottom-to-top fade, `0.92 → 0.62 → transparent`.
3. **Soft light:** a radial white glow at the top left (`size-[34rem]`, `blur-3xl`, alpha `0.28 → 0.08`).
4. **Content, in this order** (all of it must stay; do not drop items when re-laying out):
   1. Eyebrow in a glass pill: "Canadian financial licensing & certification".
   2. h1 "Pass Your Next Financial Exam with Confidence", white with a `white/60` tail.
   3. Subhead in `white/75`, max 42ch.
   4. Two category pills:
      - Securities · IFC, CSC & CIRE: solid white, navy text.
      - Financial planning · codes from course data: glass.
   5. Text links: "Explore Learning Platform" (app signup, `campaign: "home-hero"`) and "Find my course".
      Both are white with a **north-east arrow (`ArrowUpRight`)**.
   6. Four facts as glass stat cards: 10+ years teaching, 300+ trained, 2000+ hours, CFA Charterholder
      since 2014.
      - Desktop: a row of 4 pinned to the bottom (`bottom-8`).
      - Phones: a 2×2 grid under the actions.
5. **Pills:** built on the project `buttonVariants({ variant: "cta", size: "lg" })` plus
   `h-[3.25rem] rounded-full px-7`. On phones under 360px the padding drops to `px-4`.
6. **Exam lists come from `lib/data/courses.ts`.** Include only courses with `offerConfirmed` that are
   not `upcoming`. Never hardcode a list that can drift.
7. **Phones/tablets (< lg, 1024px).** Desktop above is unchanged; below `lg` the hero is restructured:
   - Section is navy `#102a42`. The photo is a full-bleed top band (`h-[16rem] sm:h-[22rem]`, `object-[60%_30%]`)
     under a top-to-bottom fade `transparent → navy/0.35 → #102a42`. No radial light.
   - Content is left-aligned and starts inside the fade (`pt-44 sm:pt-64`), bottom padding `pb-24` to clear the floating buttons.
   - Eyebrow is a compact glass pill (13px, 12px under 360px), always one line.
   - Subhead 16px (17px from sm), max 34ch.
   - Categories are ONE grouped glass list (`rounded-2xl`, hairline dividers, 56px rows, label · codes, `ArrowUpRight`).
     From sm it is two columns side by side. The two desktop pills are hidden.
   - Text links sit in one wrapping row, 15px (17px from sm).
   - Facts are ONE glass panel: 2×2 on phones, 1×4 from sm, hairline cell borders, number 24px, label 12px.

## 7. Components and controls

- **Reuse first:**
  - Buttons: `components/ui/button.tsx` (`buttonVariants`, cva + Base UI).
  - Primitives: Base UI. Don't mix primitive systems.
  - Class merging: the `cn()` helper.
- **Pill helpers (`components/forms/styles.ts`):** all 48px, `rounded-full` (also on phones), press `scale-[0.97]`.
  - `ctaButton`: the one blue conversion button per view.
  - `primaryButton`: navy pill.
  - `secondaryButton`: white pill with a hairline, for light backgrounds. Works on `<Button variant="outline">` and `<Link>`.
  - `onDarkButton`: solid white pill for navy bands.
  - `textLink`: inline link in body copy.
- **`ArrowLink` (`components/ui/arrow-link.tsx`):** `<ArrowLink href tone="light|dark">` is the standalone "go somewhere" link
  with the `ArrowUpRight` nudge. `http` links open in a new tab with an sr-only note.
- **`SectionIntro` (`components/home/section-intro.tsx`):** optional `eyebrow` (grey sentence-case line above the h2) and
  `tail` (grey second half of the headline, `#86868b` or `text-white/60` on dark).
- **Arrows:** use a north-east `ArrowUpRight` for "go somewhere" links and CTAs, matching the header
  "Learning App ↗". On hover it nudges `translate-x-0.5 -translate-y-0.5`. Do not use right-pointing
  chevrons on new CTAs.
- **Focus:** every interactive element shows
  `outline-2 outline-offset-2 outline-ring` on `:focus-visible`.
- **Touch targets:** at least 44px (`min-h-11`, `size-11`).
- **Icons:** lucide-react, `aria-hidden` when decorative. Icon-only buttons need an `aria-label`.
- **Floating site controls:**
  - The calendar and WhatsApp buttons sit bottom-right, and the Next dev indicator bottom-left.
  - Keep key content clear of the bottom 6rem on phones.

## 8. Motion

- **Easing:**
  - Strong ease-out with no overshoot: `cubic-bezier(0.22, 1, 0.36, 1)`.
  - Overlays: `cubic-bezier(0.2, 0, 0, 1)`.
  - Sheets and accordions: `cubic-bezier(0.32, 0.72, 0, 1)`.
- **Animate only `transform` and `opacity`.** Interaction feedback must be ≤200ms.
- **Classes in `globals.css`:**
  - `vg-rise`: hero copy, 8px rise, 560ms. Stagger it 55ms per block with `animationDelay: 40 + i*55 ms`.
  - `vg-settle`: photo fade plus a 1.03→1 settle.
  - `vg-reveal`: scroll reveal, 18px.
  - `vg-pop`: dropdowns, 180ms.
  - `vg-enter-*`: overlays.
  - `vg-sheet`: phone bottom sheet.
  - `vg-details`: FAQ height animation.
- **Count-up stats:** `components/home/count-up.tsx`. The server renders the final value, and reduced
  motion shows the final value.
- **Reduced motion:** a global rule cuts every transition to near zero and swaps the entrances for a 120ms
  fade. Don't fight it.
- **No looping animation**, except the finite three-pass sheen on the announcement bar.

## 9. Checks before calling UI work done

- Run `pnpm -s typecheck` and `pnpm -s lint`. Run `pnpm build` when routes change; the home page must
  stay static (`○ /`).
- Take screenshots at **1440×900** and **390×844**, and check **320px** for horizontal overflow.
  Use global Playwright: `export NODE_PATH=$(npm root -g)` and a `.mjs` script in a scratch dir.
  Don't add Playwright to the project.
- Check that no console errors appear, and that keyboard focus is visible on every control.
- Don't commit to `main` without asking. Rollback tag: `pre-redesign-2026-11-02`.

## 10. Known open items

- The source and licence of `public/hero.jpg` are unknown (marked `PLACEHOLDER:` in `hero.tsx`).
- On phones, the floating calendar and WhatsApp buttons cover the hero buttons. This is site-wide.
- Radius: tokens `rounded-section` (1.75rem) and `rounded-panel` (1.5rem) are added. Migration from
  arbitrary `rounded-[1.75rem]`/`[1.5rem]` values is in progress. Do not add new arbitrary radii.
- These sections are hidden until real data exists:
  - Reviews and the pass wall.
  - Insurance in the hero categories.
  - Guarantee terms, the masterclass date and the founder video (`siteConfig` placeholders).
- `CareerPathways` is imported in `app/page.tsx` but commented out (lint warning).

## 11. Inspiration used

- **Reference designs:**
  - Glass hero: Robert Alison coach concept.
  - Coach band: Waymark.
  - Framed SaaS hero: Dextego.
- **Galleries:**
  - SaaSpo (heroes), Lapa Ninja (course pages), SaaSFrame (LMS).
  - Godly, Landingfolio, One Page Love and regards.design.
- **Closest real analogue:** markmeldrum.com, a single-teacher CFA prep brand.
- **UI rule sets** (via `npx ui-skills get <slug>`):
  - Typography and glass reference site: `.redesign/ref/mimohq-DESIGN.md` (light grotesk display type, tight tracking).
  - `ibelick/baseline-ui`: project conventions win over its "no tracking, no gradient" rules.
  - `mengto/landing-page`.
  - `jakubkrehel/make-interfaces-feel-better`.
