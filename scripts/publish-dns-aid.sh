#!/usr/bin/env bash
#
# Publish DNS-AID (DNS for AI Discovery) records for ui-skills.com.
# Reference: draft-mozleywilliams-dnsop-dnsaid + RFC 9460 (SVCB/HTTPS).
#
# Records managed (idempotent):
#   _index._agents.ui-skills.com      HTTPS 1 www.ui-skills.com. alpn="h3,h2" port=443
#   _index._agents.www.ui-skills.com  HTTPS 1 www.ui-skills.com. alpn="h3,h2" port=443
#
# MCP/A2A labels are omitted until those agent protocols are publicly offered
# as first-class DNS discovery targets beyond the HTTP MCP card.
#
# Usage:
#   CLOUDFLARE_API_TOKEN=... ./scripts/publish-dns-aid.sh
#   ENABLE_DNSSEC=1 CLOUDFLARE_API_TOKEN=... ./scripts/publish-dns-aid.sh
#
# Required token scopes: Zone:DNS:Edit on ui-skills.com.
# Optional (for DNSSEC): Zone:DNSSEC:Edit.

set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN to a token with Zone:DNS:Edit on ui-skills.com}"

ZONE="ui-skills.com"
TARGET="www.ui-skills.com"
API="https://api.cloudflare.com/client/v4"
H_AUTH="Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
H_TYPE="Content-Type: application/json"

echo "→ Looking up zone ID for ${ZONE}…"
ZONE_ID=$(curl -sS -H "${H_AUTH}" "${API}/zones?name=${ZONE}" \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['result'][0]['id']) if d.get('result') else sys.exit('zone not found')")
echo "  zone_id=${ZONE_ID}"

upsert_https_record() {
  local name=$1
  local fqdn="${name}.${ZONE}"
  local value='alpn="h3,h2" port=443'

  local existing_id
  existing_id=$(curl -sS -H "${H_AUTH}" \
    "${API}/zones/${ZONE_ID}/dns_records?type=HTTPS&name=${fqdn}" \
    | python3 -c 'import json,sys; d=json.load(sys.stdin); r=d.get("result") or []; print(r[0]["id"] if r else "")')

  local payload
  payload=$(python3 -c 'import json,sys; print(json.dumps({"type":"HTTPS","name":sys.argv[1],"data":{"priority":1,"target":sys.argv[2],"value":sys.argv[3]},"ttl":3600,"comment":"DNS-AID — agent discovery"}))' "${fqdn}" "${TARGET}" "${value}")

  local method url verb
  if [[ -n "${existing_id}" ]]; then
    method=PUT
    url="${API}/zones/${ZONE_ID}/dns_records/${existing_id}"
    verb="Updating"
  else
    method=POST
    url="${API}/zones/${ZONE_ID}/dns_records"
    verb="Creating"
  fi

  echo "→ ${verb} HTTPS ${fqdn} → ${TARGET}…"
  curl -sS -X "${method}" "${url}" \
    -H "${H_AUTH}" -H "${H_TYPE}" \
    --data "${payload}" \
    | python3 -c "
import json,sys
d=json.load(sys.stdin)
if d.get('success'):
  r=d['result']
  print(f\"  ✓ {r['name']} {r['type']} {r['content']}\")
else:
  for e in d.get('errors', []):
    print(f\"  ✗ [{e.get('code')}] {e.get('message')}\")
  sys.exit(1)
"
}

upsert_https_record "_index._agents"
upsert_https_record "_index._agents.www"

if [[ "${ENABLE_DNSSEC:-0}" == "1" ]]; then
  echo "→ Enabling DNSSEC on the zone…"
  curl -sS -X PATCH "${API}/zones/${ZONE_ID}/dnssec" \
    -H "${H_AUTH}" -H "${H_TYPE}" \
    --data '{"status":"active"}' \
    | python3 -c "
import json,sys
d=json.load(sys.stdin)
if not d.get('success'):
  for e in d.get('errors', []):
    print(f\"  ✗ [{e.get('code')}] {e.get('message')}\")
  sys.exit(1)
r=d['result']
print(f\"  ✓ DNSSEC status: {r.get('status')}\")
ds=r.get('ds')
if ds:
  print('')
  print('  DS record (copy to your registrar if ui-skills.com is not at Cloudflare Registrar):')
  print(f\"  {ds}\")
"
fi

echo
echo "Done. Verify with:"
echo "  dig +short HTTPS _index._agents.${ZONE}"
echo "  dig +short HTTPS _index._agents.www.${ZONE}"
echo "  dig +short DS ${ZONE}"
echo
echo "Then re-scan:"
echo "  curl -sX POST https://isitagentready.com/api/scan -H 'Content-Type: application/json' \\"
echo "    -d '{\"url\":\"https://www.${ZONE}\"}' | python3 -c \"import json,sys; print(json.load(sys.stdin)['checks']['discoverability']['dnsAid'])\""
