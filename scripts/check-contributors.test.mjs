// node --test scripts/check-contributors.test.mjs
// Each test builds a throwaway repository under the system temp folder and runs the script there.
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, test } from "node:test";

const SCRIPT = new URL("./check-contributors.mjs", import.meta.url).pathname;
const PERSON = "person@example.test";
const OTHER = "stranger@example.test";
const DEPENDABOT = "49699333+dependabot[bot]@users.noreply.github.com";
const MESSAGE_WORDS = "secret-message-words";

// No global or system git config, no hooks, nothing inherited from the caller's repository.
const CLEAN_ENV = Object.fromEntries(
  Object.entries(process.env).filter(
    ([key]) => !key.startsWith("GIT_") && !key.startsWith("BASE_") && !key.startsWith("HEAD_"),
  ),
);
const ISOLATION = {
  ...CLEAN_ENV,
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_SYSTEM: "/dev/null",
  GIT_CONFIG_NOSYSTEM: "1",
};

let dir;

function git(args, extra = {}) {
  return execFileSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
    cwd: dir,
    env: { ...ISOLATION, ...extra },
    encoding: "utf8",
  }).trim();
}

function commit({ author = PERSON, committer = author, coAuthors = [] }) {
  const trailers = coAuthors.map((email) => `Co-authored-by: Some One <${email}>`).join("\n");
  const message = trailers ? `${MESSAGE_WORDS}\n\n${trailers}` : MESSAGE_WORDS;
  git(["commit", "--allow-empty", "-m", message], {
    GIT_AUTHOR_NAME: "A",
    GIT_AUTHOR_EMAIL: author,
    GIT_COMMITTER_NAME: "C",
    GIT_COMMITTER_EMAIL: committer,
  });
  return git(["rev-parse", "HEAD"]);
}

function run({ base, head, allowed = PERSON, prAuthor = "someone" }) {
  const result = spawnSync("node", [SCRIPT], {
    cwd: dir,
    env: {
      ...CLEAN_ENV,
      BASE_SHA: base,
      HEAD_SHA: head,
      PR_AUTHOR: prAuthor,
      ALLOWED_COMMIT_IDENTITIES: allowed,
    },
    encoding: "utf8",
  });
  return { code: result.status, out: `${result.stdout}${result.stderr}` };
}

before(() => {
  dir = realpathSync(mkdtempSync(join(tmpdir(), "contributors-test-")));
  git(["init", "-q", "-b", "main"]);
  // Throwaway-repository guard: refuse to run anywhere but the folder just created.
  assert.equal(realpathSync(git(["rev-parse", "--show-toplevel"])), dir);
  assert.ok(dir.startsWith(realpathSync(tmpdir())));
});

after(() => rmSync(dir, { recursive: true, force: true }));

test("an allowed commit passes", () => {
  const base = commit({});
  const head = commit({});
  const { code, out } = run({ base, head });
  assert.equal(code, 0, out);
});

test("an unknown co-author fails and prints only the SHA and the field", () => {
  const base = commit({});
  const head = commit({ coAuthors: [OTHER] });
  const { code, out } = run({ base, head });
  assert.equal(code, 1);
  assert.match(out, new RegExp(`${head}: co-author is not approved`));
  assert.ok(!out.includes(OTHER) && !out.includes(MESSAGE_WORDS), out);
});

test("an unknown author fails", () => {
  const base = commit({});
  const head = commit({ author: OTHER, committer: PERSON });
  const { code, out } = run({ base, head });
  assert.equal(code, 1);
  assert.match(out, new RegExp(`${head}: author is not approved`));
  assert.ok(!out.includes(OTHER), out);
});

test("an unknown committer fails", () => {
  const base = commit({});
  const head = commit({ author: PERSON, committer: OTHER });
  const { code, out } = run({ base, head });
  assert.equal(code, 1);
  assert.match(out, new RegExp(`${head}: committer is not approved`));
});

test("an approved co-author passes, and the list accepts Name <email> lines and comments", () => {
  const base = commit({});
  const head = commit({ coAuthors: [OTHER] });
  const allowed = `# people\n${PERSON}\nSome One <${OTHER}>\n`;
  const { code, out } = run({ base, head, allowed });
  assert.equal(code, 0, out);
});

test("a Dependabot-style commit passes with the variable empty", () => {
  const base = commit({});
  const head = commit({ author: DEPENDABOT, committer: "noreply@github.com" });
  const { code, out } = run({ base, head, allowed: "", prAuthor: "dependabot[bot]" });
  assert.equal(code, 0, out);
});

test("an empty variable fails for any other pull request author", () => {
  const base = commit({});
  const head = commit({});
  const { code, out } = run({ base, head, allowed: "", prAuthor: "someone" });
  assert.equal(code, 1);
  assert.match(out, /organization variable ALLOWED_COMMIT_IDENTITIES is missing/);
});
