#!/usr/bin/env node
// Fail on hidden or bidirectional Unicode in the files that steer tools or people:
// agent and editor config, git hooks, workflows, and every Markdown file.
// Zero-width characters, bidi controls, BOM, tag characters: "Trojan Source" and
// rule-file backdoors hide instructions in them. Escapes only, so this file stays clean.
//
// Usage: node scripts/check-hidden-unicode.mjs           check the tracked files in scope
//        node scripts/check-hidden-unicode.mjs FILE...   check these files
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const SCOPE_DIRS = [".cursor/", ".claude/", ".vscode/", ".githooks/", ".github/"];
const SCOPE_EXT = [".md", ".mdc"];

// Refused code points as [first, last] ranges. Emoji presentation selectors
// (U+FE0E, U+FE0F) are allowed.
const HIDDEN_RANGES = [
  [0x00ad, 0x00ad], // soft hyphen
  [0x034f, 0x034f], // combining grapheme joiner
  [0x061c, 0x061c], // Arabic letter mark
  [0x115f, 0x1160], // Hangul fillers
  [0x17b4, 0x17b5], // Khmer inherent vowels
  [0x180b, 0x180f], // Mongolian selectors
  [0x200b, 0x200f], // zero-width space, joiners, direction marks
  [0x202a, 0x202e], // bidi embeddings and overrides
  [0x2060, 0x206f], // word joiner, invisible operators, bidi isolates
  [0x3164, 0x3164], // Hangul filler
  [0xfe00, 0xfe0d], // variation selectors (not the emoji ones)
  [0xfeff, 0xfeff], // BOM, zero-width no-break space
  [0xffa0, 0xffa0], // halfwidth Hangul filler
  [0xfff9, 0xfffb], // interlinear annotation
  [0xe0000, 0xe007f], // tag characters
  [0xe0100, 0xe01ef], // variation selectors supplement
];

function hiddenAt(line) {
  let col = 0;
  for (const ch of line) {
    col += 1;
    const cp = ch.codePointAt(0);
    if (HIDDEN_RANGES.some(([lo, hi]) => cp >= lo && cp <= hi)) return { cp, col };
  }
  return null;
}

function inScope(path) {
  return SCOPE_DIRS.some((d) => path.startsWith(d)) || SCOPE_EXT.some((e) => path.endsWith(e));
}

const args = process.argv.slice(2);
const files =
  args.length > 0
    ? args
    : execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
        .split("\0")
        .filter((p) => p && inScope(p));

let bad = 0;
for (const file of files) {
  const text = readFileSync(file, "utf8");
  text.split("\n").forEach((line, i) => {
    const hit = hiddenAt(line);
    if (hit) {
      const cp = hit.cp.toString(16).toUpperCase().padStart(4, "0");
      console.error(`${file}:${i + 1}:${hit.col}: hidden or bidirectional character U+${cp}`);
      bad += 1;
    }
  });
}
if (bad > 0) {
  console.error(`${bad} line(s) with hidden Unicode in ${files.length} file(s) checked`);
  process.exit(1);
}
console.log(`no hidden Unicode in ${files.length} file(s)`);
