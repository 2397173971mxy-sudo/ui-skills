import bash from "@shikijs/langs/bash";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

import { uiSkillsShellTheme } from "./code-block-theme";

export const UI_SKILLS_CLI_COPY = `npx ui-skills start
npx ui-skills categories
npx ui-skills list --category <category>
npx ui-skills get <skill>`;

export type CodeHighlightLanguage = "bash" | "plaintext";

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= createHighlighterCore({
    themes: [uiSkillsShellTheme],
    langs: [bash],
    engine: createJavaScriptRegexEngine(),
  });

  return highlighterPromise;
}

/** Quote placeholder tokens so Shiki can highlight shell commands safely. */
export function prepareShellForHighlight(code: string): string {
  return code.replace(/ <([^>]+)>/g, " '<$1>'");
}

function extractCodeInnerHtml(html: string): string {
  const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
  return match?.[1]?.trimEnd() ?? "";
}

export async function highlightCode(
  code: string,
  language: CodeHighlightLanguage,
): Promise<string> {
  const highlighter = await getHighlighter();
  const source = language === "bash" ? prepareShellForHighlight(code) : code;

  const html = highlighter.codeToHtml(source, {
    lang: language,
    theme: "ui-skills-shell",
    bg: "transparent",
    colorReplacements: {
      "ui-skills-shell": {
        "#ffffff": "transparent",
      },
    },
  });

  return extractCodeInnerHtml(html);
}

export async function highlightShellCommand(code: string): Promise<string> {
  return highlightCode(code, "bash");
}

export async function highlightPlainCode(code: string): Promise<string> {
  return highlightCode(code, "plaintext");
}

export function buildSkillsInstallCommand(
  repoUrl: string,
  skillName: string,
): string {
  return `npx skills add ${repoUrl} --skill ${skillName}`;
}
