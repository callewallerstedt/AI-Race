# Accessibility Risk-Scan Tool

This tool collects reproducible technical evidence for the productized
three-page accessibility risk scan. It launches an installed Chrome or Edge
browser, runs axe-core against WCAG 2.0/2.1/2.2 A/AA tags, records page structure
and a bounded keyboard-focus sequence, and saves full-page screenshots.

It deliberately does **not** claim to certify compliance. Automated tests detect
only a subset of accessibility barriers and can return false positives or
require human interpretation.

## Install and test

From this directory:

```powershell
npm.cmd install
npm.cmd test
```

## Run a scan

```powershell
npm.cmd run audit -- --out output\example https://example.com
```

Pass three public URLs for the pilot deliverable:

```powershell
npm.cmd run audit -- --out output\client `
  https://shop.example/ `
  https://shop.example/product/example `
  https://shop.example/search?q=example
```

Outputs:

- `evidence.json`: detailed selectors, excerpts, failure summaries, structure,
  and keyboard focus sequence;
- `automated-report.md`: readable automated summary;
- one full-page PNG per URL.

The client report must add the manual checks in `../templates/manual-checklist.md`
and professional interpretation. Never expose authentication data, cookies,
personal data, or secrets in evidence.

