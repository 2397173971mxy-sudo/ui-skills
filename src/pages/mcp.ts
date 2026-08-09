import type { APIRoute } from "astro";

import {
  listLocalSkillSlugs,
  readLocalSkillMarkdown,
  buildAgentSkillsIndex,
} from "../lib/agent-skills-discovery";
import { getSiteOrigin } from "../lib/agent-discovery";

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

const corsHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version",
};

function jsonRpcResult(id: JsonRpcRequest["id"], result: unknown) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id: id ?? null, result }), {
    headers: corsHeaders,
  });
}

function jsonRpcError(
  id: JsonRpcRequest["id"],
  code: number,
  message: string,
  status = 200,
) {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      id: id ?? null,
      error: { code, message },
    }),
    { status, headers: corsHeaders },
  );
}

const tools = [
  {
    name: "list_skills",
    description: "List locally published UI Skills with name and description.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "get_skill",
    description: "Fetch a UI skill SKILL.md by skill name/slug.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Skill slug such as baseline-ui or improve-ui.",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
];

export const OPTIONS: APIRoute = () =>
  new Response(null, { status: 204, headers: corsHeaders });

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  return new Response(
    JSON.stringify(
      {
        name: "UI Skills MCP",
        version: "0.2.4",
        protocol: "mcp",
        endpoint: `${origin}/mcp`,
        tools: tools.map((tool) => tool.name),
      },
      null,
      2,
    ),
    { headers: corsHeaders },
  );
};

export const POST: APIRoute = async ({ request, site }) => {
  const body = (await request.json().catch(() => null)) as JsonRpcRequest | null;
  if (!body || body.jsonrpc !== "2.0" || typeof body.method !== "string") {
    return jsonRpcError(null, -32600, "Invalid Request", 400);
  }

  const origin = getSiteOrigin(site);

  switch (body.method) {
    case "initialize":
      return jsonRpcResult(body.id, {
        protocolVersion: "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: { name: "UI Skills", version: "0.2.4" },
      });
    case "notifications/initialized":
      return new Response(null, { status: 202, headers: corsHeaders });
    case "tools/list":
      return jsonRpcResult(body.id, { tools });
    case "tools/call": {
      const name =
        typeof body.params?.name === "string" ? body.params.name : "";
      const args =
        body.params?.arguments && typeof body.params.arguments === "object"
          ? (body.params.arguments as Record<string, unknown>)
          : {};

      if (name === "list_skills") {
        const index = await buildAgentSkillsIndex(origin);
        return jsonRpcResult(body.id, {
          content: [
            {
              type: "text",
              text: JSON.stringify(index.skills, null, 2),
            },
          ],
        });
      }

      if (name === "get_skill") {
        const skillName =
          typeof args.name === "string" ? args.name : "";
        const markdown = readLocalSkillMarkdown(skillName);
        if (!markdown) {
          return jsonRpcResult(body.id, {
            isError: true,
            content: [
              {
                type: "text",
                text: `Unknown skill "${skillName}". Available: ${listLocalSkillSlugs().join(", ")}`,
              },
            ],
          });
        }
        return jsonRpcResult(body.id, {
          content: [{ type: "text", text: markdown }],
        });
      }

      return jsonRpcError(body.id, -32601, `Unknown tool: ${name}`);
    }
    default:
      return jsonRpcError(body.id, -32601, `Method not found: ${body.method}`);
  }
};
