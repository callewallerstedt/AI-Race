# Accessibility Risk Scan

Client: `[company]`

Website: `[domain]`

Scan date: `[date and time with time zone]`

Prepared by: `[approved seller identity]`

## Executive summary

We reviewed three public pages as a fast, prioritized accessibility risk scan:

1. `[home page]`
2. `[product page]`
3. `[search or checkout-flow page]`

The scan found `[number]` confirmed high-priority barriers, `[number]`
medium-priority barriers, and `[number]` lower-priority improvements. The most
important observed user impacts were `[plain-language impacts]`.

This is a scoped technical and usability review. It is not legal advice,
certification, a complete EN 301 549/WCAG conformance audit, or a guarantee of
compliance. Automated checks cover only part of accessibility; the findings
below combine tool evidence with manual interpretation.

## Priority actions

| Priority | Action | User impact | Page(s) | Suggested owner |
|---|---|---|---|---|
| 1 | `[action]` | `[impact]` | `[pages]` | `[role]` |

## Confirmed findings

### `[ID]` — `[short finding title]`

- Priority: `[Critical / High / Medium / Low]`
- Observed on: `[URL and component]`
- User impact: `[who is affected and what task is blocked or made harder]`
- Evidence: `[manual steps, selector, screenshot reference]`
- Relevant reference: `[WCAG success criterion or EN 301 549 clause]`
- Recommended remediation: `[specific implementation guidance]`
- Verification: `[how to retest the fix]`

## Positive observations

Record working patterns worth preserving. Do not imply that an untested area
conforms.

## Method

- Current desktop Chromium at 1440 × 1000
- Automated axe-core checks tagged to WCAG A/AA
- Keyboard-only navigation and visible-focus review
- 200% zoom and narrow viewport reflow
- Structure, headings, landmarks, forms, names, roles, and status messages
- NVDA spot check for representative navigation and interactions

## Scope limits

- Only the three named public pages and interactions were reviewed.
- No authenticated account, payment completion, native app, email, PDF, or
  third-party flow was tested unless explicitly listed.
- Content and deployments can change after the recorded scan time.
- Legal applicability, exemptions, and disproportionate-burden assessments are
  outside this technical risk scan.

## Evidence index

| Evidence ID | File | Description |
|---|---|---|
| E-01 | `evidence.json` | Machine-readable automated results and selectors |
| E-02 | `[page screenshot]` | Full-page capture at scan time |

## Retest option

A retest should verify the listed fixes against the same steps and record any
regression or scope change. A retest is not included unless the accepted order
states otherwise.

