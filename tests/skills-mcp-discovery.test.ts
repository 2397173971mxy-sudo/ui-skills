import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  buildAgentSkillsIndex,
  buildMcpServerCard,
  listLocalSkillSlugs,
  readLocalSkillMarkdown,
} from "../src/lib/agent-skills-discovery.ts";
import { GET as getSkillsIndex } from "../src/pages/.well-known/agent-skills/index.json.ts";
import { GET as getServerCard } from "../src/pages/.well-known/mcp/server-card.json.ts";

const origin = "https://www.ui-skills.com";

describe("skills and MCP discovery", () => {
  test("indexes local skills with schema, urls, and digests", async () => {
    const index = await buildAgentSkillsIndex(origin);
    assert.equal(
      index.$schema,
      "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    );
    assert.ok(index.skills.length >= 3);
    for (const skill of index.skills) {
      assert.match(skill.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.equal(skill.type, "skill-md");
      assert.ok(skill.description.length > 0);
      assert.equal(
        skill.url,
        `${origin}/.well-known/agent-skills/${skill.name}/SKILL.md`,
      );
      assert.match(skill.digest, /^sha256:[a-f0-9]{64}$/);
      assert.ok(readLocalSkillMarkdown(skill.name));
    }
  });

  test("MCP server card includes serverInfo, transport, and capabilities", () => {
    const card = buildMcpServerCard(origin);
    assert.equal(card.serverInfo.name, "UI Skills");
    assert.ok(card.serverInfo.version);
    assert.equal(card.transport.endpoint, `${origin}/mcp`);
    assert.equal(card.capabilities.tools, true);
  });

  test("well-known routes return discovery documents", async () => {
    const siteCtx = { site: new URL(origin) } as never;
    const skills = await getSkillsIndex(siteCtx);
    const card = await getServerCard(siteCtx);

    assert.equal(skills.status, 200);
    assert.ok((await skills.json()).skills.length > 0);

    assert.equal(card.status, 200);
    assert.equal((await card.json()).serverInfo.name, "UI Skills");
  });

  test("lists the expected local skill folders", () => {
    assert.ok(listLocalSkillSlugs().includes("baseline-ui"));
    assert.ok(listLocalSkillSlugs().includes("ui-skills-root"));
  });
});
