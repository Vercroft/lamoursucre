#!/usr/bin/env node
// Fail when a commit in a pull request names a person who is not approved.
// For every commit in BASE..HEAD it reads the author email, the committer email and every
// Co-authored-by email. Approved: the lines of ALLOWED_COMMIT_IDENTITIES (an email per line,
// or "Name <email>"; blank lines and lines starting with # are ignored) plus the two addresses
// built in below. Output is only the commit SHA and the field that failed, never a message.
//
// Usage (CI): BASE_SHA=... HEAD_SHA=... PR_AUTHOR=... ALLOWED_COMMIT_IDENTITIES=... \
//             node scripts/check-contributors.mjs
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// Dependabot's own commits, and commits GitHub makes itself (merge button, web edits).
export const BUILT_IN = ["49699333+dependabot[bot]@users.noreply.github.com", "noreply@github.com"];

const FIELD_SEP = "\x1f";
const COMMIT_END = "\x1d";
const TRAILER_SEP = "\x1e";

function emailOf(text) {
  const angle = /<([^>]*)>/.exec(text);
  return (angle ? angle[1] : text).trim().toLowerCase();
}

export function parseAllowed(text) {
  return (text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "" && !line.startsWith("#"))
    .map(emailOf);
}

export function findProblems({ base, head, allowed, cwd }) {
  const ok = new Set([...BUILT_IN, ...allowed]);
  const format = `%H${FIELD_SEP}%ae${FIELD_SEP}%ce${FIELD_SEP}%(trailers:key=Co-authored-by,valueonly,unfold,separator=%x1e)${COMMIT_END}`;
  const log = execFileSync("git", ["log", `--format=${format}`, `${base}..${head}`], {
    cwd,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const problems = [];
  for (const record of log.split(COMMIT_END)) {
    const entry = record.replace(/^\n/, "");
    if (entry === "") continue;
    const [sha, author, committer, coAuthors] = entry.split(FIELD_SEP);
    if (!ok.has(author.trim().toLowerCase())) problems.push({ sha, field: "author" });
    if (!ok.has(committer.trim().toLowerCase())) problems.push({ sha, field: "committer" });
    for (const value of coAuthors.split(TRAILER_SEP)) {
      if (value.trim() === "") continue;
      if (!ok.has(emailOf(value))) problems.push({ sha, field: "co-author" });
    }
  }
  return problems;
}

function main() {
  const { BASE_SHA, HEAD_SHA, PR_AUTHOR, ALLOWED_COMMIT_IDENTITIES } = process.env;
  if (!BASE_SHA || !HEAD_SHA) {
    console.error("BASE_SHA and HEAD_SHA are required");
    process.exit(2);
  }
  const allowed = parseAllowed(ALLOWED_COMMIT_IDENTITIES);
  if (allowed.length === 0 && PR_AUTHOR !== "dependabot[bot]") {
    console.error("organization variable ALLOWED_COMMIT_IDENTITIES is missing");
    process.exit(1);
  }
  const problems = findProblems({ base: BASE_SHA, head: HEAD_SHA, allowed });
  for (const { sha, field } of problems) console.error(`${sha}: ${field} is not approved`);
  if (problems.length > 0) {
    console.error(`${problems.length} identity problem(s)`);
    process.exit(1);
  }
  console.log("every commit author, committer and co-author is approved");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
