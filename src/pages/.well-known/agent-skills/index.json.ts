import type { APIRoute } from "astro";

import {
  buildAgentSkillsIndex,
  discoveryJsonHeaders,
} from "../../../lib/agent-skills-discovery";
import { getSiteOrigin } from "../../../lib/agent-discovery";

export const GET: APIRoute = async ({ site }) => {
  const origin = getSiteOrigin(site);
  return new Response(
    JSON.stringify(await buildAgentSkillsIndex(origin), null, 2),
    {
      headers: discoveryJsonHeaders,
    },
  );
};

export const HEAD: APIRoute = () =>
  new Response(null, { status: 200, headers: discoveryJsonHeaders });
