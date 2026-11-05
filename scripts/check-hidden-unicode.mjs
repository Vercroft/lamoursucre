#!/usr/bin/env node
// Fail on hidden or bidirectional Unicode in the files that steer tools or people:
// git hooks, workflows, scripts, build config and every Markdown file.
// Page copy under src/ is not scanned: it is text for readers, reviewed as content.
// Zero-width characters, bidi controls, BOM, tag characters: "Trojan Source" attacks
// hide instructions in them. Escapes only, so this file stays clean.
//
// Usage: node scripts/check-hidden-unicode.mjs           check the tracked files in scope
//        node scripts/check-hidden-unicode.mjs FILE...   check these files
import { execFileSync } from "node:child_process";
import { lstatSync, readFileSync } from "node:fs";

const SCOPE_DIRS = [".githooks/", ".github/"];
const SCOPE_EXT = [".md"];
// Executable or config files outside those folders.
const SCOPE_DIRS_EXTRA = ["scripts/", "deploy/"];
const SCOPE_FILES = [
  "package.json",
  "biome.json",
  "next.config.ts",
  "wrangler.jsonc",
  "tsconfig.json",
];

// Refused code points as [first, last] ranges. Emoji presentation selectors
// (U+FE0E, U+FE0F) are allowed.
const HIDDEN_RANGES = [
  [0x0000, 0x0008], // C0 controls except tab, line feed
  [0x000b, 0x000c], // vertical tab, form feed
  [0x000e, 0x001f], // C0 controls except carriage return (ESC among them)
  [0x007f, 0x009f], // DEL and C1 controls (NEL among them)
  [0x00ad, 0x00ad], // soft hyphen
  [0x034f, 0x034f], // combining grapheme joiner
  [0x061c, 0x061c], // Arabic letter mark
  [0x115f, 0x1160], // Hangul fillers
  [0x17b4, 0x17b5], // Khmer inherent vowels
  [0x180b, 0x180f], // Mongolian selectors
  [0x2000, 0x200a], // typographic spaces
  [0x200b, 0x200f], // zero-width space, joiners, direction marks
  [0x202a, 0x202e], // bidi embeddings and overrides
  [0x2028, 0x2029], // line and paragraph separators
  [0x2060, 0x206f], // word joiner, invisible operators, bidi isolates
  [0x2800, 0x2800], // braille blank
  [0x3000, 0x3000], // ideographic space
  [0x3164, 0x3164], // Hangul filler
  [0xfe00, 0xfe0d], // variation selectors (not the emoji ones)
  [0xfeff, 0xfeff], // BOM, zero-width no-break space
  [0xffa0, 0xffa0], // halfwidth Hangul filler
  [0xfff9, 0xfffc], // interlinear annotation, object replacement
  [0xe000, 0xf8ff], // private use
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
  return (
    SCOPE_DIRS.some((d) => path.startsWith(d)) ||
    SCOPE_DIRS_EXTRA.some((d) => path.startsWith(d) && !path.endsWith("package-lock.json")) ||
    SCOPE_FILES.includes(path) ||
    SCOPE_EXT.some((e) => path.endsWith(e))
  );
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
  // Deleted files and symlinked folders are listed by git but hold no text.
  if (!lstatSync(file, { throwIfNoEntry: false })?.isFile()) continue;
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(readFileSync(file));
  } catch {
    console.error(`${file}: not valid UTF-8`);
    bad += 1;
    continue;
  }
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
