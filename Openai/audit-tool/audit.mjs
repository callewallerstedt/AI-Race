#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import axe from "axe-core";
import { chromium } from "playwright-core";

const DEFAULT_CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];

function parseArgs(argv) {
  const options = {
    outputDir: path.resolve("output"),
    chromePath: process.env.ACCESSIBILITY_SCAN_CHROME,
    inputs: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--out") {
      options.outputDir = path.resolve(argv[++index]);
    } else if (value === "--chrome") {
      options.chromePath = argv[++index];
    } else if (value === "--help" || value === "-h") {
      options.help = true;
    } else {
      options.inputs.push(value);
    }
  }

  return options;
}

function showHelp() {
  console.log(`Usage:
  npm run audit -- [--out OUTPUT_DIR] [--chrome CHROME_EXE] URL_OR_FILE [...]

Examples:
  npm run audit -- https://example.com
  npm run audit -- --out output/sample fixtures/intentionally-inaccessible.html

The tool records deterministic evidence. It does not determine legal compliance.`);
}

async function firstExistingPath(candidates) {
  for (const candidate of candidates.filter(Boolean)) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Try the next known browser path.
    }
  }
  return undefined;
}

async function normalizeInput(input) {
  const isWindowsDrivePath = /^[a-z]:[\\/]/i.test(input);
  if (!isWindowsDrivePath && /^[a-z][a-z0-9+.-]*:/i.test(input)) {
    return input;
  }
  return pathToFileURL(path.resolve(input)).href;
}

function safeSlug(input, index) {
  let hostOrName;
  try {
    const parsed = new URL(input);
    hostOrName =
      parsed.hostname ||
      path.basename(decodeURIComponent(parsed.pathname), path.extname(parsed.pathname));
  } catch {
    hostOrName = path.basename(input, path.extname(input));
  }

  const slug = String(hostOrName || `page-${index + 1}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `${String(index + 1).padStart(2, "0")}-${slug || "page"}`;
}

async function collectPageStructure(page) {
  return page.evaluate(() => {
    const isVisible = (element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const accessibleText = (element) =>
      (
        element.getAttribute("aria-label") ||
        element.getAttribute("title") ||
        element.innerText ||
        element.textContent ||
        ""
      )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 120);

    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter(isVisible)
      .map((heading) => ({
        level: Number(heading.tagName.slice(1)),
        text: accessibleText(heading),
      }));

    const skippedHeadingLevels = [];
    for (let index = 1; index < headings.length; index += 1) {
      if (headings[index].level > headings[index - 1].level + 1) {
        skippedHeadingLevels.push({
          from: headings[index - 1],
          to: headings[index],
        });
      }
    }

    const interactiveSelector = [
      "a[href]",
      "button",
      "input:not([type=hidden])",
      "select",
      "textarea",
      "[tabindex]:not([tabindex='-1'])",
      "[contenteditable='true']",
    ].join(",");

    return {
      documentLanguage: document.documentElement.getAttribute("lang") || null,
      pageTitle: document.title || null,
      headings,
      skippedHeadingLevels,
      visibleInteractiveCount: [...document.querySelectorAll(interactiveSelector)].filter(
        isVisible,
      ).length,
      landmarks: {
        header: document.querySelectorAll("header,[role=banner]").length,
        navigation: document.querySelectorAll("nav,[role=navigation]").length,
        main: document.querySelectorAll("main,[role=main]").length,
        footer: document.querySelectorAll("footer,[role=contentinfo]").length,
      },
      images: {
        total: document.images.length,
        missingAltAttribute: [...document.images].filter(
          (image) => !image.hasAttribute("alt"),
        ).length,
        emptyAlt: [...document.images].filter(
          (image) => image.getAttribute("alt") === "",
        ).length,
      },
      forms: {
        totalControls: document.querySelectorAll("input,select,textarea").length,
      },
      capturedAt: new Date().toISOString(),
    };
  });
}

async function collectKeyboardSequence(page, maximumTabs = 30) {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    window.scrollTo(0, 0);
  });

  const sequence = [];
  for (let index = 0; index < maximumTabs; index += 1) {
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => {
      const element = document.activeElement;
      if (!element || element === document.body) {
        return null;
      }
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const text = (
        element.getAttribute("aria-label") ||
        element.getAttribute("title") ||
        element.innerText ||
        element.textContent ||
        element.getAttribute("name") ||
        ""
      )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 100);

      return {
        elementIndex: [...document.querySelectorAll("*")].indexOf(element),
        tag: element.tagName.toLowerCase(),
        type: element.getAttribute("type"),
        text,
        id: element.id || null,
        href:
          element instanceof HTMLAnchorElement
            ? element.getAttribute("href")
            : null,
        inViewport:
          rect.bottom >= 0 &&
          rect.right >= 0 &&
          rect.top <= window.innerHeight &&
          rect.left <= window.innerWidth,
        focusStyle: {
          outlineStyle: style.outlineStyle,
          outlineWidth: style.outlineWidth,
          outlineColor: style.outlineColor,
          boxShadow: style.boxShadow,
        },
      };
    });

    if (!focused) {
      break;
    }

    const signature = JSON.stringify([
      focused.tag,
      focused.elementIndex,
      focused.type,
      focused.text,
      focused.id,
      focused.href,
    ]);
    if (sequence.some((entry) => entry.signature === signature)) {
      break;
    }
    sequence.push({ ...focused, signature });
  }

  return sequence.map(({ signature, ...entry }) => entry);
}

function markdownEscape(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

function summarizeViolations(violations) {
  const impactOrder = ["critical", "serious", "moderate", "minor", "unknown"];
  const counts = Object.fromEntries(impactOrder.map((impact) => [impact, 0]));
  for (const violation of violations) {
    const impact = impactOrder.includes(violation.impact)
      ? violation.impact
      : "unknown";
    counts[impact] += violation.nodes.length;
  }
  return counts;
}

function buildMarkdownReport(run) {
  const lines = [
    "# Automated Accessibility Risk-Scan Evidence",
    "",
    `Generated: ${run.generatedAt}`,
    "",
    "> This automated evidence is not a legal compliance decision, certification,",
    "> or substitute for manual testing with assistive technology and users.",
    "",
    "## Run summary",
    "",
    `- Pages attempted: ${run.results.length}`,
    `- Browser: ${run.browser}`,
    `- axe-core: ${run.axeVersion}`,
    `- Viewport: ${run.viewport.width} x ${run.viewport.height}`,
    "",
  ];

  for (const result of run.results) {
    lines.push(
      `## ${result.slug}`,
      "",
      `- Requested URL: ${result.requestedUrl}`,
      `- Final URL: ${result.finalUrl || "Not loaded"}`,
      `- HTTP status: ${result.httpStatus ?? "Not available"}`,
      `- Page title: ${result.structure?.pageTitle || "Not available"}`,
      `- Document language: ${result.structure?.documentLanguage || "Missing"}`,
      `- Visible interactive elements: ${result.structure?.visibleInteractiveCount ?? "Not measured"}`,
      `- Unique keyboard focus stops sampled: ${result.keyboardSequence?.length ?? "Not measured"}`,
      `- Screenshot: ${result.screenshot || "Not captured"}`,
      "",
    );

    if (result.error) {
      lines.push(`**Load error:** ${result.error}`, "");
      continue;
    }

    lines.push(
      "### Automated findings",
      "",
      "| Impact | Affected elements |",
      "|---|---:|",
      `| Critical | ${result.summary.critical} |`,
      `| Serious | ${result.summary.serious} |`,
      `| Moderate | ${result.summary.moderate} |`,
      `| Minor | ${result.summary.minor} |`,
      `| Unknown | ${result.summary.unknown} |`,
      "",
      "| Rule | Impact | Elements | WCAG tags | Description |",
      "|---|---|---:|---|---|",
    );

    for (const violation of result.violations) {
      lines.push(
        `| ${markdownEscape(violation.id)} | ${markdownEscape(violation.impact || "unknown")} | ${violation.nodes.length} | ${markdownEscape(violation.tags.filter((tag) => tag.startsWith("wcag")).join(", "))} | ${markdownEscape(violation.help)} |`,
      );
    }

    if (result.violations.length === 0) {
      lines.push("| None detected | - | 0 | - | Automated checks found no violations |");
    }

    lines.push(
      "",
      "### Structure signals requiring manual interpretation",
      "",
      `- H1 count: ${result.structure.headings.filter((heading) => heading.level === 1).length}`,
      `- Heading level skips: ${result.structure.skippedHeadingLevels.length}`,
      `- Images missing an alt attribute: ${result.structure.images.missingAltAttribute}`,
      `- Images with empty alt text: ${result.structure.images.emptyAlt}`,
      `- Main landmarks: ${result.structure.landmarks.main}`,
      "",
      "See the JSON evidence for affected selectors, HTML excerpts, focus sequence,",
      "and the complete axe help URLs.",
      "",
    );
  }

  return `${lines.join("\n")}\n`;
}

async function auditOne(browser, requestedUrl, slug, outputDir) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    locale: "sv-SE",
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const result = {
    slug,
    requestedUrl,
    finalUrl: null,
    httpStatus: null,
    screenshot: null,
    structure: null,
    keyboardSequence: null,
    violations: [],
    passesCount: 0,
    incompleteCount: 0,
    inapplicableCount: 0,
    summary: null,
    error: null,
  };

  try {
    const response = await page.goto(requestedUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    result.httpStatus = response?.status() ?? null;
    result.finalUrl = page.url();

    try {
      await page.waitForLoadState("networkidle", { timeout: 10_000 });
    } catch {
      // Some production pages keep analytics or chat connections open.
    }

    await page.addScriptTag({ content: axe.source });
    const axeResult = await page.evaluate(async () =>
      globalThis.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
        },
        resultTypes: ["violations", "passes", "incomplete", "inapplicable"],
      }),
    );

    result.violations = axeResult.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      tags: violation.tags,
      help: violation.help,
      description: violation.description,
      helpUrl: violation.helpUrl,
      nodes: violation.nodes.map((node) => ({
        impact: node.impact,
        target: node.target,
        html: node.html,
        failureSummary: node.failureSummary,
      })),
    }));
    result.passesCount = axeResult.passes.length;
    result.incompleteCount = axeResult.incomplete.length;
    result.inapplicableCount = axeResult.inapplicable.length;
    result.summary = summarizeViolations(result.violations);
    result.structure = await collectPageStructure(page);
    result.keyboardSequence = await collectKeyboardSequence(page);

    const screenshotName = `${slug}.png`;
    await page.screenshot({
      path: path.join(outputDir, screenshotName),
      fullPage: true,
      animations: "disabled",
    });
    result.screenshot = screenshotName;
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
  } finally {
    await context.close();
  }

  return result;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help || options.inputs.length === 0) {
    showHelp();
    process.exitCode = options.help ? 0 : 1;
    return;
  }

  const chromePath = await firstExistingPath([
    options.chromePath,
    ...DEFAULT_CHROME_PATHS,
  ]);
  if (!chromePath) {
    throw new Error(
      "No Chrome/Edge executable found. Pass --chrome or set ACCESSIBILITY_SCAN_CHROME.",
    );
  }

  await fs.mkdir(options.outputDir, { recursive: true });
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--disable-dev-shm-usage"],
  });

  const normalizedInputs = await Promise.all(options.inputs.map(normalizeInput));
  const results = [];

  try {
    for (let index = 0; index < normalizedInputs.length; index += 1) {
      const requestedUrl = normalizedInputs[index];
      const slug = safeSlug(requestedUrl, index);
      console.log(`Auditing ${requestedUrl}`);
      results.push(await auditOne(browser, requestedUrl, slug, options.outputDir));
    }
  } finally {
    await browser.close();
  }

  const run = {
    generatedAt: new Date().toISOString(),
    browser: chromePath,
    axeVersion: axe.version,
    viewport: { width: 1440, height: 1000 },
    results,
  };

  await fs.writeFile(
    path.join(options.outputDir, "evidence.json"),
    `${JSON.stringify(run, null, 2)}\n`,
    "utf8",
  );
  await fs.writeFile(
    path.join(options.outputDir, "automated-report.md"),
    buildMarkdownReport(run),
    "utf8",
  );

  const failed = results.filter((result) => result.error);
  console.log(
    `Completed ${results.length - failed.length}/${results.length} pages. Evidence: ${options.outputDir}`,
  );
  if (failed.length > 0) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
