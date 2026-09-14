# Bit Binder

The Markdown vaults are the source of truth. The exported websites are generated
at image-build time and are intentionally not committed.

## Build and run

```sh
docker build --tag bit-binder .
docker run --rm --publish 8080:8080 bit-binder
```

The build pins Obsidian and Webpage HTML Export versions in the root
`Dockerfile`, discovers and exports published vaults, compiles the Go server,
and copies only the server plus generated static output into the runtime image.
The first build can take several minutes because Obsidian renders every note
and Excalidraw drawing; later builds reuse Docker's dependency layers.

## Selecting vaults

The build recursively discovers directories containing `index.md`. Configure
publication in `.docker/vaults.json`:

- Add a relative path or glob to `exclude` to keep matching vaults private.
- Add `"relative/path": "Public name"` to `siteNames` to override the output
  directory and display name.
- Change `indexFile` only if every publishable vault uses another entry-file
  convention.
- Add per-vault `theme`, `snippets`, `plugins`, and `pluginData` under
  `vaultSettings`. Paths use the same repository-relative vault name.

`Archived/*` is excluded by default. A new, non-archived vault with an
`index.md` is picked up automatically without changing the Dockerfile.

Plugin and theme binaries are downloaded from the pinned entries in
`.docker/obsidian-assets.json`; they are not copied from a machine-specific
`.obsidian` directory. To add another content-rendering plugin or theme, add it
to that catalog and reference its ID/name from the vault's settings. Editor-only
plugins should not be enabled during export. CSS snippets live in
`.docker/obsidian/snippets` and are referenced without the `.css` suffix.

Excalidraw is handled specially: the build loads the plugin, generates SVG
previews through its API, and rewrites embeds only in the disposable Docker
copy. The Markdown source remains unchanged.

Pushes to `master` do not build in GitHub Actions. The workflow connects to the
tailnet and passes the deployment webhook to Coolify, which builds this
Dockerfile on the server. Configure the `TAILSCALE_AUTHKEY` and
`COOLIFY_API_TOKEN` repository secrets.

## Updating the exporter

Change `EXPORTER_VERSION` (and, when required by upstream, `OBSIDIAN_VERSION`)
in `Dockerfile`, then build locally. Versions are pinned because exporter
releases can make large behavioral changes.

## Repository hygiene

All machine-local `.obsidian` directories, generated vault sites, local secrets,
and compiled server binaries are ignored. Required publish-time themes,
snippets, and renderer plugins are declared centrally as described above. Keep
deployment credentials in GitHub Actions or the deployment platform; do not put
them in vault plugin configuration.
