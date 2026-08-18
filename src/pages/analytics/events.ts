import type { APIRoute } from "astro";

const COLLECTOR_URL = "https://collector.onedollarstats.com/events";

const responseHeaders = {
  "Cache-Control": "no-store",
};

export const GET: APIRoute = async ({ request }) => {
  const incoming = new URL(request.url);
  const target = new URL(COLLECTOR_URL);
  target.search = incoming.search;

  const response = await fetch(target.toString(), {
    method: "GET",
    headers: {
      "User-Agent":
        request.headers.get("user-agent") ?? "ui-skills-analytics-proxy",
    },
  });

  return new Response(null, {
    status: response.status,
    headers: responseHeaders,
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.text();
  const response = await fetch(COLLECTOR_URL, {
    method: "POST",
    body,
    headers: {
      "Content-Type":
        request.headers.get("content-type") ?? "application/json",
    },
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: {
      ...responseHeaders,
      "Content-Type": response.headers.get("content-type") ?? "text/plain",
    },
  });
};
