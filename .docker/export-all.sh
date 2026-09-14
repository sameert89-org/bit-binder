#!/bin/bash
set -euo pipefail

source_root="${1:-/source}"
site_root="${2:-/site}"
config_path="${3:-/source/.docker/vaults.json}"

jq --exit-status '(.indexFile | type == "string") and (.exclude | type == "array") and (.siteNames | type == "object")' \
  "${config_path}" > /dev/null

index_file=$(jq --raw-output '.indexFile' "${config_path}")
mapfile -t exclusions < <(jq --raw-output '.exclude[]' "${config_path}")
mapfile -d '' indexes < <(find "${source_root}" -type f -iname "${index_file}" -print0 | sort -z)

if [[ "${#indexes[@]}" -eq 0 ]]; then
  echo "No vaults found: expected a ${index_file} file in each publishable vault" >&2
  exit 1
fi

mkdir -p "${site_root}"
cache_root="${EXPORT_CACHE_ROOT:-/export-cache}"
mkdir -p "${cache_root}"

# BuildKit cache mounts survive invalidation of the source COPY layer. Include
# every rendering dependency in the signature so cache hits are never reused
# after changing Obsidian, a plugin/theme/snippet, or the injected export logic.
export_signature=$(
  {
    sha256sum /build-vaults.json /export-vault.mjs /run-export.sh
    sha256sum /opt/obsidian/resources/obsidian.asar
    find /plugin /obsidian-assets -type f -print0 | sort -z | xargs -0 sha256sum
  } | sha256sum | cut -d ' ' -f 1
)

declare -A output_names=()
exported=0

for index_path in "${indexes[@]}"; do
  vault_root=$(dirname "${index_path}")
  relative_path=${vault_root#"${source_root}"/}
  excluded=false

  for pattern in "${exclusions[@]}"; do
    if [[ "${relative_path}" == ${pattern} ]]; then
      excluded=true
      break
    fi
  done

  if [[ "${excluded}" == true ]]; then
    echo "Skipping excluded vault: ${relative_path}"
    continue
  fi

  site_name=$(jq --raw-output --arg path "${relative_path}" \
    '.siteNames[$path] // ($path | split("/") | last)' "${config_path}")

  if [[ -z "${site_name}" || "${site_name}" == "." || "${site_name}" == ".." || "${site_name}" == */* ]]; then
    echo "Invalid site name '${site_name}' for vault '${relative_path}'" >&2
    exit 1
  fi
  if [[ -n "${output_names[${site_name}]:-}" ]]; then
    echo "Duplicate site name '${site_name}' for '${relative_path}' and '${output_names[${site_name}]}'" >&2
    exit 1
  fi
  output_names["${site_name}"]="${relative_path}"

  vault_signature=$(
    find "${vault_root}" -type f -print0 | sort -z | xargs -0 sha256sum |
      sha256sum | cut -d ' ' -f 1
  )
  cache_key=$(
    printf '%s\0%s\0%s\0' "${relative_path}" "${site_name}" \
      "${export_signature}:${vault_signature}" |
      sha256sum | cut -d ' ' -f 1
  )
  cached_site="${cache_root}/${cache_key}"

  if [[ -s "${cached_site}/index.html" ]]; then
    echo "Using cached export: ${relative_path} -> ${site_name}"
    mkdir -p "${site_root}/${site_name}"
    cp -a "${cached_site}/." "${site_root}/${site_name}/"
    exported=$((exported + 1))
    continue
  fi

  echo "Exporting vault: ${relative_path} -> ${site_name}"
  rm -rf /vault /output
  mkdir -p /vault /output "${site_root}/${site_name}"
  cp -a "${vault_root}/." /vault/
  VAULT_PATH="${relative_path}" SITE_NAME="${site_name}" /run-export.sh
  cp -a /output/. "${site_root}/${site_name}/"

  cache_staging="${cache_root}/.${cache_key}.staging"
  rm -rf "${cache_staging}"
  mkdir -p "${cache_staging}"
  cp -a /output/. "${cache_staging}/"
  rm -rf "${cached_site}"
  mv "${cache_staging}" "${cached_site}"
  exported=$((exported + 1))
done

if [[ "${exported}" -eq 0 ]]; then
  echo "Every discovered vault was excluded" >&2
  exit 1
fi

echo "Exported ${exported} vault(s)"
