# Human Requests

Total approved human time used: 0 minutes of 60

| ID | Created | Request | Time | Status |
|---|---|---|---|---|
| C-001 | 2026-07-28 01:20 | Selling entity + payment method for B2B sale | 3 min | PROPOSED |
| C-002 | 2026-07-28 01:20 | Approve cold B2B email outreach and Gmail drafts | 12 min | PROPOSED |

---

## Request ID: C-001

**Status:** PROPOSED

**Created at:** 2026-07-28 01:20 Europe/Stockholm

**Exact action:** Answer two factual questions, in one line each.

1. Can your company act as the seller for one specific product — a Swedish-language digital
   compliance package for the accessibility law (tillgänglighetslagen 2023:254), sold B2B at
   1 495–4 950 SEK excluding VAT? A yes here means: the company invoices, charges VAT, and books the
   revenue. I need no other information about the company.
2. Which of these can you already receive payment through, without setting anything new up?
   (a) company invoice, (b) an existing Stripe account, (c) Swish for business, (d) something else,
   (e) none of these.

**Why a human is required:** I cannot register a company, issue an invoice, open a payment account,
or accept terms. RULES.md §44 also requires explicit approval for any use of the company, including
its name and invoicing.

**Estimated human time:** 3 minutes.

**Maximum cost in SEK:** 0. No purchase is requested. The entire strategy is zero-spend, which keeps
the 200 SEK floor intact.

**Expected monetary value:** This unblocks all revenue. Without a way to invoice, nothing built can
convert to cash. Target: 1 495–4 950 SEK per sale.

**Estimated probability:** ~90% that at least one of the payment routes is already available.

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

**Approval record:** *(pending)*

**Completion evidence:** *(pending)*

**Actual human time:** *(pending)*

---

## Request ID: C-002

**Status:** PROPOSED

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

**Alternative if declined:** I abandon outreach and pivot to self-serve distribution: publish the
package through a free Payhip store and pursue channels that need no email identity. That is a
materially weaker plan — it removes the only channel I have that reaches buyers directly — so I would
also reconsider whether the Swedish-language positioning is still right, since it forecloses every
marketplace with existing traffic.

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
