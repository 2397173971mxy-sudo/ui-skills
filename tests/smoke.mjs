import { spawn } from "node:child_process";
import net from "node:net";

const requestedPort = Number(process.env.SMOKE_PORT ?? 0);
const port =
  requestedPort ||
  (await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      const selectedPort =
        typeof address === "object" && address ? address.port : 0;
      probe.close((error) => (error ? reject(error) : resolve(selectedPort)));
    });
  }));
const server = spawn(
  "npx",
  ["wrangler", "dev", "--local", "--ip", "127.0.0.1", "--port", `${port}`],
  {
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  output += chunk.toString();
});

const fetchLocal = (path, init = {}, timeoutMs = 5000) =>
  fetch(`http://127.0.0.1:${port}${path}`, {
    ...init,
    signal: AbortSignal.timeout(timeoutMs),
  });

const waitForServer = async () => {
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    try {
      const response = await fetchLocal("/");
      if (response.ok) {
        // Drain the body so the connection can be reused cleanly.
        await response.arrayBuffer();
        return;
      }
    } catch {
      // The preview server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not start:\n${output}`);
};

let exitCode = 0;

try {
  await waitForServer();

  const homepage = await fetchLocal("/");
  if (homepage.status !== 200) {
    throw new Error(`Homepage returned ${homepage.status}`);
  }
  if (homepage.headers.get("content-security-policy") === null) {
    throw new Error("Homepage is missing Content-Security-Policy");
  }
  const homepageLink = homepage.headers.get("link");
  if (homepageLink === null || !/rel="api-catalog"/.test(homepageLink)) {
    throw new Error("Homepage is missing discovery Link headers");
  }
  const homepageBody = await homepage.text();
  if (
    !/^<!doctype html>/i.test(homepageBody) &&
    !homepageBody.includes("<html")
  ) {
    throw new Error(
      `Homepage did not return HTML: ${homepageBody.slice(0, 200)}`,
    );
  }
  if (!homepageBody.includes("npx ui-skills start")) {
    throw new Error("Homepage is missing highlighted agent command block");
  }

  const mcpDocs = await fetchLocal("/mcp/docs");
  if (mcpDocs.status !== 200) {
    throw new Error(`MCP docs returned ${mcpDocs.status}`);
  }
  const mcpDocsBody = await mcpDocs.text();
  if (!mcpDocsBody.includes("https://www.ui-skills.com/mcp")) {
    throw new Error("MCP docs are missing the endpoint code block");
  }
  if (
    !mcpDocsBody.includes(
      "https://www.ui-skills.com/.well-known/mcp/server-card.json",
    )
  ) {
    throw new Error("MCP docs are missing the server card code block");
  }
  if (!/style="color:#/i.test(mcpDocsBody)) {
    throw new Error("MCP docs code blocks are missing Shiki theme colors");
  }

  const apiCatalog = await fetchLocal("/.well-known/api-catalog");
  if (apiCatalog.status !== 200) {
    throw new Error(`API catalog returned ${apiCatalog.status}`);
  }
  const apiCatalogType = apiCatalog.headers.get("content-type") ?? "";
  if (!apiCatalogType.startsWith("application/linkset+json")) {
    throw new Error(`API catalog returned unexpected type: ${apiCatalogType}`);
  }

  const markdownHomepage = await fetchLocal("/", {
    headers: { Accept: "text/markdown" },
  });
  if (markdownHomepage.status !== 200) {
    throw new Error(`Markdown homepage returned ${markdownHomepage.status}`);
  }
  const markdownType = markdownHomepage.headers.get("content-type") ?? "";
  if (!markdownType.startsWith("text/markdown")) {
    throw new Error(`Markdown homepage content-type was ${markdownType}`);
  }
  if (markdownHomepage.headers.get("x-markdown-tokens") === null) {
    throw new Error("Markdown homepage is missing x-markdown-tokens");
  }
  const markdownBody = await markdownHomepage.text();
  if (!markdownBody.trim()) {
    throw new Error("Markdown homepage body was empty");
  }

  const registry = await fetchLocal("/skills/registry.json");
  if (registry.status !== 200) {
    throw new Error(`Registry returned ${registry.status}`);
  }

  const registryText = await fetchLocal("/skills/registry.txt");
  if (registryText.status !== 200) {
    throw new Error(`Text registry returned ${registryText.status}`);
  }

  const mcp = await fetchLocal("/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
  });
  if (mcp.status !== 200 || !(await mcp.text()).includes('"list_skills"')) {
    throw new Error(`MCP tools/list failed with ${mcp.status}`);
  }

  const invalidMcp = await fetchLocal("/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "not-json",
  });
  if (invalidMcp.status !== 400) {
    throw new Error(`Invalid MCP request returned ${invalidMcp.status}`);
  }

  const oauthMetadata = await fetchLocal(
    "/.well-known/oauth-authorization-server",
  );
  if (
    oauthMetadata.status !== 200 ||
    !(await oauthMetadata.text()).includes('"token_endpoint"')
  ) {
    throw new Error(`OAuth metadata failed with ${oauthMetadata.status}`);
  }

  const playbook = await fetchLocal("/playbook/use-large-touch-targets");
  if (playbook.status !== 200) {
    throw new Error(`Playbook returned ${playbook.status}`);
  }
  const playbookBody = await playbook.text();
  if (!playbookBody.includes("Make controls easy to tap")) {
    throw new Error("Playbook page is missing its title");
  }
  if (!playbookBody.includes("44px target")) {
    throw new Error("Playbook page is missing its interactive demo content");
  }

  const designDocument = await fetchLocal("/design.md");
  if (designDocument.status !== 200) {
    throw new Error(`Design document returned ${designDocument.status}`);
  }
  if (
    designDocument.headers.get("content-type") !==
    "text/markdown; charset=utf-8"
  ) {
    throw new Error("Design document returned the wrong content type");
  }

  const missing = await fetchLocal("/skills/does-not-exist");
  if (missing.status !== 404) {
    throw new Error(`Missing route returned ${missing.status}`);
  }
} catch (error) {
  exitCode = 1;
  console.error(error instanceof Error ? error.message : error);
} finally {
  // Wrangler/workerd can ignore SIGTERM and keep stdio pipes open, which
  // prevents Node from exiting after the checks finish.
  server.kill("SIGKILL");
}

process.exit(exitCode);
