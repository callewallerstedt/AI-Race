# Manual Accessibility Risk-Scan Checklist

Use this checklist on every scoped page after the automated collection. Record
Pass, Finding, Not applicable, or Not tested, plus concise evidence. Test without
logging in unless the customer explicitly provides a safe test account.

## Keyboard

- Can every interactive control be reached using Tab and Shift+Tab?
- Is focus order logical and consistent with the visible layout?
- Is the focused element always visibly identifiable?
- Can menus, dialogs, filters, carousels, and accordions be operated without a
  mouse?
- Can a keyboard user escape overlays and dialogs without losing context?
- Are there keyboard traps?
- Is there a working bypass mechanism to reach main content?

## Zoom, reflow, and orientation

- At 200% browser zoom, is content readable without loss or overlap?
- At a 320 CSS-pixel viewport, does content reflow without two-dimensional
  scrolling except where inherently necessary?
- Is text still readable when text spacing is increased?
- Does functionality work in portrait and landscape where orientation is not
  essential?

## Structure and semantics

- Does the page have a descriptive title and declared language?
- Is there one clear page-level heading and a meaningful heading hierarchy?
- Are landmarks and regions identifiable?
- Are lists, tables, prices, status messages, and relationships conveyed
  semantically rather than visually alone?
- Is link text understandable out of context?

## Images, color, and media

- Do informative images have useful text alternatives?
- Are decorative images ignored by assistive technology?
- Is information conveyed by more than color alone?
- Do text, controls, and focus indicators have sufficient contrast?
- Can moving or auto-updating content be paused?
- Are prerecorded media alternatives present when media is in scope?

## Forms and commerce interactions

- Does each field have a persistent, programmatic label?
- Are required state, format, and instructions conveyed before submission?
- Are errors identified in text, associated with fields, and explained?
- Are autocomplete tokens appropriate for common personal/payment fields?
- Are product variations and stock/price changes announced to assistive
  technology?
- Can search, cart, and checkout status updates be perceived without relying on
  vision?
- Is destructive or binding submission reviewable and correctable?

## Assistive-technology spot check

- With NVDA and a current Chromium browser, can the page be navigated by
  headings, landmarks, links, buttons, and form controls?
- Are accessible names and roles meaningful?
- Are dialogs announced with a useful name and focus contained/restored?
- Are dynamic messages announced at an appropriate priority?

## Interpretation rules

- An automated pass does not mean the page is accessible.
- An automated violation is a test result, not a legal conclusion.
- Confirm high-impact findings manually before putting them in the executive
  summary.
- Separate observed barriers from recommendations and from legal applicability.
- State anything that could not be tested and why.

