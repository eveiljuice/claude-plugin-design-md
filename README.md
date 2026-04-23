# design-md

A Claude Code plugin that scaffolds a `DESIGN.md` in the current project. The
file follows the [google-labs-code/design.md](https://github.com/google-labs-code/design.md)
specification — YAML design tokens plus markdown rationale — so any AI coding
agent can read a single document and produce UI that matches the intended
visual identity.

## Install

Install this plugin locally from inside Claude Code:

```text
/plugin install C:/Users/ok/plugins/design-md
```

Or register the containing directory as a marketplace so you can install it by
name:

```text
/plugin marketplace add C:/Users/ok/plugins
/plugin install design-md@plugins
```

To develop against it without installing, point the CLI at the folder:

```bash
claude --plugin C:/Users/ok/plugins/design-md
```

## Commands

### `/design-md:create [source]`

Creates a `DESIGN.md` in the current working directory.

| Argument | Behaviour |
|----------|-----------|
| _(none)_ or `blank` | Writes the bundled starter template (`templates/DESIGN.md`) — every required section with placeholder prose and a neutral default token palette. |
| `atmospheric-glass` | Downloads the official *Atmospheric Glass* example. |
| `paws-and-paths` | Downloads the official *Paws & Paths* example. |
| `totality-festival` | Downloads the official *Totality Festival* example. |

If `DESIGN.md` already exists the command will ask before overwriting.

Examples:

```text
/design-md:create
/design-md:create atmospheric-glass
```

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
