#!/bin/bash
set -euo pipefail

plugin_dir="/vault/.obsidian/plugins/webpage-html-export"
config_dir="/root/.config/obsidian"
build_config="/build-vaults.json"
vault_path="${VAULT_PATH:?VAULT_PATH must identify the vault in vaults.json}"
obsidian_dir="/vault/.obsidian"

# Always install the version baked into this image. This prevents a stale local
# plugin checkout from silently overriding the pinned exporter.
rm -rf "${obsidian_dir}"
mkdir -p "${plugin_dir}" "${config_dir}" /output
cp /plugin/main.js /plugin/manifest.json /plugin/styles.css "${plugin_dir}/"

mapfile -t render_plugins < <(jq --raw-output --arg path "${vault_path}" \
  '.vaultSettings[$path].plugins[]? // empty' "${build_config}")
for plugin_id in "${render_plugins[@]}"; do
  if [[ ! -d "/obsidian-assets/plugins/${plugin_id}" ]]; then
    echo "Plugin '${plugin_id}' for '${vault_path}' is missing from pluginCatalog" >&2
    exit 1
  fi
  cp -a "/obsidian-assets/plugins/${plugin_id}" "${obsidian_dir}/plugins/"
done

plugins_json=$(printf '%s\n' "${render_plugins[@]}" "webpage-html-export" | jq -R . | jq -s .)
printf '%s\n' "${plugins_json}" > "${obsidian_dir}/community-plugins.json"

theme=$(jq --raw-output --arg path "${vault_path}" \
  '.vaultSettings[$path].theme // ""' "${build_config}")
mapfile -t snippets < <(jq --raw-output --arg path "${vault_path}" \
  '.vaultSettings[$path].snippets[]? // empty' "${build_config}")

if [[ -n "${theme}" ]]; then
  if [[ ! -d "/obsidian-assets/themes/${theme}" ]]; then
    echo "Theme '${theme}' for '${vault_path}' is missing from themeCatalog" >&2
    exit 1
  fi
  mkdir -p "${obsidian_dir}/themes/${theme}"
  cp -a "/obsidian-assets/themes/${theme}/." "${obsidian_dir}/themes/${theme}/"
fi

for snippet in "${snippets[@]}"; do
  source_snippet="/obsidian-assets/snippets/${snippet}.css"
  if [[ ! -f "${source_snippet}" ]]; then
    echo "Snippet '${snippet}' for '${vault_path}' was not bundled" >&2
    exit 1
  fi
  mkdir -p "${obsidian_dir}/snippets"
  cp "${source_snippet}" "${obsidian_dir}/snippets/${snippet}.css"
done

snippets_json=$(printf '%s\n' "${snippets[@]}" | sed '/^$/d' | jq -R . | jq -s .)
jq --null-input --arg theme "${theme}" --argjson snippets "${snippets_json}" \
  '{cssTheme: $theme, enabledCssSnippets: $snippets}' > "${obsidian_dir}/appearance.json"

jq --arg path "${vault_path}" --compact-output \
  '.vaultSettings[$path].pluginData // {} | to_entries[]' "${build_config}" |
while IFS= read -r plugin_data; do
  plugin_id=$(jq --raw-output '.key' <<< "${plugin_data}")
  mkdir -p "${obsidian_dir}/plugins/${plugin_id}"
  jq '.value' <<< "${plugin_data}" > "${obsidian_dir}/plugins/${plugin_id}/data.json"
done

render_plugins_csv=$(IFS=,; echo "${render_plugins[*]}")

cat > "${config_dir}/obsidian.json" <<'JSON'
{"vaults":{"bit-binder":{"path":"/vault","ts":0,"open":true}}}
JSON

# Obsidian/Electron startup is occasionally flaky on shared CI runners. Retry a
# failed export from a clean output directory, while still failing the image
# build if every attempt fails.
for attempt in 1 2 3; do
  rm -rf /output
  mkdir -p /output
  status=0

  RENDER_PLUGINS="${render_plugins_csv}" RUST_LOG=info xvfb-run --auto-servernum electron-injector \
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
  # deliberately terminates Electron. The output assertion is authoritative.
  if [[ -s /output/index.html ]]; then
    echo "Electron exited with status ${status}; export validated on attempt ${attempt}"
    exit 0
  fi

  echo "Export attempt ${attempt}/3 failed (Electron status ${status})" >&2
done

echo "Export failed after 3 attempts" >&2
exit 1
