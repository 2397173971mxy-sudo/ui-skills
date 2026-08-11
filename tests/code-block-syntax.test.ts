import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  highlightCopyValue,
  highlightSkillsInstallCommand,
  highlightUiSkillsCommandLine,
  uiSkillsCliLines,
} from "../src/lib/code-block-syntax.ts";

describe("code block syntax", () => {
  test("highlights ui-skills CLI lines with placeholders", () => {
    const lines = uiSkillsCliLines();
    assert.equal(lines.length, 4);
    assert.equal(lines[0]?.[0]?.text, "npx");
    assert.equal(lines[0]?.[0]?.className, "text-[#953800]");
    assert.equal(lines[2]?.[2]?.text, " <category>");
    assert.equal(lines[2]?.[2]?.className, "text-parchment-400");
  });

  test("highlights skills install commands", () => {
    const line = highlightSkillsInstallCommand(
      "https://github.com/ibelick/ui-skills",
      "ui-skills-root",
    );

    assert.deepEqual(
      line.map((segment) => segment.text).join(""),
      "npx skills add https://github.com/ibelick/ui-skills --skill ui-skills-root",
    );
    assert.equal(line[1]?.className, "text-[#0a3069]");
    assert.equal(line[3]?.className, "text-parchment-400");
  });

  test("mutes URLs in copy values", () => {
    const line = highlightCopyValue("https://www.ui-skills.com/mcp");
    assert.equal(line[0]?.className, "text-parchment-400");
  });

  test("leaves identifiers unstyled", () => {
    const line = highlightCopyValue("list_skills");
    assert.equal(line[0]?.text, "list_skills");
    assert.equal(line[0]?.className, undefined);
  });

  test("handles custom ui-skills command lines", () => {
    const line = highlightUiSkillsCommandLine("npx ui-skills get <skill>");
    assert.equal(line[1]?.text, " ui-skills get");
    assert.equal(line[2]?.text, " <skill>");
  });
});
