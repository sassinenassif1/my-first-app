#!/usr/bin/env bash
# Installs the interface-design skill into ~/.claude/ and ~/.claude-plugin/.
#
# Source:   https://github.com/Dammyjay93/interface-design (MIT)
# Author:   Damola Akinleye
#
# Usage:
#   bash install.sh               # installs to $HOME/.claude and $HOME/.claude-plugin
#   CLAUDE_DIR=/tmp/foo bash install.sh   # override destination

set -euo pipefail

CLAUDE_DIR="${CLAUDE_DIR:-$HOME/.claude}"
PLUGIN_DIR="${PLUGIN_DIR:-$HOME/.claude-plugin}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_CLAUDE="$SCRIPT_DIR/claude"
SRC_PLUGIN="$SCRIPT_DIR/claude-plugin"

if [ ! -d "$SRC_CLAUDE" ] || [ ! -d "$SRC_PLUGIN" ]; then
  echo "error: expected 'claude/' and 'claude-plugin/' next to this script." >&2
  echo "       looked in: $SCRIPT_DIR" >&2
  exit 1
fi

echo "Installing interface-design skill"
echo "  skill + commands → $CLAUDE_DIR"
echo "  plugin manifest  → $PLUGIN_DIR"
echo

mkdir -p "$CLAUDE_DIR/commands"
mkdir -p "$CLAUDE_DIR/skills"
mkdir -p "$PLUGIN_DIR"

# Commands
cp -R "$SRC_CLAUDE/commands/." "$CLAUDE_DIR/commands/"
# Skill
cp -R "$SRC_CLAUDE/skills/interface-design" "$CLAUDE_DIR/skills/"
# Plugin manifest
cp -R "$SRC_PLUGIN/." "$PLUGIN_DIR/"

echo "Installed files:"
find "$CLAUDE_DIR/skills/interface-design" "$CLAUDE_DIR/commands" "$PLUGIN_DIR" \
  -maxdepth 4 -type f 2>/dev/null | sed 's|^|  |'

cat <<'DONE'

Done. Restart Claude Code to activate.

Quick check — in a new Claude Code session try:
  /interface-design:status

If the command isn't found, confirm the files landed:
  ls ~/.claude/skills/interface-design/SKILL.md
  ls ~/.claude/commands/
DONE
