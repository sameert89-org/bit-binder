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
and copies only the server plus static output into the runtime image.

## Selecting vaults

The build recursively discovers directories containing `index.md`. Configure
publication in `.docker/vaults.json`:

- Add a relative path or glob to `exclude` to keep matching vaults private.
- Add `"relative/path": "Public name"` to `siteNames` to override the output
  directory and display name.
- Change `indexFile` only if every publishable vault uses another entry-file
  convention.

`Archived/*` is excluded by default. A new, non-archived vault with an
`index.md` is picked up automatically without changing the Dockerfile.

Pushes to `master` run the same build and smoke tests in GitHub Actions. A
successful build triggers the existing Coolify deployment through Tailscale.

## Updating the exporter

Change `EXPORTER_VERSION` (and, when required by upstream, `OBSIDIAN_VERSION`)
in `Dockerfile`, then build locally. Versions are pinned because exporter
releases can make large behavioral changes.

## Repository hygiene

All `.obsidian` directories, generated vault sites, local secrets, and compiled
server binaries are ignored. Keep deployment credentials in GitHub Actions or
the deployment platform; do not put them in vault plugin configuration.
