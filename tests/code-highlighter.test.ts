import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  buildSkillsInstallCommand,
  highlightCode,
  highlightPlainCode,
  highlightShellCommand,
  prepareShellForHighlight,
  UI_SKILLS_CLI_COPY,
} from "../src/lib/code-highlighter.ts";

describe("code highlighter", () => {
  test("quotes shell placeholders before highlighting", () => {
    assert.equal(
      prepareShellForHighlight("npx ui-skills get <skill>"),
      "npx ui-skills get '<skill>'",
    );
  });

  test("highlights shell commands with token spans", async () => {
    const html = await highlightShellCommand("npx ui-skills start");
    assert.match(html, /npx/);
    assert.match(html, /style="color:#0A3069"/i);
    assert.match(html, /ui-skills/);
  });

  test("highlights install commands", async () => {
    const command = buildSkillsInstallCommand(
      "https://github.com/ibelick/ui-skills",
      "ui-skills-root",
    );

    const html = await highlightShellCommand(command);
    assert.match(html, /npx/);
    assert.match(html, /https:\/\/github.com\/ibelick\/ui-skills/);
    assert.match(html, /ui-skills-root/);
  });

  test("renders plain URLs with readable default foreground", async () => {
    const html = await highlightPlainCode("https://www.ui-skills.com/mcp");
    assert.match(html, /https:\/\/www\.ui-skills\.com\/mcp/);
    assert.doesNotMatch(html, /color:#/);
  });

  test("highlights multi-line ui-skills CLI copy", async () => {
    const html = await highlightCode(UI_SKILLS_CLI_COPY, "bash");
    assert.match(html, /class="line"/);
    assert.match(html, /ui-skills.*categories/);
    assert.match(html, /'&#x3C;category>'|'&lt;category&gt;'/);
  });
});
