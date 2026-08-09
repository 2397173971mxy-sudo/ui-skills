#!/usr/bin/env bash
#
# Publish DNS-AID (DNS for AI Discovery) records for ui-skills.com.
# Reference: draft-mozleywilliams-dnsop-dnsaid + RFC 9460 (SVCB/HTTPS).
#
# Records managed (idempotent, DNS-only / not proxied):
#   _index._agents.ui-skills.com      HTTPS 1 www.ui-skills.com. alpn="h3,h2" port=443 mandatory="alpn,port"
#   _index._agents.www.ui-skills.com  HTTPS 1 www.ui-skills.com. alpn="h3,h2" port=443 mandatory="alpn,port"
#   _mcp._agents.ui-skills.com        HTTPS 1 www.ui-skills.com. alpn="h3,h2" port=443 mandatory="alpn,port"
#
# Usage:
#   CLOUDFLARE_API_TOKEN=... ./scripts/publish-dns-aid.sh
#   DRY_RUN=1 CLOUDFLARE_API_TOKEN=... ./scripts/publish-dns-aid.sh
#   ENABLE_DNSSEC=1 CLOUDFLARE_API_TOKEN=... ./scripts/publish-dns-aid.sh
#
# Required token scopes: Zone:DNS:Edit on ui-skills.com.
# Optional (for DNSSEC): Zone:DNSSEC:Edit.
#
# Merging this PR alone does not publish live DNS. Run this script after merge.

set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN to a token with Zone:DNS:Edit on ui-skills.com}"

ZONE="ui-skills.com"
TARGET="www.ui-skills.com"
VALUE='alpn="h3,h2" port=443 mandatory="alpn,port"'
API="https://api.cloudflare.com/client/v4"
H_AUTH="Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
H_TYPE="Content-Type: application/json"
DRY_RUN="${DRY_RUN:-0}"
ENABLE_DNSSEC="${ENABLE_DNSSEC:-0}"

echo "→ Looking up zone ID for ${ZONE}…"
ZONE_RESP=$(curl -sS -H "${H_AUTH}" "${API}/zones?name=${ZONE}")
ZONE_ID=$(python3 -c "
import json,sys
d=json.loads(sys.argv[1])
if not d.get('success', True) and d.get('errors'):
  for e in d['errors']:
    print(f\"[{e.get('code')}] {e.get('message')}\", file=sys.stderr)
  sys.exit(1)
result=d.get('result') or []
if not result:
  sys.exit('zone not found — check token Zone:Read/DNS permissions')
print(result[0]['id'])
" "${ZONE_RESP}")
echo "  zone_id=${ZONE_ID}"

if [[ "${DRY_RUN}" == "1" ]]; then
  echo "  dry-run enabled — no DNS writes will be made"
fi

upsert_https_record() {
  local name=$1
  local fqdn="${name}.${ZONE}"

  local existing_id
  existing_id=$(curl -sS -H "${H_AUTH}" \
    "${API}/zones/${ZONE_ID}/dns_records?type=HTTPS&name=${fqdn}" \
    | python3 -c 'import json,sys; d=json.load(sys.stdin); r=d.get("result") or []; print(r[0]["id"] if r else "")')

  local payload
  payload=$(python3 -c 'import json,sys; print(json.dumps({"type":"HTTPS","name":sys.argv[1],"proxied":False,"data":{"priority":1,"target":sys.argv[2],"value":sys.argv[3]},"ttl":3600,"comment":"DNS-AID — agent discovery"}))' "${fqdn}" "${TARGET}" "${VALUE}")

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
  if [[ "${DRY_RUN}" == "1" ]]; then
    echo "  (dry-run) ${method} ${url}"
    echo "  (dry-run) ${payload}"
    return 0
  fi

  curl -sS -X "${method}" "${url}" \
    -H "${H_AUTH}" -H "${H_TYPE}" \
    --data "${payload}" \
    | python3 -c "
import json,sys
d=json.load(sys.stdin)
if d.get('success'):
  r=d['result']
  print(f\"  ✓ {r['name']} {r['type']} {r.get('content') or r.get('data')}\")
else:
  for e in d.get('errors', []):
    print(f\"  ✗ [{e.get('code')}] {e.get('message')}\")
  sys.exit(1)
"
}

upsert_https_record "_index._agents"
upsert_https_record "_index._agents.www"
upsert_https_record "_mcp._agents"

echo "→ Checking DNSSEC status…"
DNSSEC_RESP=$(curl -sS -H "${H_AUTH}" "${API}/zones/${ZONE_ID}/dnssec")
python3 -c "
import json,sys
d=json.loads(sys.argv[1])
if not d.get('success'):
  for e in d.get('errors', []):
    print(f\"  ✗ [{e.get('code')}] {e.get('message')}\")
  sys.exit(0)
r=d.get('result') or {}
print(f\"  status: {r.get('status')}\")
ds=r.get('ds')
if ds:
  print(f\"  DS: {ds}\")
" "${DNSSEC_RESP}"

if [[ "${ENABLE_DNSSEC}" == "1" ]]; then
  echo "→ Enabling DNSSEC on the zone…"
  if [[ "${DRY_RUN}" == "1" ]]; then
    echo "  (dry-run) PATCH ${API}/zones/${ZONE_ID}/dnssec status=active"
  else
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
  print('  DS record (copy to your registrar if Cloudflare did not auto-publish it):')
  print(f\"  {ds}\")
"
  fi
fi

echo
echo "Done. Verify with:"
echo "  dig +short HTTPS _index._agents.${ZONE}"
echo "  dig +short HTTPS _index._agents.www.${ZONE}"
echo "  dig +short HTTPS _mcp._agents.${ZONE}"
echo "  dig +dnssec HTTPS _index._agents.${ZONE} | rg RRSIG"
echo "  dig +short DS ${ZONE}"
echo
echo "Then re-scan:"
echo "  curl -sX POST https://isitagentready.com/api/scan -H 'Content-Type: application/json' \\"
echo "    -d '{\"url\":\"https://www.${ZONE}\"}' | python3 -c \"import json,sys; print(json.load(sys.stdin)['checks']['discoverability']['dnsAid'])\""
