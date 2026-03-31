import { SiteService } from "./SiteService.js";
import { ThemeManager } from "./Theme.js";
import { createSiteItem } from "./SiteItem.js";

class AppController {
  constructor() {
    this.siteService = new SiteService();
    this.themeManager = new ThemeManager("theme-toggle");
    this.sites = [];
    this.filteredSites = [];
    this.activeSite = null;

    // Elements
    this.siteListElement = document.getElementById("site-list");
    this.searchInput = document.getElementById("site-search");
    this.homeButton = document.getElementById("home-button");
    this.frameBackButton = document.getElementById("frame-back");
    this.frameForwardButton = document.getElementById("frame-forward");
    this.openNewTabButton = document.getElementById("open-new-tab");
    this.pathbar = document.getElementById("pathbar");
    this.activeSiteLabel = document.getElementById("active-site-label");
    this.viewerPlaceholder = document.getElementById("viewer-placeholder");
    this.frame = document.getElementById("site-frame");
  }

  async init() {
    this.themeManager.init();
    this.bindEvents();
    await this.loadSites();
    this.handleInitialRoute();
  }

  bindEvents() {
    this.searchInput.addEventListener("input", (e) => {
      this.filterSites(e.target.value);
    });

    this.homeButton.addEventListener("click", () => {
      this.clearSelection({ replaceState: false });
    });

    this.frameBackButton.addEventListener("click", () => {
      this.withFrameWindow((win) => win.history.back());
    });

    this.frameForwardButton.addEventListener("click", () => {
      this.withFrameWindow((win) => win.history.forward());
    });

    this.openNewTabButton.addEventListener("click", () => {
      if (this.frame.src) {
        let targetUrl = this.frame.src;
        this.withFrameWindow((win) => {
          if (win.location && win.location.href !== "about:blank") {
            targetUrl = win.location.href;
          }
        });
        window.open(targetUrl, "_blank", "noopener");
      }
    });

    this.frame.addEventListener("load", () => {
      this.updatePathDisplay();
    });

    window.addEventListener("popstate", () => {
      this.handleInitialRoute();
    });
  }

  async loadSites() {
    try {
      this.sites = await this.siteService.getSites();
      this.filteredSites = [...this.sites];
      this.renderSiteList();
    } catch (error) {
      console.error(error);
      this.siteListElement.innerHTML = `
        <div class="p-4 text-xs text-red-500 bg-red-50 dark:bg-red-900/10 rounded-lg">
          Failed to load sites. Check server connection.
        </div>
      `;
    }
  }

  renderSiteList() {
    this.siteListElement.innerHTML = "";
    if (this.filteredSites.length === 0) {
      this.siteListElement.innerHTML = `
        <div class="p-4 text-xs text-slate-500 italic">
          No vaults found matching your search.
        </div>
      `;
      return;
    }

    this.filteredSites.forEach((site) => {
      const isActive = this.activeSite && this.activeSite.name === site.name;
      const item = createSiteItem(site, isActive, () => {
        this.openSite(site, { replaceState: false });
      });
      this.siteListElement.appendChild(item);
    });
  }

  filterSites(query) {
    const q = query.toLowerCase().trim();
    this.filteredSites = this.sites.filter((s) =>
      s.name.toLowerCase().includes(q),
    );
    this.renderSiteList();
  }

  openSite(site, { replaceState }) {
    this.activeSite = site;
    this.activeSiteLabel.textContent = site.name;
    this.viewerPlaceholder.classList.add("hidden");
    
    // Add cache buster to force fresh load of the entry point
    const cacheBuster = `?t=${Date.now()}`;
    this.frame.src = site.entry + cacheBuster;
    
    this.frame.classList.remove("invisible");
    this.updatePathDisplay();
    this.renderSiteList();

    const url = new URL(window.location.href);
    url.searchParams.set("site", site.name);
    if (replaceState) {
      history.replaceState({ site: site.name }, "", url);
    } else {
      history.pushState({ site: site.name }, "", url);
    }
  }

  clearSelection({ replaceState }) {
    this.activeSite = null;
    this.activeSiteLabel.textContent = "No site selected";
    this.frame.src = "";
    this.frame.classList.add("invisible");
    this.viewerPlaceholder.classList.remove("hidden");
    this.pathbar.textContent = "/";
    this.renderSiteList();

    const url = new URL(window.location.href);
    url.searchParams.delete("site");
    if (replaceState) {
      history.replaceState({}, "", url);
    } else {
      history.pushState({}, "", url);
    }
  }

  updatePathDisplay() {
    try {
      const path =
        this.frame.contentWindow?.location?.pathname || this.frame.src || "/";
      this.pathbar.textContent = decodeURIComponent(path);
    } catch {
      this.pathbar.textContent = decodeURIComponent(this.frame.src || "/");
    }
  }

  handleInitialRoute() {
    const url = new URL(window.location.href);
    const siteName = url.searchParams.get("site");
    if (siteName) {
      const site = this.sites.find((s) => s.name === siteName);
      if (site) {
        this.openSite(site, { replaceState: true });
        return;
      }
    }
    this.clearSelection({ replaceState: true });
  }

  withFrameWindow(action) {
    if (this.frame.contentWindow) {
      try {
        action(this.frame.contentWindow);
      } catch (e) {
        console.warn("Cross-origin frame restriction", e);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new AppController();
  app.init();
});
