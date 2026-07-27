# Exempelrapport: svensk e-handel A

Scan date: 2026-07-27

Scope: homepage, one product page, and one product-listing page

Method: axe-core 4.10.3 in desktop Chrome, page-structure capture, screenshot,
and a 30-stop keyboard sequence sample on each page

## Executive summary

The three-page sample found repeated barriers in essential shopping content:
controls without accessible names, commerce images without text alternatives,
and a sorting control without a programmatic label. Contrast candidates and
interaction patterns also need review.

These patterns are high priority because they occur in product discovery and
selection rather than in incidental content. A shared component fix can remove
many affected instances at once.

The figures below count affected DOM nodes. They are not counts of unique
defects, legal findings, or evidence of a complete audit.

| Page | Critical-impact nodes | Serious-impact nodes | Most repeated candidates |
|---|---:|---:|---|
| Homepage | 67 | 91 | missing image alternatives, target size, contrast, unnamed controls and links |
| Product | 65 | 71 | missing image alternatives, unnamed card controls and thumbnails, contrast |
| Listing | 79 | 176 | contrast, missing image alternatives, scrollable-region focusability, unnamed sort control |

## P1: controls lack accessible names

### Observation

The homepage contained empty previous and next carousel button elements. The
product page also contained repeated card buttons and image-thumbnail links
without discernible text.

Example pattern:

```html
<button class="previous"></button>
<button class="next"></button>
```

### User impact

A screen-reader user can hear only “button” or “link” and cannot determine the
action or destination. Repeated unnamed controls make product exploration
especially costly.

### Recommended fix

Give icon-only controls a concise localized name and keep decorative icons out
of the accessibility tree:

```html
<button type="button" aria-label="Föregående produkter">
  <svg aria-hidden="true">...</svg>
</button>
<button type="button" aria-label="Nästa produkter">
  <svg aria-hidden="true">...</svg>
</button>
```

For a linked thumbnail, use the product name as visible text or as the link's
accessible name. Avoid copying the same generic name to every product.

### Verification

Inspect the accessibility tree, then navigate the component with only the
keyboard and a screen reader. Confirm that every control announces a unique
purpose and its relevant state.

## P1: commerce images have no text alternative

### Observation

Hero, product-card, and product-thumbnail `<img>` elements were rendered
without `alt` attributes across all three sampled page types.

Example pattern:

```html
<img src="/product-image.jpg" width="218" height="174">
```

### User impact

When the image communicates the product, colour, angle, or promotion, a user
who cannot see it loses information needed to compare or select products.
Decorative images without an explicit empty alternative can also be announced
as noisy file information.

### Recommended fix

- Use specific alternatives for informative product images, for example
  `alt="Svart fitted-keps med vit laglogotyp framifrån"`.
- Use `alt=""` only when the same information is already adjacent and the image
  adds no meaning.
- Centralize the policy in the image/card component and require suitable
  product data rather than deriving alternatives from filenames.

### Verification

Turn images off or inspect the accessibility tree. The remaining names and text
must still support product discovery without redundant repetition.

## P1: the listing sort control has no programmatic label

### Observation

The product-listing page exposed this control without an accessible name:

```html
<select data-testid="sort-select">...</select>
```

### User impact

A screen-reader or voice-control user may encounter an unnamed combo box and
not know that it changes product ordering.

### Recommended fix

Prefer a visible label:

```html
<label for="product-sort">Sortera produkter</label>
<select id="product-sort" name="sort">...</select>
```

If the design already has nearby visible text, connect it with
`aria-labelledby`; do not rely on placeholder-like text alone.

### Verification

Confirm that the accessibility tree exposes the localized name “Sortera
produkter” and that selecting an option produces a predictable update.

## P2: contrast and interaction candidates need component-level review

Automated checks flagged repeated text contrast candidates, including measured
ratios below the normal-text 4.5:1 threshold in the sampled rendered state.
Scrollable product regions and a nested interactive accordion pattern were also
identified.

These should not be bulk-accepted from automation. Review the actual design
tokens across default, hover, focus, disabled, and promotional states; test
carousel and accordion behaviour with keyboard and screen-reader combinations.

## Recommended implementation order

1. Fix shared image and product-card components.
2. Name all icon-only carousel and card controls.
3. Label the sorting component and verify dynamic updates.
4. Correct failing foreground/background token pairs.
5. Manually test the changed components with keyboard, 200% zoom, and at least
   one desktop screen reader.
6. Rerun the automated scan and regression-test all three templates.

## Limitations

This sample is a technical risk scan, not a full WCAG audit, certification, or
legal opinion. It does not cover authenticated checkout, mobile layouts,
multiple browsers, speech input, a complete screen-reader matrix, cognitive
review, or user testing. Representative DOM snippets and the homepage
screenshot were inspected; full assistive-technology verification remains part
of a paid delivery.
