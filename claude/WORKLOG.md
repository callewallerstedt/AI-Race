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

---

### 2026 07 28 00:15

Action: Built the product. `claude/produkt/` now contains a working scanner plus five documents.

Reason: The strategy needs something genuinely worth paying for before any selling starts.

Evidence: `claude/produkt/tillganglighetskollen/` — Playwright + axe-core scanner (`skanna.mjs`), a Swedish rule dictionary covering 55 axe rules with plain-language explanation, consequence, concrete fix and mapped WCAG criterion (`src/regler-sv.js`), and a self-contained HTML report generator (`src/rapport.js`). Documents in `claude/produkt/dokument/`: legal overview, 38-point manual checklist, accessibility-statement template, developer remediation guide with before/after code, and a compliance-plan template.

Cost: 0 SEK.

Actual result: Verified end to end, not assumed. Ran against a purpose-built demo page carrying the defects that actually recur on Swedish webshops; the tool found 13 failures across 10 rules (4 critical, 8 serious, 1 moderate) and every rule it hit was covered by the Swedish dictionary. Screenshotted the rendered report to check it visually.

Two features exist specifically because of what the law rewards rather than what is easy to build:
- `--jamfor` compares a run against a previous JSON and reports what was fixed and what regressed. Regulators have signalled they want documented, continuous effort, so evidence of movement over time is the thing worth selling.
- The report leads with an explicit statement that automated testing covers roughly a third of WCAG 2.1 AA. That costs some persuasive force and buys the only thing that matters more — being the honest option in a category full of overlay widgets that promise compliance they cannot deliver.

Failure worth recording: I first wrote the entire Swedish corpus without å, ä and ö. For a product sold to Swedish companies that is not cosmetic — it would have destroyed credibility on sight. Caught it during visual QA and rewrote the rule dictionary, report generator and CLI strings. Lesson: for a localised product, proofread in the target language before treating the build as done.

Next step: build the go-to-market.

---

### 2026 07 28 01:10

Action: Attempted to build a prospect list. Discovered a second hard constraint and adapted.

Reason: The product is worthless without buyers, and I have no ability to publish or post.

Evidence: `WebFetch` returned HTTP 403 on every commercial site attempted — adlibris.com, digg.se, webperf.se, solvd.se, sverigewebb.se. `WebSearch` works normally and does surface verified contact addresses directly in result summaries (info@webbkompaniet.se, info@webbproffs.se, info@lightweb.se, kontakt@intervaro.se).

Cost: 0 SEK.

Actual result: I cannot read arbitrary web pages, only search them. That kills any plan needing per-prospect page analysis, and it means list building runs at search speed rather than crawl speed. Twenty Swedish web agencies compiled so far in `claude/forsaljning/prospektlista.csv`, with each address marked as verified or still to be confirmed, so nothing gets sent on a guess.

This also settled the choice of target. RULES.md §64 bars using the human's existing audience or personal brand, so posting to their network is out regardless. Cold outreach to strangers is the one direct channel the rules leave open.

Segment chosen: Swedish web and digital agencies first, e-commerce companies second. Agencies are technical buyers who already understand WCAG, carry the problem across many clients, sit below any purchase-approval threshold at these prices, and can be reached at a general company address. The agency licence at 4 950 SEK is under four billable hours for them.

Next step: submit the two blocking human requests.

---

### 2026 07 28 01:25

Action: Wrote the sales assets and filed requests C-001 and C-002.

Reason: Everything that can be done without the human is now done. What remains genuinely requires a person: a legal selling entity, and the physical act of sending email.

Evidence: `claude/forsaljning/erbjudande.md` (offer, evidence-backed pricing, objection handling), `claude/forsaljning/utskick-mallar.md` (outreach templates and the rules each send must follow), `claude/forsaljning/prospektlista.csv`, `claude/REQUESTS.md` (C-001, C-002).

Cost: 0 SEK. Spending remains at zero and the 200 SEK floor is intact.

Pricing, with reasoning: 1 495 SEK for a single company, 4 950 SEK for an agency licence, optional 2 900 SEK guided tier. 1 495 sits below most companies' approval threshold so a developer or marketing lead can decide alone without an procurement process. The guided tier is deliberately designed around my constraint that I cannot reach their site — the customer runs the scan and sends me the JSON, and I return a remediation plan, a drafted accessibility statement and a filled compliance plan. That is honest about who does what, and still deliverable.

Expected result: 15–25% chance of at least one sale across an 80-email campaign. I would rather state that plainly than inflate it.

Next step: await the human. Meanwhile continue expanding the prospect list, which needs no permission.

---

### 2026 07 28 02:05

Action: Requests C-001 and C-002 answered. Recorded both, and rebuilt the payment side of the plan around the answer.

Reason: One of the two answers invalidated a component I had already designed, so it had to be replaced rather than quietly kept.

Evidence: `claude/REQUESTS.md` — C-001 and C-002 now marked APPROVED with the answers recorded verbatim.

Cost: 0 SEK. Human time used: 2 minutes of 60.

Actual result:
1. **Company approved as seller.** The 1 495 / 4 950 SEK B2B price points survive.
2. **No Stripe, no PayPal, no Swish for business. Invoice only.** This kills the Payhip self-serve checkout outright — Payhip pays out only into a seller's own Stripe or PayPal, and neither exists. Deleted from the plan rather than left as an aspiration.
3. **Cold outreach approved**, with me preparing Gmail drafts and the human pressing send.

The consequence I care about most is the deadline moving. An unpaid invoice is worth zero under RULES.md §82, so cash must actually arrive by 2026-08-26. With 10-day terms plus bank days, **the last safe order date is about 14 August** — twelve days earlier than the race end. Orders after that must be prepaid. This is now the governing date.

Second consequence: invoice-only means roughly three human minutes per sale instead of zero. I offset that by building a generator rather than accepting the cost.

Next step: eliminate the per-sale overhead, then get the campaign ready.

---

### 2026 07 28 02:30

Action: Built the invoicing and delivery machinery, and verified the customer experience end to end.

Reason: With invoice-only selling, every unautomated step is a permanent tax on a 60-minute human budget. Automating it once is cheap; paying it per order is not.

Evidence and results:
- `claude/forsaljning/faktura/skapa-faktura.mjs` — takes buyer details on the command line and emits a finished Swedish invoice: correct 25% VAT, EU reverse charge with the article 196 reference via `--eu`, running invoice numbers, due dates, prepayment mode via `--forskott`. Tested for domestic VAT (4 950 → 6 187,50 kr) and reverse charge (4 395 kr, 0 VAT). Rendered and inspected visually.
- Seller company details live in a **gitignored** `saljare.json`. Organisation number, VAT number, address and bankgiro never enter this repository, satisfying RULES.md §45 and §101. I deliberately did not ask for those details at all.
- `claude/produkt/LICENS.md` — licence terms for both tiers, third-party licences for axe-core (MPL 2.0) and Playwright (Apache 2.0), and a liability section that repeats the one-third coverage limit so the buyer cannot claim they were led to believe otherwise.
- `claude/forsaljning/bygg-leverans.sh` — builds the customer ZIP. 56 KB, small enough to attach to an email.

Verification, done as a customer rather than as the author: extracted the ZIP into a clean directory, ran `npm install`, ran the scanner. It found the same 13 failures. Then I edited the demo page to fix three defects — added `lang="sv"`, two alt texts and a `<title>` — and re-ran with `--jamfor`. The report correctly showed **13 → 9 fel (-4, förbättring)** and named exactly the three rules that had been fully resolved: `image-alt`, `document-title`, `html-has-lang`.

That comparison feature is the main thing being sold, since documented progress over time is what the tillsyn asks for. It is now proven rather than claimed.

Cost: 0 SEK. Spending remains zero; the 200 SEK floor is untouched.

Next step: prospect list to 40, then the sender identity needed to write the emails.

---

### 2026 07 28 02:45

Action: Prospect list expanded to 40 Swedish web and e-commerce agencies. Filed request C-003.

Evidence: `claude/forsaljning/prospektlista.csv` — 40 organisations, 6 with addresses verified directly in search results, the rest with `info@`-pattern addresses marked `antagen - bekräfta` so nothing is sent on an unmarked guess. Batch 1 is the six verified ones.

One entry deliberately demoted: a verified but personal address (`nils@sunbird.se`) is marked "använd ej i batch 1". Sending to a named individual moves the message out of pure B2B and into unnecessary personal-data processing, so the company address is used instead even though the personal one is the confirmed one.

Cost: 0 SEK.

Blocker: I cannot write a single email until I know who it is from. Every outreach email must identify sender and company by name — that is both a marknadsföringslagen requirement and the difference between a legitimate approach and spam. C-003 asks for exactly four fields and nothing else about the company.

Next step: on receiving C-003, create the batch-1 Gmail drafts.
