import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import process from "node:process";

const outputDir = path.resolve("output", "self-test");
const fixture = path.resolve("fixtures", "intentionally-inaccessible.html");

await fs.rm(outputDir, { recursive: true, force: true });

const exitCode = await new Promise((resolve, reject) => {
  const child = spawn(
    process.execPath,
    ["audit.mjs", "--out", outputDir, fixture],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      windowsHide: true,
    },
  );
  child.once("error", reject);
  child.once("exit", resolve);
});

assert.equal(exitCode, 0, "Audit process should succeed");

const evidence = JSON.parse(
  await fs.readFile(path.join(outputDir, "evidence.json"), "utf8"),
);
assert.equal(evidence.results.length, 1);
assert.equal(evidence.results[0].error, null);
assert.match(
  evidence.results[0].requestedUrl,
  /^file:/,
  "Local paths should be normalized to file URLs",
);
assert.ok(
  evidence.results[0].violations.some((violation) => violation.id === "image-alt"),
  "Fixture should trigger image-alt",
);
assert.ok(
  evidence.results[0].violations.some(
    (violation) => violation.id === "button-name",
  ),
  "Fixture should trigger button-name",
);
assert.ok(
  evidence.results[0].structure.skippedHeadingLevels.length > 0,
  "Fixture should record a skipped heading level",
);
assert.ok(
  evidence.results[0].keyboardSequence.length > 0,
  "Fixture should produce a keyboard focus sequence",
);

console.log("Self-test passed.");
