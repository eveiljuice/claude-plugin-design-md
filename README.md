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
/plugin install design-md@claude-plugin-design-md
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
├── .claude-plugin/plugin.json
├── commands/create.md
├── templates/DESIGN.md
└── README.md
```

## License

MIT
