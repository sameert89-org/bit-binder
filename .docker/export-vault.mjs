console.log("Starting headless vault export...");

(async () => {
  try {
    await this.app.plugins.setEnable(true);

    const renderPlugins = (process.env.RENDER_PLUGINS ?? "")
      .split(",")
      .map((pluginId) => pluginId.trim())
      .filter(Boolean);
    for (const pluginId of renderPlugins) {
      await this.app.plugins.enablePlugin(pluginId);
      if (!this.app.plugins.getPlugin(pluginId)) {
        throw new Error(`Render plugin failed to load: ${pluginId}`);
      }
    }

    if (renderPlugins.includes("obsidian-excalidraw-plugin")) {
      const excalidrawPlugin = this.app.plugins.getPlugin(
        "obsidian-excalidraw-plugin",
      );
      const ea = this.ExcalidrawAutomate ?? excalidrawPlugin?.getEA?.();
      if (!ea) {
        throw new Error("ExcalidrawAutomate API is unavailable");
      }

      const drawings = this.app.vault
        .getFiles()
        .filter((file) => file.path.toLowerCase().endsWith(".excalidraw.md"));
      const svgPaths = new Map();
      for (const drawing of drawings) {
        ea.reset();
        const svg = await ea.createSVG(drawing.path, false);
        if (!svg) {
          throw new Error(`Could not render Excalidraw SVG: ${drawing.path}`);
        }

        const svgPath = drawing.path.replace(/\.md$/i, ".svg");
        svgPaths.set(drawing.path, svgPath);
        const svgText = svg.outerHTML;
        const existing = this.app.vault.getAbstractFileByPath(svgPath);
        if (existing) {
          await this.app.vault.modify(existing, svgText);
        } else {
          await this.app.vault.create(svgPath, svgText);
        }
      }

      // Obsidian's normal preview renderer can still transclude an Excalidraw
      // Markdown file as raw text during a headless full-vault export. Point
      // embeds at the SVG previews in this disposable vault copy, and make the
      // standalone drawing pages render their preview as well. Source notes are
      // never changed because /vault is copied inside the Docker build.
      let rewrittenEmbeds = 0;
      const markdownFiles = this.app.vault
        .getMarkdownFiles()
        .filter((file) => !file.path.toLowerCase().endsWith(".excalidraw.md"));
      for (const file of markdownFiles) {
        const source = await this.app.vault.read(file);
        const rendered = source.replace(
          /!\[\[([^\]\n|#]+?\.excalidraw)(?:\.md)?([|#][^\]\n]*)?\]\]/gi,
          (_match, target, suffix = "") => {
            rewrittenEmbeds += 1;
            return `![[${target}.svg${suffix}]]`;
          },
        );
        if (rendered !== source) {
          await this.app.vault.modify(file, rendered);
        }
      }

      for (const drawing of drawings) {
        await this.app.vault.modify(drawing, `![[${svgPaths.get(drawing.path)}]]\n`);
      }

      console.log(
        `Materialized ${drawings.length} Excalidraw SVG preview(s); rewrote ${rewrittenEmbeds} embed(s)`,
      );
    }

    await this.app.plugins.enablePlugin("webpage-html-export");

    const plugin = this.app.plugins.getPlugin("webpage-html-export");
    if (!plugin) {
      throw new Error("Webpage HTML Export failed to load");
    }

    // 1.9.2's Docker API uses the in-memory settings object. An empty file list
    // means "all files" in most of the exporter, but one validation path still
    // indexes element zero, so populate it explicitly.
    await plugin.settings.onlinePreset();
    plugin.settings.exportOptions.filesToExport = this.app.vault
      .getFiles()
      .map((file) => file.path);
    plugin.settings.exportOptions.siteName = process.env.SITE_NAME;
    plugin.settings.onlyExportModified = false;
    plugin.settings.deleteOldFiles = true;
    plugin.settings.openAfterExport = false;

    await plugin.exportDocker();
    console.log("Vault export completed");
  } catch (error) {
    console.error("Vault export failed", error);
    process.exitCode = 1;
  } finally {
    // Obsidian/Electron does not terminate after an injected script completes.
    // SIGKILL is intentional and is handled by run-export.sh.
    require("node:process").kill(process.pid, "SIGKILL");
  }
})();
