import bash from "@shikijs/langs/bash";
import css from "@shikijs/langs/css";
import html from "@shikijs/langs/html";
import javascript from "@shikijs/langs/javascript";
import json from "@shikijs/langs/json";
import markdown from "@shikijs/langs/markdown";
import typescript from "@shikijs/langs/typescript";
import githubLightHighContrast from "@shikijs/themes/github-light-high-contrast";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import type { LanguageRegistration } from "shiki";

export const CODE_HIGHLIGHT_THEME = "github-light-high-contrast";
export const CODE_HIGHLIGHT_FOREGROUND = "#0e1116";

export type CodeHighlightLanguage = "bash" | "plaintext";

const LANG_MODULES = {
  bash,
  css,
  html,
  javascript,
  json,
  markdown,
  typescript,
} as const satisfies Record<string, LanguageRegistration>;

type BundledLang = keyof typeof LANG_MODULES;

const LANG_ALIASES: Record<string, BundledLang | "plaintext"> = {
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  js: "javascript",
  ts: "typescript",
  md: "markdown",
  plaintext: "plaintext",
  text: "plaintext",
  txt: "plaintext",
  plain: "plaintext",
};

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= createHighlighterCore({
    themes: [githubLightHighContrast],
    langs: [bash],
    engine: createJavaScriptRegexEngine(),
  });

  return highlighterPromise;
}

async function ensureLanguage(lang: string): Promise<string> {
  const normalized = LANG_ALIASES[lang] ?? lang;
  if (normalized === "plaintext") {
    return "plaintext";
  }

  const bundle = LANG_MODULES[normalized as BundledLang];
  if (!bundle) {
    return "plaintext";
  }

  const highlighter = await getHighlighter();
  await highlighter.loadLanguage(bundle);
  return normalized;
}

function normalizeLanguage(lang?: string): string {
  const raw = lang?.trim().toLowerCase().split(/\s+/)[0] ?? "";
  if (!raw) {
    return "plaintext";
  }

  return LANG_ALIASES[raw] ?? raw;
}

/** Quote placeholder tokens so Shiki can highlight shell commands safely. */
export function prepareShellForHighlight(code: string): string {
  return code.replace(/ <([^>]+)>/g, " '<$1>'");
}

function extractCodeInnerHtml(html: string): string {
  const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
  return match?.[1]?.trimEnd() ?? "";
}

async function highlightWithLanguage(
  code: string,
  language: string,
): Promise<string> {
  const highlighter = await getHighlighter();
  const resolvedLanguage = await ensureLanguage(language);
  const source =
    resolvedLanguage === "bash" ? prepareShellForHighlight(code) : code;

  const html = highlighter.codeToHtml(source, {
    lang: resolvedLanguage,
    theme: CODE_HIGHLIGHT_THEME,
    bg: "transparent",
    colorReplacements: {
      [CODE_HIGHLIGHT_THEME]: {
        "#ffffff": "transparent",
      },
    },
  });

  return extractCodeInnerHtml(html);
}

export async function highlightCode(
  code: string,
  language: CodeHighlightLanguage,
): Promise<string> {
  return highlightWithLanguage(code, language);
}

export async function highlightFencedCode(
  code: string,
  lang?: string,
): Promise<string> {
  return highlightWithLanguage(code, normalizeLanguage(lang));
}

export async function highlightShellCommand(code: string): Promise<string> {
  return highlightCode(code, "bash");
}

export async function highlightPlainCode(code: string): Promise<string> {
  return highlightCode(code, "plaintext");
}
