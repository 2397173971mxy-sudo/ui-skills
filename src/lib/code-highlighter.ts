import bash from "@shikijs/langs/bash";
import vitesseLight from "@shikijs/themes/vitesse-light";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export type CodeHighlightLanguage = "bash" | "plaintext";

const HIGHLIGHT_THEME = "vitesse-light";

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= createHighlighterCore({
    themes: [vitesseLight],
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
    theme: HIGHLIGHT_THEME,
    bg: "transparent",
    colorReplacements: {
      [HIGHLIGHT_THEME]: {
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
