# DESIGN.md

A Claude Code plugin that scaffolds a `DESIGN.md` in the current project. The
file follows the [google-labs-code/design.md](https://github.com/google-labs-code/design.md)
specification — YAML design tokens plus markdown rationale — so any AI coding
agent can read a single document and produce UI that matches the intended
visual identity.

## Use

### As a Claude Code plugin

Install from this GitHub repo by registering it as a marketplace:

```text
/plugin marketplace add eveiljuice/claude-plugin-design-md
/plugin install design-md@eveiljuice
```

Or point Claude Code at a local clone:

```text
/plugin install /absolute/path/to/claude-plugin-design-md
```

Then, inside any project, run:

```text
/design-md:create
/design-md:create atmospheric-glass
```

| Argument | Behaviour |
|----------|-----------|
| _(none)_ or `blank` | Writes the bundled starter template — every required section with placeholder prose and a neutral default token palette. |
| `atmospheric-glass` | Downloads the official *Atmospheric Glass* example. |
| `paws-and-paths` | Downloads the official *Paws & Paths* example. |
| `totality-festival` | Downloads the official *Totality Festival* example. |

If `DESIGN.md` already exists the command asks before overwriting.

### As a standalone CLI (`npx`)

Run without Claude Code — no install, no clone. Requires Node 18+.

```bash
npx -y claude-plugin-design-md
npx -y claude-plugin-design-md atmospheric-glass
npx -y claude-plugin-design-md paws-and-paths --out design/DESIGN.md
```

Or pull straight from GitHub (useful for unreleased changes on `main`):

```bash
npx -y github:eveiljuice/claude-plugin-design-md
```

Options:

| Flag | Default | Description |
|------|---------|-------------|
| `--out <path>` | `./DESIGN.md` | Where to write the file |
| `--force`, `-f` | off | Overwrite without prompting |
| `--help`, `-h` | — | Show usage |

Valid sources: `blank` (default), `atmospheric-glass`, `paws-and-paths`, `totality-festival`.

### With any other AI coding agent

The CLI works from any agent that can run shell commands (Cursor, Codex, Cline,
Continue, Windsurf, Aider, Copilot CLI, Gemini CLI, Zed, OpenCode, …). To teach
the agent **when** to reach for it, drop the skill file at
[`skills/create-design-md.md`](./skills/create-design-md.md) into whatever
instruction layer your tool uses:

<details>
<summary><b>Cursor</b> — save as <code>.cursor/rules/create-design-md.mdc</code></summary>

```yaml
---
description: Scaffold a DESIGN.md via the claude-plugin-design-md CLI
globs: "**/*"
alwaysApply: false
---
```
Then paste the body of `skills/create-design-md.md` underneath.
</details>

<details>
<summary><b>Codex / Amp / Jules / Gemini CLI / Aider / Zed / Copilot</b> — append to <code>AGENTS.md</code></summary>

These tools all read `AGENTS.md` at the project root. Append a section:

```markdown
## Scaffolding DESIGN.md

When asked to create a DESIGN.md, a design system spec, or a YAML design-tokens
document, run `npx -y claude-plugin-design-md [blank|atmospheric-glass|paws-and-paths|totality-festival]`
in the project root. Do not write the file by hand — the templates are versioned
upstream.
```
</details>

<details>
<summary><b>Cline</b> — save as <code>.clinerules/create-design-md.md</code></summary>

Paste the body of `skills/create-design-md.md` directly — Cline reads every file
in the `.clinerules/` directory as part of its system prompt.
</details>

<details>
<summary><b>OpenCode</b> — add to <code>.opencode/opencode.json</code></summary>

```json
{
  "instructions": ["https://raw.githubusercontent.com/eveiljuice/claude-plugin-design-md/main/skills/create-design-md.md"]
}
```
</details>

<details>
<summary><b>Windsurf</b> — save as <code>.windsurf/rules/create-design-md.md</code></summary>

Paste the body of `skills/create-design-md.md` directly.
</details>

## After the file exists

Validate it against the spec using the upstream CLI (no install required):

```bash
npx @google/design.md lint DESIGN.md
```

Other useful commands from the same package:

```bash
npx @google/design.md export --format tailwind DESIGN.md
npx @google/design.md export --format dtcg DESIGN.md
npx @google/design.md spec          # prints the full spec for agent prompts
```

## Releases

Each tag matching `v*` triggers `.github/workflows/publish.yml`, which verifies
that the tag matches `package.json` and publishes to npm with npm provenance
signing.

To cut a new version:

```bash
npm version patch          # or minor / major
git push --follow-tags
```

GitHub Actions picks up the tag, publishes to npm, and the new version is live
under `npx -y claude-plugin-design-md`.

## Layout

```
design-md/
├── .claude-plugin/plugin.json      # Claude Code plugin manifest
├── commands/create.md              # Claude Code slash command
├── skills/create-design-md.md      # Universal skill for any AI agent
├── templates/DESIGN.md             # Bundled starter template
├── bin/cli.js                      # Standalone npx CLI
└── README.md
```

## License

MIT
