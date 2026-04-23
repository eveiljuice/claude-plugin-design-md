---
name: create-design-md
description: Use when the user asks to create a DESIGN.md, scaffold a design system spec for AI coding agents, add YAML design tokens, or set up the google-labs-code/design.md format in a project. Runs the claude-plugin-design-md npx CLI so the file is written verbatim from the official templates, not rewritten from memory.
---

# Scaffold a DESIGN.md via `claude-plugin-design-md`

A `DESIGN.md` is a design-system specification AI coding agents can read to produce UI that matches an intended visual identity. It follows the [google-labs-code/design.md](https://github.com/google-labs-code/design.md) spec: YAML front matter with design tokens plus markdown prose that explains the rationale.

## When to activate

Trigger this skill when the user asks for any of:
- a `DESIGN.md` file
- a design system spec that AI agents can read
- design tokens in YAML form
- the `google-labs-code/design.md` format
- a visual-identity brief that an AI coding agent can consume

## Do not write the file from scratch

Templates are versioned upstream by Google Labs. Rewriting them from memory drifts from the spec. Always delegate to the packaged CLI.

## How to run

```bash
npx -y claude-plugin-design-md [source] [--out path] [--force]
```

Requires Node 18+. No install needed — `npx` caches the package.

### Sources

| Argument | Behaviour |
|----------|-----------|
| _(none)_ or `blank` | Bundled starter. Every required section, neutral token palette. |
| `atmospheric-glass` | Official Atmospheric Glass example |
| `paws-and-paths`    | Official Paws & Paths example |
| `totality-festival` | Official Totality Festival example |

### Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--out <path>` | `./DESIGN.md` | Where to write the file |
| `--force`, `-f` | off | Overwrite without prompting |

## Steps

1. **Check for an existing file.** If `DESIGN.md` already exists in the target directory, ask the user before overwriting. Only pass `--force` after explicit confirmation.
2. **Run the CLI** in the project root.
3. **Tell the user the section order.** Canonical: `Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts`. They will want to keep this order when editing.
4. **Suggest the next step.** Validate the file against the upstream spec with `npx @google/design.md lint DESIGN.md`.

## Notes

- Do not modify `package.json` or add the CLI as a dependency. `npx` is enough.
- Do not run the linter yourself unless asked.
- Full spec and more examples: https://github.com/google-labs-code/design.md
- Source of this skill: https://github.com/eveiljuice/claude-plugin-design-md
