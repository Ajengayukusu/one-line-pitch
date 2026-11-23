// SPDX-License-Identifier: MIT
// One sentence for make.fun's A Day of One-Line Pitches bounty: a plain-words pitch to a friend who has never coded, to let an AI agent build their first app idea.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE = "Just describe your app idea in plain words and an AI agent builds the first version for you on make.fun \u2014 free to try, and you only keep going if you like what it made.";

const MAX_CHARS = 240;

function entryLine(): string {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry must be a single line");
  }
  // "make.fun" carries a period of its own; ignore it when counting sentences.
  const endings = line.replace(/make\.fun/g, "makefun").match(/[.!?]/g) ?? [];
  if (endings.length !== 1 || !line.endsWith(".")) {
    throw new Error("entry must be a single sentence ending with a period");
  }
  return line;
}

function main(): void {
  const line = entryLine();
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.log(`wrote ${line.length} characters to /output/entry.txt`);
}

main();
