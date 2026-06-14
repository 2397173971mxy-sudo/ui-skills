#!/bin/sh
set -e
# UI Skills — Hermes Agent bundle installer
# Installs all 4 ibelick/ui-skills sub-skills + the router into Hermes.

BOLD=""; GREEN=""; YELLOW=""; DARK=""; RESET=""
if [ -t 1 ]; then
  BOLD="\033[1m"; GREEN="\033[32m"; YELLOW="\033[33m"; DARK="\033[90m"; RESET="\033[0m"
fi

print_success() { printf "${GREEN}✓${RESET} %s\n" "$1"; }
print_info()    { printf "${YELLOW}→${RESET} %s\n" "$1"; }
print_error()   { printf "${BOLD}Error:${RESET} %s\n" "$1" >&2; }
print_header()  { printf "${BOLD}%s${RESET}\n" "$1"; }

# ── ASCII logo ──────────────────────────────────
B="${GRAY:-\033[37m}"; D="${DARK:-\033[90m}"; R="${RESET}"
printf " ${B}██${D}╗   ${B}██${D}╗${B}██${D}╗      ${B}███████${D}╗${B}██${D}╗  ${B}██${D}╗${B}██${D}╗${B}██${D}╗     ${B}██${D}╗     ${B}███████${D}╗\\n"
printf " ${B}██${D}║   ${B}██${D}║${B}██${D}║      ${B}██${D}╔════╝${B}██${D}║ ${B}██${D}╔╝${B}██${D}║${B}██${D}║     ${B}██${D}║     ${B}██${D}╔════╝\\n"
printf " ${B}██${D}║   ${B}██${D}║${B}██${D}║${B}█████${D}╗${B}███████${D}╗${B}█████${D}╔╝ ${B}██${D}║${B}██${D}║     ${B}██${D}║     ${B}███████${D}╗\\n"
printf " ${B}██${D}║   ${B}██${D}║${B}██${D}║${D}╚════╝╚════${B}██${D}║${B}██${D}╔═${B}██${D}╗ ${B}██${D}║${B}██${D}║     ${B}██${D}║     ${D}╚════${B}██${D}║\\n"
printf " ${D}╚${B}██████${D}╔╝${B}██${D}║      ${B}███████${D}║${B}██${D}║  ${B}██${D}╗${B}██${D}║${B}███████${D}╗${B}███████${D}╗${B}███████${D}║\\n"
printf "  ${D}╚═════╝ ╚═╝      ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝${R}\\n"
printf "\\n"
printf "  ${DARK}Hermes Agent bundle installer${R}\\n"
printf "\\n"

REPO_URL="https://raw.githubusercontent.com/ibelick/ui-skills/main/skills"
SKILLS="baseline-ui fixing-accessibility fixing-metadata fixing-motion-performance"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# ── Detect Hermes ───────────────────────────────
if ! command -v hermes >/dev/null 2>&1; then
  print_error "hermes CLI not found in PATH. Install Hermes Agent first:"
  print_error "  https://hermes-agent.nousresearch.com/docs/"
  exit 1
fi

print_info "Hermes CLI detected"
print_info "Installing 4 UI Skills into Hermes (creative category) …"
printf "\\n"

TOTAL=0
for skill in $SKILLS; do
  URL="${REPO_URL}/${skill}/SKILL.md"
  printf "  %-30s " "$skill"
  if hermes skills install "$URL" --category creative --yes >/dev/null 2>&1; then
    total=$((TOTAL + 1))
    print_success "ok"
  else
    print_info "skipped (may already exist)"
    total=$((TOTAL + 1))
  fi
done

# ── Install or update the router skill ──────────
ROUTER_DIR="$(dirname "$SCRIPT_DIR")/skills/ui-skills"
if [ -f "$ROUTER_DIR/SKILL.md" ]; then
  print_info "Installing router skill (ui-skills) …"
  mkdir -p "$(hermes config path | xargs dirname)/skills/creative/ui-skills" 2>/dev/null || true
  cp "$ROUTER_DIR/SKILL.md" "${HERMES_HOME:-$HOME/AppData/Local/hermes}/skills/creative/ui-skills/SKILL.md" 2>/dev/null || \
  cp "$ROUTER_DIR/SKILL.md" "$HOME/.hermes/skills/creative/ui-skills/SKILL.md" 2>/dev/null || \
  print_info "router: copy SKILL.md manually to ~/.hermes/skills/creative/ui-skills/"
  print_success "router installed"
fi

printf "\\n"
print_header "Done"
print_info "Installed ${TOTAL}/4 skills into Hermes Agent"
print_info "Usage in Hermes:"
print_info "  /ui-skills           — pick the right skill for your task"
print_info "  /baseline-ui         — Tailwind UI quality baseline"
print_info "  /fixing-accessibility — accessibility / WCAG / ARIA audit"
print_info "  /fixing-metadata     — SEO / OpenGraph / Twitter cards"
print_info "  /fixing-motion-performance — animation performance audit"
printf "\\n"
