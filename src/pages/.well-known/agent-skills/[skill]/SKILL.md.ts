import type { APIRoute } from "astro";

import { readLocalSkillMarkdown } from "../../../../lib/agent-skills-discovery";

export const prerender = false;

export const GET: APIRoute = ({ params }) => {
  const slug = params.skill;
  if (!slug) {
    return new Response("Skill not found", { status: 404 });
  }

  const markdown = readLocalSkillMarkdown(slug);
  if (!markdown) {
    return new Response("Skill not found", { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const HEAD: APIRoute = ({ params }) => {
  const slug = params.skill;
  if (!slug || !readLocalSkillMarkdown(slug)) {
    return new Response(null, { status: 404 });
  }
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
