console.log("Starting headless vault export...");

(async () => {
  try {
    await this.app.plugins.setEnable(true);
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
