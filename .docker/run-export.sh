#!/bin/bash
set -euo pipefail

plugin_dir="/vault/.obsidian/plugins/webpage-html-export"
config_dir="/root/.config/obsidian"

# Always install the version baked into this image. This prevents a stale local
# plugin checkout from silently overriding the pinned exporter.
rm -rf "${plugin_dir}"
mkdir -p "${plugin_dir}" "${config_dir}" /output
cp /plugin/main.js /plugin/manifest.json /plugin/styles.css "${plugin_dir}/"

cat > "${config_dir}/obsidian.json" <<'JSON'
{"vaults":{"bit-binder":{"path":"/vault","ts":0,"open":true}}}
JSON

status=0
RUST_LOG=info xvfb-run electron-injector \
  --delay=5000 \
  --script=/export-vault.mjs \
  /opt/obsidian/obsidian \
    --arg=--remote-allow-origins=* \
    --arg=--no-sandbox \
    --arg=--no-xshm \
    --arg=--disable-dev-shm-usage \
    --arg=--disable-gpu \
    --arg=--disable-software-rasterizer \
    --arg=--enable-logging=stderr || status=$?

# electron-injector 1.0.2 may return 101 or 137 when the injected script
# deliberately terminates Electron. The output assertion is the reliable result.
echo "Electron exited with status ${status}; validating export output"
test -s /output/index.html
