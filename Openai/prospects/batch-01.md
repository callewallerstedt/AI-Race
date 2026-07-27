# Prospect Batch 01

Prepared: 2026-07-27 CEST

Purpose: a first, deliberately small demand test for the 1,900 SEK excluding
VAT accessibility risk scan. This is internal qualification research, not a
claim that any company violates a law.

## Qualification method

- Consumer e-commerce site serving Sweden.
- Public evidence that the company is not obviously a micro-enterprise.
- A public corporate role address or contact form; no scraped personal data.
- A live homepage scan with axe-core 4.10.3, followed by deeper sampling only
  for the strongest candidate.
- Automated node counts are affected DOM nodes, not unique defects, legal
  findings, or a complete accessibility audit.

## Priority list

| Priority | Company | Public size evidence | Homepage signal | Public route | Decision |
|---:|---|---|---|---|---|
| 1 | Hatstore World AB | 72 employees and 390.8 MSEK 2024 revenue reported by Hitta/Allabolag | 67 critical-impact and 91 serious-impact affected nodes; repeated missing names, missing image alternatives, and contrast findings | `info@hatstore.se` in official terms | First tailored contact |
| 2 | Proteinbolaget i Sverige AB | 33 employees and about 244 MSEK 2025 revenue reported by Rating/Hitta | 1 critical-impact and 37 serious-impact affected nodes; missing image alternative and repeated contrast findings | `info@proteinbolaget.se` on official About page | Second tailored contact |
| 3 | Care of Carl AB | Official About page states more than 100 employees and 400 MSEK revenue | 11 serious-impact affected nodes, all missing discernible link names in the sampled state | Official contact route | Retain for first batch |
| 4 | Kids Brand Store | Public company sources report substantial revenue, well above micro-company scale | 16 serious-impact contrast nodes in the sampled state | Official contact route | Retain, but verify a second page before contact |
| 5 | Delitea AB | Official press page reports 76 MSEK 2024 revenue | 2 critical-impact and 10 serious-impact affected nodes | `marknad@delitea.se` and `info@delitea.se` on official pages | Deprioritize: it already publishes an accessibility statement and says an external expert assists |
| 6 | Bagaren och Kocken | Official press material describes continued growth in 2024 | Only 2 serious-impact contrast nodes in the sampled state | Official contact route | Exclude from first contact; weak tailored preview |

## First-candidate deep scan

Three public Hatstore pages returned HTTP 200 on 2026-07-27:

| Page type | Critical-impact nodes | Serious-impact nodes | Representative rule families |
|---|---:|---:|---|
| Homepage | 67 | 91 | button name, image alternative, link name, contrast, target size |
| Product page | 65 | 71 | button name, image alternative, link name, nested interactive control, contrast |
| Listing page | 79 | 176 | image alternative, select name, link name, contrast, scrollable-region focusability |

Representative DOM evidence was inspected after the automated run:

- homepage carousel previous/next buttons were empty button elements;
- product and hero image elements lacked `alt` attributes;
- product thumbnail anchors had no accessible name;
- the listing sort `<select data-testid="sort-select">` had no programmatic
  label;
- a product customization accordion used a button containing focusable
  descendants, which requires interaction-level review.

The source scan also sampled the first 30 keyboard focus stops per page. That
sequence is useful for a manual review, but it is not evidence that the entire
flow or visible focus state passed or failed.

## Outreach guardrails

- Identify the approved selling company and use its authorized sender.
- Send one individually written message to a public corporate role channel.
- Mention only current, reproducible observations; do not quote aggregate node
  counts in the opening email.
- Say explicitly that the preview is not a legal assessment.
- Include a plain opt-out and record objections immediately.
- Do not imply that PTS selected, investigated, or endorsed the prospect.
- Do not contact personal addresses or add recipients to a sequence.

## Public sources

- Hatstore official terms and role address:
  <https://hatstore.se/info/kopvillkor>
- Hatstore company size:
  <https://www.hitta.se/verksamhet/hatstore-scandinavia-ab-ioostfmg>
  and
  <https://www.allabolag.se/foretag/hatstore-world-ab/kalmar/konfektion/2K3PWEKI63II4>
- Proteinbolaget official About page and role address:
  <https://proteinbolaget.se/pages/om-proteinbolaget>
- Proteinbolaget company size:
  <https://www.rating.se/info1/light/overview/5568846132>
  and
  <https://www.hitta.se/proteinbolaget%2Bi%2Bsverige%2Bab/stockholm/hnuvvfntu>
- Care of Carl official company description:
  <https://www.careofcarl.se/sv/om-care-of-carl>
- Delitea official size, contact, and accessibility statement:
  <https://www.delitea.se/press>,
  <https://www.delitea.se/om-delitea>, and
  <https://www.delitea.se/tillganglighet>
