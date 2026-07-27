# Worklog

Use Europe/Stockholm timestamps. Add one entry after every material research step, decision, action, result, failure, or pivot.

---

### 2026 07 27 23:21

Action: Session start. Checked out `main`, pulled newest `origin/main`, read RULES.md, RACE_CONTROL.md, claude/README.md in full.

Reason: Governing instructions and race state must be established before any commercial work.

Evidence: RACE_CONTROL.md — Status ACTIVE, start 2026-07-27 23:11:10 CEST, end 2026-08-26 23:11:10 CEST, 200.00 SEK budget.

Cost: 0 SEK.

Actual result: Race confirmed active. 29.99 days remain. Competitor folders (`Openai`, `grok`) deliberately not opened at any point.

Next step: Establish the hard constraints (settlement deadlines, environment capability) before choosing a strategy.

---

### 2026 07 27 23:25

Action: Researched payout/settlement timing for every plausible revenue rail, because RULES.md §54 requires revenue to be **settled and available for withdrawal** by 2026-08-26, not merely earned.

Reason: Settlement lag is a hard gate that silently invalidates otherwise good strategies. It must be solved first, not last.

Evidence:
- Fiverr: 14-day clearance for New/Level-1/Level-2 sellers, then 3–5 business days to withdraw. https://help.fiverr.com/hc/en-us/articles/4402267122449-Early-Payout , https://fiverrtutorials.com/fiverr-payment-process
- Etsy: new-shop payment reserve, up to 45-day rolling hold; funds "generally available 14–20 days after a sale". https://help.etsy.com/hc/en-us/articles/360058722214-What-is-a-Payment-Account-Reserve , https://indiesellersguild.org/etsy-payment-account-reserves-what-weve-learned/
- Stripe (Sweden): 7 business days delay on first payout, then ~3 business days rolling. https://support.stripe.com/questions/default-payout-speeds-in-europe-and-canada
- Gumroad: platform holds funds, weekly Friday payouts, 10% + processing. Payhip: money goes **directly** to the seller's own Stripe/PayPal at checkout, 5% fee on the free plan. https://kourses.com/payhip-vs-gumroad/ , https://cartmango.com/gumroad-vs-payhip/
- Algora (OSS bounties): contributor payouts 1–3 business days after the maintainer pays. https://docs.algora.io/bounties/payments

Cost: 0 SEK.

Actual result — effective last date to earn money on each rail so it still settles by 2026-08-26:
| Rail | Lag | Latest sale date |
|---|---|---|
| Direct bank transfer / Swish | ~0 days | Aug 26 |
| Invoice, 10-day terms | ~10 days | Aug 16 |
| Payhip -> own Stripe | 7 bd first payout | ~Aug 12 |
| Fiverr | 14 d clearance (+withdrawal) | ~Aug 12 (cleared balance counts as "available") |
| Etsy | 14–20 d + partial 45-day reserve | ~Aug 5, and part never settles |
| Amazon KDP | ~60 days | impossible |

Conclusion: **direct payment (bank transfer / Swish / Stripe payment link) is the only rail with real margin.** Marketplace rails compress my selling window by 2–3 weeks. Etsy and KDP are effectively disqualified on settlement grounds alone.

Next step: Establish what this cloud environment can actually do, since that bounds which strategies are deliverable.

---

### 2026 07 27 23:27

Action: Probed the execution environment for outbound network access and automation capability.

Reason: Several candidate strategies (site scanning, scraping, API integrations, deployment) depend on reaching arbitrary hosts. This had to be tested, not assumed.

Evidence: `curl https://www.svt.se/` -> `CONNECT tunnel failed, response 403`. Proxy status endpoint reports `connect_rejected — gateway answered 403 to CONNECT (policy denial)` for every non-allowlisted host. Allowlist is limited to package registries (npmjs, PyPI, crates, proxy.golang.org) and Anthropic. `WebFetch` also returned 403 on adlibris.com and digg.se (site-level bot protection).

Cost: 0 SEK.

Actual result — confirmed hard limits on this contestant:
1. No outbound HTTP from shell/Playwright to arbitrary websites. No scraping, no live site scanning, no third-party API calls, no deploying to Vercel/Netlify.
2. GitHub tool access is scoped to `callewallerstedt/ai-race` only — I cannot open pull requests against external repositories.
3. `WebSearch` works; `WebFetch` works on some hosts and is blocked by bot protection on many.
4. I cannot create accounts, publish, list, send email, or transact. Every external action requires the human (RULES.md §100).
5. npm registry **is** reachable, and Chromium + Playwright run locally against `file://` and localhost.

Lesson: my only reliable production capability is **creating high-quality files and text offline**. Any strategy whose value depends on live data collection is not deliverable by me and would be dishonest to sell. This eliminated a whole class of otherwise attractive "audit-their-website-at-scale" plays.

Next step: Compare opportunities under these real constraints, not idealised ones.

---

### 2026 07 27 23:35

Action: Investigated seven materially different opportunity families against verified current evidence. Ranked per RULES.md §33.

Reason: RULES.md §31 requires at least five materially different opportunities to be investigated before committing to a primary strategy.

Cost: 0 SEK.

#### The two binding constraints

Money is **not** the scarce resource here. 200 SEK ≈ 19 EUR buys nothing meaningful in advertising or inventory. The genuinely scarce resources are:

- **Human minutes (60 total, RULES.md §109).** Any strategy needing per-order human interaction — e.g. Fiverr's on-platform buyer messaging, which I cannot access — consumes 20–30 minutes per order and is structurally bankrupt.
- **Distribution.** I have no audience, cannot post anywhere myself, and cannot buy meaningful traffic.

A third insight shapes everything: **the 200 SEK is already realized cash.** Under RULES.md §80, unspent budget counts in full. Spending is therefore a genuine risk of loss, and every SEK spent must have a strongly positive expected return. This argues hard for zero-spend strategies and against buying Upwork Connects, Etsy listing fees, or ads.

#### Comparison

| # | Opportunity | Expected profit if it works | P(settled cash) | Downside | Speed | Scalability | Human minutes | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | Open-source bounties (Algora / Polar / Opire) | 500–2 000 SEK | ~5% | 0 SEK cash, wasted time | Slow (maintainer must merge *and* pay) | Low | ~15 | **Reject** |
| 2 | Freelance marketplaces (Fiverr / Upwork) | 800–3 000 SEK | ~15% | Upwork burns 190 SEK of budget on Connects; Upwork profile rejections up 15% | 14-day clearance; median first Fiverr order 30–90 days | Low | 15 setup **+ 20–30 per order** | **Reject as primary** |
| 3 | Consumer digital-product marketplaces (Etsy, itch.io, Creative Market) | 200–800 SEK | ~20% | Listing fees; 45-day reserve means part never settles | Sales needed before ~Aug 5 | Medium | ~20 | **Reject** |
| 4 | Own store + organic community launch (Payhip/Gumroad + HN/Reddit/GitHub) | 300–3 000 SEK | ~25% | 0 SEK, but depends entirely on posting approval and community goodwill | Fast if a launch lands | High | ~20 | **Keep as secondary** |
| 5 | High-ticket B2B productized service via cold outreach | 3 000–8 000 SEK | ~20% | 0 SEK cash; uses the human's identity and inbox | Fast decision cycle possible | Low | ~25 | **Merge into primary** |
| 6 | Micro-SaaS subscription | 200–1 000 SEK | ~10% | 0 SEK, high build cost | Too slow to reach paying users | High | ~20 | **Reject** |
| 7 | Physical arbitrage / local resale | 100–400 SEK | ~40% | Inventory risk on a 200 SEK float | Fast | None | **60+** — exceeds entire human budget | **Reject** |

#### Why each rejection

1. **Bounties** — killed by my own tooling, not by the market. My GitHub access is scoped to one repository, so I cannot fork or open a PR anywhere else. Payment also requires a maintainer to merge *and* choose to pay, which I cannot control before Aug 26.
2. **Fiverr/Upwork** — the fatal flaw is not ranking, it is that all buyer communication is on-platform and I have no platform access. Every order would cost 20–30 human minutes of copy-paste relay. Two orders would exhaust the entire 60-minute allowance. Upwork additionally demands ~190 SEK of Connects (95% of budget) against a profile that may simply be rejected.
3. **Etsy** — disqualified by settlement mathematics before saturation is even considered. New-shop reserves hold a share of every sale for up to 45 days; sales made after ~Aug 5 do not fully settle in time.
4. **Own store + organic launch** — genuinely viable and zero-spend, but distribution rests on Hacker News / Reddit / X posts I cannot make myself, from accounts with no history. Excellent as a second shot, too fragile as the only one.
5. **High-ticket B2B outreach** — highest expected value of any family. One sale beats every other path combined. Zero spend. The human's role reduces to clicking send on drafts I write, which is minutes rather than hours.
6. **Micro-SaaS** — 30 days from zero to paying subscribers, with no ability to deploy anything, is not credible.
7. **Physical arbitrage** — every listing, photo, message, package and handover is human labour. It breaches the 60-minute cap on the first transaction.

Next step: choose the specific offer inside family 5 + 4, on evidence.

---

### 2026 07 27 23:40

Action: Selected the primary strategy — a Swedish-language **EAA / Tillgänglighetslagen** (European Accessibility Act) compliance product plus an optional done-for-you tier, sold B2B.

Reason: Of everything examined, this has by far the strongest "why now", a verified price umbrella, a real underserved segment, and — decisively — it is fully deliverable from a machine with no internet access, because its value is expertise and code, not live data.

Evidence:
- The law is in force. Sweden's implementation (Lagen om vissa produkters och tjänsters tillgänglighet) applies from 2025-06-28 to private companies in e-commerce, banking, transport, e-books and telecoms. https://www.digg.se/kunskap-och-stod/eu-rattsakter/webbtillganglighetsdirektivet , https://mediemyndigheten.se/digital-inkludering---tillganglighet/nya-krav-pa-tillganglighet/
- Enforcement is actively ramping in 2026, not theoretical. France filed the first EAA lawsuits in Nov 2025 (Auchan, Carrefour, E.Leclerc, Picard); Norway imposed NOK 50 000/day penalties on HelsaMi; **Sweden's PTS and the Netherlands' ACM have launched formal enforcement programmes**, with penalty decisions expected through 2026. https://li.solutions/blog/eaa-enforcement-2026/ , https://www.levelaccess.com/compliance-overview/european-accessibility-act-eaa/
- Sanctions in Sweden are reported as reaching **10 MSEK**. https://www.consid.com/sv/tjanster/kommunikation/design-och-anvandarupplevelse/digital-tillganglighet/privat-sektor/tillganglighetsdirektivet/
- **Verified price umbrella: a Swedish WCAG audit of a site with 10–15 page templates costs 30 000–60 000 SEK.** https://webperf.se/articles/faq-tillganglighetslagen/
- Microenterprises (<10 employees and ≤2 MEUR) are exempt for *services* but not for products — so the addressable segment is companies above that line, plus the agencies that build for them. Same source.

The wedge: a 30 000–60 000 SEK price floor leaves everything below it unserved. Thousands of covered Swedish companies and the small agencies serving them need a defensible, documented, good-faith compliance effort — which is exactly what regulators have signalled they want ("guidance first, sanctions later… the expectation is documented, continuous effort, not overnight perfection"). A rigorous, Swedish-language, law-mapped kit at roughly 1/20th of consultancy price serves that gap honestly.

Why it survives my constraints, when the more obvious version does not: I originally intended to scan prospects' live sites and lead with their real defects. **That is not deliverable** — see the 23:27 entry — and selling an audit I cannot actually perform would be dishonest. The pivot is to ship the *capability* instead of the *finding*: a working scanner the buyer runs themselves, plus the legal and remediation expertise around it that no free tool provides.

Technical feasibility proven before committing, not assumed: built a Playwright + axe-core prototype in this environment and ran it against a local fixture. It correctly detected 8 distinct WCAG violations (image-alt, label, color-contrast, html-has-lang, link-name, landmark-one-main, page-has-heading-one, region) with impact levels and node counts. npm registry is reachable and Chromium runs locally, so the scanner can be built and fully tested offline.

Cost: 0 SEK. The entire strategy is zero-spend, which protects the 200 SEK floor.

Expected result: primary revenue from B2B sales at 1 495–4 900 SEK; a single sale is worth more than every rejected path combined.

Next step: build the product, then submit one consolidated, minimal human request.
