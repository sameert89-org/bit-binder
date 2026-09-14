# syntax=docker/dockerfile:1.7

ARG OBSIDIAN_VERSION=1.9.12
ARG EXPORTER_VERSION=1.9.2

FROM rust:1.89.0 AS injector
RUN cargo install electron-injector --version=1.0.2 --locked

FROM debian:trixie-slim AS exporter
ARG OBSIDIAN_VERSION
ARG EXPORTER_VERSION
ARG TARGETARCH
ENV DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      ca-certificates curl jq xvfb xauth libasound2 libgtk-3-0 libnotify4 libnss3 \
      libxss1 libxtst6 xdg-utils libatspi2.0-0 libuuid1 libsecret-1-0 \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/obsidian /plugin \
    && arch_suffix="" \
    && if [ "${TARGETARCH}" = "arm64" ]; then arch_suffix="-arm64"; fi \
    && curl --fail --location --retry 3 \
      "https://github.com/obsidianmd/obsidian-releases/releases/download/v${OBSIDIAN_VERSION}/obsidian-${OBSIDIAN_VERSION}${arch_suffix}.tar.gz" \
      | tar xzf - -C /opt/obsidian --strip-components=1 \
    && for asset in main.js manifest.json styles.css; do \
      curl --fail --location --retry 3 \
        "https://github.com/KosmosisDire/obsidian-webpage-export/releases/download/${EXPORTER_VERSION}/${asset}" \
        --output "/plugin/${asset}"; \
    done

COPY .docker/obsidian-assets.json /obsidian-assets.json
COPY .docker/install-obsidian-assets.sh /install-obsidian-assets.sh
COPY .docker/obsidian/snippets/ /obsidian-assets/snippets/
RUN sed -i 's/\r$//' /install-obsidian-assets.sh \
    && chmod +x /install-obsidian-assets.sh \
    && /install-obsidian-assets.sh /obsidian-assets.json /obsidian-assets

COPY .docker/vaults.json /build-vaults.json

COPY --from=injector /usr/local/cargo/bin/electron-injector /usr/local/bin/electron-injector
COPY .docker/export-vault.mjs /export-vault.mjs
COPY .docker/run-export.sh /run-export.sh
COPY .docker/export-all.sh /export-all.sh
RUN sed -i 's/\r$//' /run-export.sh /export-all.sh \
    && chmod +x /run-export.sh /export-all.sh

FROM exporter AS sites
COPY . /source
# Network isolation prevents Obsidian from replacing its pinned app bundle and
# makes every export deterministic. export-all.sh serializes Electron instances.
RUN --network=none /export-all.sh /source /site /source/.docker/vaults.json

FROM golang:1.25-alpine AS server-build
WORKDIR /src
COPY server/main.go .
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /bit-binder-server main.go

FROM alpine:3.22 AS runtime
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=server-build /bit-binder-server /app/server
COPY server/public/ /app/public/
COPY --from=sites /site/ /app/public/

ENV PORT=8080
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/api/directories || exit 1
USER 65532:65532
ENTRYPOINT ["/app/server"]
