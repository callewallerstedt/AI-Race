# Claude Status

Last updated: 2026-07-28 02:45 Europe/Stockholm

## Current score

Cash balance: 200.00 SEK

Settled revenue: 0.00 SEK

Total spending: 0.00 SEK

Current realized profit: 0.00 SEK

Human time used: 2 minutes of 60

## Current strategy

**Sell a Swedish-language EAA / Tillgänglighetslagen compliance package B2B, at zero spend.**

The product is built and verified. It is a working WCAG 2.1 AA scanner plus five compliance
documents, targeting the gap under the 30 000–60 000 SEK price floor for a Swedish manual accessibility
audit. First target segment is Swedish web and e-commerce agencies, reached by cold email.

Pricing: 1 495 SEK single licence, 4 950 SEK agency licence, optional 2 900 SEK guided tier.

## What exists right now

| Asset | Location | State |
|---|---|---|
| WCAG 2.1 AA scanner | `produkt/tillganglighetskollen/` | Working, tested end to end |
| Swedish rule dictionary, 55 axe rules | `produkt/tillganglighetskollen/src/regler-sv.js` | Done |
| Swedish HTML report generator | `produkt/tillganglighetskollen/src/rapport.js` | Done, visually reviewed |
| Example report from a real run | `produkt/tillganglighetskollen/exempel/` | 13 findings across 10 rules |
| Legal overview | `produkt/dokument/01-juridisk-oversikt.md` | Done, sources verified |
| Manual checklist, 38 checks | `produkt/dokument/02-checklista-wcag-2.1-aa.md` | Done |
| Accessibility statement template | `produkt/dokument/03-tillganglighetsredogorelse-mall.md` | Done |
| Developer remediation guide | `produkt/dokument/04-utvecklarguide-atgarder.md` | Done, 15 fixes with code |
| Compliance plan template | `produkt/dokument/05-efterlevnadsplan-mall.md` | Done |
| Offer and objection handling | `forsaljning/erbjudande.md` | Done |
| Outreach templates | `forsaljning/utskick-mallar.md` | Done |
| Prospect list | `forsaljning/prospektlista.csv` | 40 agencies, 6 addresses verified |
| Invoice generator | `forsaljning/faktura/skapa-faktura.mjs` | Working: VAT, EU reverse charge, prepayment |
| Licence terms | `produkt/LICENS.md` | Done, both tiers |
| Delivery packaging | `forsaljning/bygg-leverans.sh` | Working, 56 KB ZIP, verified from clean extract |

## Evidence and assumptions

- Tillgänglighetslagen (2023:254) applies to private companies from 2025-06-28; PTS supervises
  e-commerce; sanction range 10 000–10 000 000 SEK. Sources: Sveriges riksdag, PTS.
- Publishing information about the service's accessibility is a standalone requirement under 25 §
  LPTT and 24 § of förordning (2023:676) — the requirement most companies miss entirely.
- Swedish manual WCAG audit of a 10–15 template site costs 30 000–60 000 SEK (webperf.se). This is
  the price umbrella the product sits under.
- Microenterprise exemption: fewer than 10 employees **and** ≤2 MEUR, services only.
- Scanner verified locally against a fixture: 13 findings across 10 rules, all covered by the
  Swedish dictionary.

## Next action

Awaiting **C-003** — the sender name, company name, phone and sending address. Nothing else is
blocking. On receipt I create the batch-1 Gmail drafts immediately.

## Blockers

1. **C-003 pending.** I cannot write an outreach email without knowing who it is from; every email
   must identify sender and company by name.
2. **No outbound network from the shell.** Egress policy returns 403 for all non-registry hosts, so
   no live site scanning, no scraping, no deployment.
3. **WebFetch blocked on commercial sites.** Every attempt returned 403, so prospect research runs at
   search speed and page-level analysis is impossible. Strategy was chosen to survive this.
4. **No ability to create accounts, publish, list, or send email.** Every external action is the
   human's.

## Critical dates

| Date | Why it matters |
|---|---|
| **2026-08-14** | **Binding date.** Last safe order date for a 10-day invoice to be paid before the deadline. Orders after this must be prepaid. |
| 2026-08-26 23:11 | Race ends. Revenue must be settled and available by then |

## Final report

Complete this section at the deadline.
