// Checks public/_headers the way the host reads it: a bad line makes the host reject the whole file.
// Every non-empty line that does not start with "#" is either a path at column 0 (starts with "/"
// or "https://") or an indented "Name: value". "*/" is neither, and failed a deploy once.
import { readFileSync } from "node:fs";

const FILE = process.argv[2] ?? "public/_headers";
const PATH_RULE = /^(\/|https?:\/\/)\S*$/;
const HEADER_RULE = /^[ \t]+[!#$%&'*+.^_`|~0-9A-Za-z-]+:.*\S/;

let bad = 0;
readFileSync(FILE, "utf8")
  .split("\n")
  .forEach((line, i) => {
    const text = line.replace(/\r$/, "");
    if (text.trim() === "" || text.startsWith("#")) return;
    if (PATH_RULE.test(text) || HEADER_RULE.test(text)) return;
    console.error(`${FILE}:${i + 1}: not a path at column 0 or an indented "Name: value": ${text}`);
    bad += 1;
  });
if (bad > 0) process.exit(1);
console.log(`${FILE}: every line is a path, a header or a comment`);
