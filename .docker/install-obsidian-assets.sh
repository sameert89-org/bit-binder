#!/bin/bash
set -euo pipefail

config_path="${1:-/obsidian-assets.json}"
asset_root="${2:-/obsidian-assets}"

mkdir -p "${asset_root}/plugins" "${asset_root}/themes"

while IFS=$'\t' read -r plugin_id repo version; do
  plugin_dir="${asset_root}/plugins/${plugin_id}"
  release_url="https://github.com/${repo}/releases/download/${version}"
  mkdir -p "${plugin_dir}"

  for required_asset in main.js manifest.json; do
    curl --fail --location --retry 10 --retry-all-errors --retry-delay 2 \
      --connect-timeout 15 --max-time 180 \
      "${release_url}/${required_asset}" \
      --output "${plugin_dir}/${required_asset}"
  done

  if ! curl --fail --location --connect-timeout 15 --max-time 60 \
    "${release_url}/styles.css" \
    --output "${plugin_dir}/styles.css"; then
    rm -f "${plugin_dir}/styles.css"
  fi
done < <(jq --raw-output \
  '.pluginCatalog | to_entries[] | [.key, .value.repo, .value.version] | @tsv' \
  "${config_path}")

while IFS=$'\t' read -r theme_name repo ref; do
  theme_dir="${asset_root}/themes/${theme_name}"
  mkdir -p "${theme_dir}"
  curl --fail --location --retry 10 --retry-all-errors --retry-delay 2 \
    --connect-timeout 15 --max-time 180 \
    "https://raw.githubusercontent.com/${repo}/${ref}/theme.css" \
    --output "${theme_dir}/theme.css"
  jq --null-input \
    --arg name "${theme_name}" \
    --arg version "${ref:0:12}" \
    --arg author "${repo}" \
    '{name: $name, version: $version, minAppVersion: "1.0.0", author: $author}' \
    > "${theme_dir}/manifest.json"
done < <(jq --raw-output \
  '.themeCatalog | to_entries[] | [.key, .value.repo, .value.ref] | @tsv' \
  "${config_path}")
