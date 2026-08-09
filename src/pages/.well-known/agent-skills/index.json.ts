import type { APIRoute } from "astro";

import {
  buildAgentSkillsIndex,
  discoveryJsonHeaders,
} from "../../../lib/agent-skills-discovery";
import { getSiteOrigin } from "../../../lib/agent-discovery";

type CacheLike = {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
};

const getCache = () =>
  (globalThis as typeof globalThis & { caches?: { default: CacheLike } })
    .caches?.default;

export const GET: APIRoute = async ({ request, site }) => {
  const origin = getSiteOrigin(site);
  const cache = getCache();
  const cacheKey = new Request(
    new URL("/.well-known/agent-skills/index.json", origin),
    { method: "GET" },
  );

  if (cache) {
    try {
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    } catch {
      // Cache read failures should not block discovery.
    }
  }

  const body = JSON.stringify(await buildAgentSkillsIndex(origin), null, 2);
  const response = new Response(body, {
    headers: {
      ...discoveryJsonHeaders,
      // Digests require upstream skill bodies; keep the built index warm.
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });

  if (cache) {
    try {
      await cache.put(cacheKey, response.clone());
    } catch {
      // Cache write failures should not block discovery.
    }
  }

  // Avoid unused-request lint noise in adapters that pass the full APIContext.
  void request;
  return response;
};

export const HEAD: APIRoute = async (context) => {
  const response = await GET(context);
  return new Response(null, {
    status: response.status,
    headers: response.headers,
  });
};
