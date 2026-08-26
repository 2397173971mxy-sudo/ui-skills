# AGENTS.md

## Site Rules

- Use the parchment neutral scale for text and borders. Use white surfaces for elevated or focused components such as cards, code blocks, dialogs, inputs, and navigation controls when it improves separation and contrast.
- Prefer `text-base` for body copy
- Use `text-lg` for section copy and `text-3xl` for major headings.
- Keep headings `font-medium` with `tracking-tight` where appropriate.
- Use `JetBrains Mono` for code, commands, and monospace UI.
- Keep labels and link text in sentence case.
- Prefer light borders, minimal decoration, and generous spacing.

## Skills

- Add skills in `src/data/registry.ts` only.
- Fill `slug`, `user`, `repo`, `rawUrl`, `githubUrl`, `name`, `description`, and `topics`.
- If a new topic is needed, update `TopicSlug`, `topicsBySlug`, `relatedTopicSlugs`, and `primaryDesignTopicSlugs` only when it is a core topic.
- Do not add local `skills/*` files unless the repo actually hosts the skill markdown.

## Weekly new skills audit

1. Run `npm run check:new-skills` (set `GITHUB_TOKEN` or `GH_TOKEN` for GitHub API rate limits).
2. Review the markdown table, or use `--json` for machine-readable output and `--all` to include large monorepo counts.
3. Curate skills that fit ui-skills: design engineering, UI craft, motion, accessibility, color, typography, and related frontend work. Skip general dev tooling, framework migrations, and native-only skills unless they are core to the registry.
4. Add approved skills to `registrySource` in `src/data/registry.ts`.
5. Run `npm run digests` and `npm run check:skills` before opening a PR.
