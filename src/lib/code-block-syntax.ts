export type CodeSegment = { text: string; className?: string };
export type CodeLine = CodeSegment[];

const COLORS = {
  command: "text-[#953800]",
  keyword: "text-[#0550ae]",
  noun: "text-[#0a3069]",
  muted: "text-parchment-400",
} as const;

export const UI_SKILLS_CLI_COPY = `npx ui-skills start
npx ui-skills categories
npx ui-skills list --category <category>
npx ui-skills get <skill>`;

function highlightNpxLine(line: string, afterNpx: (rest: string) => CodeSegment[]): CodeLine {
  if (!line.startsWith("npx")) {
    return [{ text: line }];
  }

  return [{ text: "npx", className: COLORS.command }, ...afterNpx(line.slice(3))];
}

function splitPlaceholderSuffix(rest: string): CodeSegment[] {
  const match = rest.match(/^(.*?)( <[^>]+>)$/);
  if (!match) {
    return [{ text: rest, className: COLORS.keyword }];
  }

  return [
    { text: match[1], className: COLORS.keyword },
    { text: match[2], className: COLORS.muted },
  ];
}

export function highlightUiSkillsCommandLine(line: string): CodeLine {
  return highlightNpxLine(line, splitPlaceholderSuffix);
}

export function uiSkillsCliLines(): CodeLine[] {
  return UI_SKILLS_CLI_COPY.split("\n").map(highlightUiSkillsCommandLine);
}

export function highlightSkillsInstallCommand(
  repoUrl: string,
  skillName: string,
): CodeLine {
  return [
    { text: "npx", className: COLORS.command },
    { text: " skills", className: COLORS.noun },
    { text: " add", className: COLORS.keyword },
    { text: ` ${repoUrl}`, className: COLORS.muted },
    { text: " --skill", className: COLORS.keyword },
    { text: ` ${skillName}`, className: COLORS.muted },
  ];
}

export function highlightCopyValue(text: string): CodeLine {
  if (/^https?:\/\//.test(text)) {
    return [{ text, className: COLORS.muted }];
  }

  return [{ text }];
}
