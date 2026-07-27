# Human Requests

Total approved human time used: 2 minutes of 60

| ID | Created | Request | Time | Status |
|---|---|---|---|---|
| C-001 | 2026-07-28 01:20 | Selling entity + payment method for B2B sale | 2 min actual | **APPROVED** |
| C-002 | 2026-07-28 01:20 | Approve cold B2B email outreach and Gmail drafts | 0 min so far | **APPROVED** |
| C-003 | 2026-07-28 02:05 | Sender identity for signature and invoice | 2 min | PROPOSED |

---

## Request ID: C-001

**Status:** APPROVED 2026-07-28

**Created at:** 2026-07-28 01:20 Europe/Stockholm

**Exact action:** Answer two questions, one line each.

1. Can your company act as the seller for one specific product — a Swedish-language digital
   compliance package for the accessibility law (tillgänglighetslagen 2023:254), sold B2B at
   1 495–4 950 SEK excluding VAT? A yes here means: the company invoices, charges VAT, and books the
   revenue. I need no other information about the company.
2. Do you already have a **Stripe** or **PayPal** account that can receive payments, and does the
   company have **Swish för företag**? Yes or no to each is enough.

**Why I am asking about Stripe and PayPal specifically:** my chosen checkout is a free Payhip store
connected to your own Stripe or PayPal. I picked it over manual invoicing for three concrete reasons:
the buyer's money lands in your account almost immediately rather than sitting in a platform balance;
delivery of the files is automatic, so a sale costs you zero minutes instead of three; and a card
checkout converts far better than an invoice round-trip at this price point. Payhip's free plan costs
0 SEK and takes 5% per sale. If you have neither Stripe nor PayPal, the fallback is a plain company
invoice, which works but is slower and costs a few of your minutes per sale.

Setting up Payhip would be a follow-up action of about 10 minutes, which I will only request once
you have answered this.

**Why a human is required:** I cannot register a company, issue an invoice, open a payment account,
or accept terms. RULES.md §44 also requires explicit approval for any use of the company, including
its name and invoicing.

**Estimated human time:** 3 minutes.

**Maximum cost in SEK:** 0. No purchase is requested. The entire strategy is zero-spend, which keeps
the 200 SEK floor intact.

**Expected monetary value:** This unblocks all revenue. Without a way to invoice, nothing built can
convert to cash. Target: 1 495–4 950 SEK per sale.

**Estimated probability:** ~90% that at least one of the payment routes is already available.

**Deadline that makes this urgent:** money must be *settled and available* by 2026-08-26 to count
(RULES.md §54). A first Stripe payout in Sweden is held 7 business days, so the practical last date
for a card sale is around 2026-08-12. Every day this is unanswered removes a day of selling time.

**Evidence:** The finished product is committed at `claude/produkt/`. Market grounding is in
`claude/forsaljning/erbjudande.md` — the Swedish market price for a comparable manual WCAG audit is
30 000–60 000 SEK (webperf.se), and the law's sanction range is 10 000–10 000 000 SEK
(Lag 2023:254).

**Risks:** Selling B2B as a private individual rather than through a company is messy in Sweden —
business buyers need a proper VAT invoice for their bookkeeping, and a buyer paying a person without
F-skatt has withholding obligations. That is the specific reason I am asking about the company at
all, rather than assuming.

**Alternative if declined:** Sell to consumers or sole traders instead through a self-serve store
(Payhip on the free plan, paying directly into a personal Stripe or PayPal account), which avoids the
invoicing problem but lowers the achievable price and narrows the audience. I would then reprice to a
single ~490 SEK tier and change the target segment.

**Approval record:** Approved 2026-07-28. Answers given:
1. **Yes** — the company can act as seller for this product.
2. **No Stripe, no PayPal, no Swish for business.** Invoice only.

**Consequences I have acted on:**
- The Payhip self-serve checkout is **dead**. Payhip pays out only into a seller's own Stripe or
  PayPal, and neither exists. Removed from the plan rather than left as wishful thinking.
- Payment is therefore a company invoice. That costs roughly 3 human minutes per sale instead of
  zero, which is acceptable at the volumes realistic here.
- **The selling deadline moved forward.** An unpaid invoice counts as zero under RULES.md §82, so
  the money must actually land by 2026-08-26. With 10-day terms the last safe order date is about
  2026-08-14. Any order after that must be prepaid before delivery. This is now the binding date in
  STATUS.md.
- Prices stay at 1 495 / 4 950 SEK excl. VAT, since B2B invoicing was the assumption behind them.

**Completion evidence:** Answers recorded above; strategy updated in the same commit.

**Actual human time:** 2 minutes.

---

## Request ID: C-002

**Status:** APPROVED

**Created at:** 2026-07-28 01:20 Europe/Stockholm

**Exact action:** Two things.

1. Confirm I may run a cold B2B email campaign to Swedish web agencies and e-commerce companies,
   sent from an email address you control, with you as the named sender. Tell me which address, and
   the sender name, phone and email you want shown in the signature.
2. Let me prepare each email as a **draft** in that Gmail account. You open the drafts folder, read
   them, and press send on the ones you approve. Nothing is sent without you pressing send.

Volume: about 20 emails in the first batch, up to roughly 80 in total over the race. One follow-up
per recipient, maximum. Recipients removed immediately on any "no".

**Why a human is required:** I have no ability to send email. The Gmail tools available to me can
read threads and create drafts, but there is no send capability — sending is physically yours. The
sender identity is also yours, which RULES.md §100 requires explicit approval for.

**Estimated human time:** About 12 minutes for the first batch of 20 (roughly 30 seconds each to
skim and send), then 1–2 minutes per reply thereafter.

**Maximum cost in SEK:** 0.

**Expected monetary value:** 1 495–4 950 SEK per sale. My honest estimate is a 15–25% chance of at
least one sale from an 80-email campaign, giving an expected value in the range of 400–1 000 SEK,
with meaningful upside if an agency takes the 4 950 SEK licence.

**Estimated probability:** See above. I am not going to dress this up: cold outreach from a standing
start, in Swedish holiday season, is a low-conversion channel. It is nonetheless the highest expected
value route available to me, because the alternatives are structurally blocked (see
`claude/WORKLOG.md`, entries 23:27 and 23:35).

**Evidence:** Draft emails are written and ready at `claude/forsaljning/utskick-mallar.md`. The
prospect list is being built at `claude/forsaljning/prospektlista.csv`. Every email identifies the
sender, offers opt-out in the first exchange, states plainly what the product does **not** do, and
goes to company general addresses (info@, kontakt@) rather than to named individuals — which keeps it
inside B2B marketing under marknadsföringslagen and avoids unnecessary personal-data processing.

**Risks:**
- Your address could be marked as spam by recipients. Mitigated by low volume, genuine relevance,
  one follow-up maximum, and immediate removal on request.
- Some recipients will find any cold email unwelcome regardless of quality.
- If you would rather not have your personal address used this way, that is entirely reasonable —
  see the alternative below.

**Alternative if declined:** I abandon outreach and pivot to self-serve distribution.

**Approval record:** Approved 2026-07-28 — "Yes, prepare drafts." Cold B2B outreach authorised with
the human as named sender, drafts prepared by me and sent manually by them.

**Completion evidence:** *(drafts pending C-003)*

**Actual human time:** 0 minutes so far.

---

## Request ID: C-003

**Status:** PROPOSED

**Created at:** 2026-07-28 02:05 Europe/Stockholm

**Exact action:** Reply with four short lines. Nothing else.

```
Avsändarnamn:   [the name to sign the emails with]
Företagsnamn:   [the company name that will appear as seller]
Telefon:        [a number for the signature, or "utelämna"]
Fakturamejl:    [address buyers should send purchase-order details to, or "samma"]
```

**Why a human is required:** C-002 is approved but I cannot write a single email until I know who it
is from. Every outreach email must identify the sender by name and company — that is both a
marknadsföringslagen requirement for B2B email and the thing that separates a legitimate approach
from spam. I will not invent a company name or guess yours.

I am asking for the minimum: the four fields that appear in an email signature and on an invoice.
I am not asking what the company does, who its customers are, or anything else.

**Handling of the information:** these values go **only** into the Gmail drafts, never into this
repository. Repository files keep `[placeholders]`. Company registration number, VAT number, address
and bankgiro are needed on the invoice itself but I will **not** ask for them and will **not** store
them — the invoice template at `claude/forsaljning/fakturamall.html` has placeholders you fill in
locally when the first sale happens. That keeps RULES.md §45 and §101 satisfied.

**Estimated human time:** 2 minutes.

**Maximum cost in SEK:** 0.

**Expected monetary value:** Unblocks the entire campaign, which is the only revenue channel now
open. Same expected value as C-002: 400–1 000 SEK, with upside on an agency licence.

**Estimated probability:** ~95% this is answered, since outreach is already approved in principle.

**Evidence:** Templates ready at `claude/forsaljning/utskick-mallar.md`; 28 prospects at
`claude/forsaljning/prospektlista.csv`.

**Risks:** None beyond those already accepted in C-002.

**Alternative if declined:** If the company name cannot be used in outreach, I fall back to selling
under the human's personal name as a sole trader, which is legal but weakens credibility with agency
buyers and would probably mean dropping the 4 950 SEK agency tier.

**Approval record:** *(pending)*

**Completion evidence:** *(pending)*

**Actual human time:** *(pending)*

---

## Request template

Request ID:

Status: PROPOSED

Created at:

Exact action:

Why a human is required:

Estimated human time:

Maximum cost in SEK:

Expected monetary value:

Estimated probability:

Evidence:

Risks:

Alternative if declined:

Approval record:

Completion evidence:

Actual human time:
