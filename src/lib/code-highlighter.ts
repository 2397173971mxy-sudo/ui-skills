import bash from "@shikijs/langs/bash";
import githubLightHighContrast from "@shikijs/themes/github-light-high-contrast";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import type { LanguageRegistration } from "shiki";

export const CODE_HIGHLIGHT_THEME = "github-light-high-contrast";
export const CODE_HIGHLIGHT_FOREGROUND = "#0e1116";

export type CodeHighlightLanguage = "bash" | "plaintext";

type BundledLang =
  | "bash"
  | "css"
  | "html"
  | "javascript"
  | "json"
  | "markdown"
  | "typescript";

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

const LANG_LOADERS: Record<
  BundledLang,
  () => Promise<LanguageRegistration>
> = {
  bash: async () => bash,
  css: () => import("@shikijs/langs/css").then((module) => module.default),
  html: () => import("@shikijs/langs/html").then((module) => module.default),
  javascript: () =>
    import("@shikijs/langs/javascript").then((module) => module.default),
  json: () => import("@shikijs/langs/json").then((module) => module.default),
  markdown: () =>
    import("@shikijs/langs/markdown").then((module) => module.default),
  typescript: () =>
    import("@shikijs/langs/typescript").then((module) => module.default),
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

  const loader = LANG_LOADERS[normalized as BundledLang];
  if (!loader) {
    return "plaintext";
  }

  const highlighter = await getHighlighter();
  await highlighter.loadLanguage(await loader());
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

function withPlaintextForeground(html: string): string {
  return html.replace(
    /<span>([^<]*)<\/span>/g,
    `<span style="color:${CODE_HIGHLIGHT_FOREGROUND}">$1</span>`,
  );
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

  const innerHtml = extractCodeInnerHtml(html);
  return resolvedLanguage === "plaintext"
    ? withPlaintextForeground(innerHtml)
    : innerHtml;
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
