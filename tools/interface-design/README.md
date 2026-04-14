# interface-design skill (vendored copy)

A local copy of Damola Akinleye's [Interface Design](https://github.com/Dammyjay93/interface-design)
skill, checked into this repo so you can install it without needing the
`/plugin marketplace` flow. Source is MIT licensed — see `LICENSE`.

## Install on your Mac

From the repo root:

```bash
bash tools/interface-design/install.sh
```

This copies:

- `tools/interface-design/claude/skills/interface-design/` → `~/.claude/skills/interface-design/`
- `tools/interface-design/claude/commands/*.md`            → `~/.claude/commands/`
- `tools/interface-design/claude-plugin/*.json`            → `~/.claude-plugin/`

Restart Claude Code after installing.

## Verify

In a new Claude Code session, run:

```
/interface-design:status
```

Or check the files on disk:

```bash
ls ~/.claude/skills/interface-design/
ls ~/.claude/commands/ | grep -i interface
```

## Custom install location

```bash
CLAUDE_DIR=/some/other/path PLUGIN_DIR=/other/plugin bash tools/interface-design/install.sh
```

## Updating

This folder is a snapshot. To refresh, re-pull from upstream:

```bash
git clone --depth 1 https://github.com/Dammyjay93/interface-design.git /tmp/ids
rm -rf tools/interface-design/claude tools/interface-design/claude-plugin
cp -R /tmp/ids/.claude        tools/interface-design/claude
cp -R /tmp/ids/.claude-plugin tools/interface-design/claude-plugin
```
