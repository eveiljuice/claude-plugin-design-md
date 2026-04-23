---
description: Scaffold a DESIGN.md file in the current directory following the google-labs-code/design.md spec
argument-hint: "[blank|atmospheric-glass|paws-and-paths|totality-festival]"
allowed-tools: Read, Write, Bash(curl:*), WebFetch
---

# Create a DESIGN.md

You are scaffolding a `DESIGN.md` file for the user's project. The file follows the [google-labs-code/design.md](https://github.com/google-labs-code/design.md) specification: YAML front matter with design tokens plus markdown prose that explains the rationale. An AI coding agent that reads the finished file should be able to build a UI that matches the intended visual identity without further briefing.

## Resolving the source

Read `$ARGUMENTS`. Trim whitespace and lower-case it.

| Argument | Source |
|----------|--------|
| empty string or `blank` | local template at `${CLAUDE_PLUGIN_ROOT}/templates/DESIGN.md` |
| `atmospheric-glass` | `https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/atmospheric-glass/DESIGN.md` |
| `paws-and-paths` | `https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/paws-and-paths/DESIGN.md` |
| `totality-festival` | `https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/totality-festival/DESIGN.md` |

Any other value: stop, tell the user which arguments are valid, and do nothing else.

## Steps

1. **Check for an existing file.** Try reading `DESIGN.md` in the current working directory. If it exists, stop and ask the user whether to overwrite. Do not proceed until they confirm.

2. **Load the source content.**
   - Local template: use the Read tool on `${CLAUDE_PLUGIN_ROOT}/templates/DESIGN.md`.
   - Remote example: use WebFetch on the URL from the table. Prompt: `Return the full raw file content verbatim, including the YAML front matter between --- fences and every markdown section. Do not summarize, paraphrase, reformat, or add commentary.`
   - If WebFetch returns a summarised or truncated response, retry once. If it still will not return the raw bytes, fall back to Bash: `curl -fsSL <url>` and capture stdout. Treat stdout as the verbatim content.

3. **Write `DESIGN.md`** in the current working directory via the Write tool. Content must be byte-identical to what you loaded in step 2 — do not edit tokens, renumber sections, or add comments.

4. **Report the result** in three lines:
   - Which source was used and where the file was written (absolute path).
   - Canonical section order: `Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts`.
   - Next command for the user: `npx @google/design.md lint DESIGN.md`.

## Notes for the agent

- Do not run the linter yourself — that is the user's choice.
- Do not modify `package.json` or install the CLI. The user can run it via `npx` on demand.
- The upstream CLI also exposes `npx @google/design.md spec` which prints the full spec as markdown; mention it only if the user asks "what does the format allow?".
