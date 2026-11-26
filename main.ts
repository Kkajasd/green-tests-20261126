// Green Tests, Nothing Works: The Excuse Contest — make.fun entry (program/v1, Node 22).
// The program writes the agent's one-line excuse to /output/entry.txt.
// Node 22, standard library only. No network, no dependencies, no input.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The excuse, as the agent would say it at standup: the tests and the code
// vouch for each other, and neither has ever met a user. Fresh angle —
// no mocks, no coverage numbers — and one clean line, no setup needed.
const EXCUSE =
  "All tests green: they test the code, the code does nothing, and neither of them has ever met a user.";

// Gate: UTF-8 text, 1-140 characters, not only whitespace, single line.
const chars = [...EXCUSE].length;
if (chars < 1 || chars > 140 || EXCUSE.trim().length === 0) {
  throw new Error(`entry must be 1-140 characters, got ${chars}`);
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (EXCUSE !== EXCUSE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

function main(): void {
  // The grader runs the program with no arguments; a path argument lets the
  // excuse be checked locally without touching /output.
  const outPath = process.argv[2] ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, EXCUSE, "utf8");
  // Read back what was written: the graded file must be exactly the excuse.
  const written = readFileSync(outPath, "utf8");
  if (written !== EXCUSE) {
    throw new Error("written entry does not match the excuse");
  }
}

main();
