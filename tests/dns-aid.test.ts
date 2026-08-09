import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const zone = readFileSync(join(process.cwd(), "dns/dns-aid.zone"), "utf8");

describe("dns-aid zone", () => {
  test("documents ServiceMode HTTPS records with required params", () => {
    assert.match(
      zone,
      /_index\._agents\.ui-skills\.com\.\s+3600\s+IN\s+HTTPS\s+1\s+www\.ui-skills\.com\./,
    );
    assert.match(
      zone,
      /_index\._agents\.www\.ui-skills\.com\.\s+3600\s+IN\s+HTTPS\s+1\s+www\.ui-skills\.com\./,
    );
    assert.match(
      zone,
      /_mcp\._agents\.ui-skills\.com\.\s+3600\s+IN\s+HTTPS\s+1\s+www\.ui-skills\.com\./,
    );
    assert.match(zone, /alpn="h3,h2"/);
    assert.match(zone, /port=443/);
    assert.match(zone, /mandatory="alpn,port"/);
  });
});
