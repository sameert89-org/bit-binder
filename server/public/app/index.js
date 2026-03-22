class SiteService {
  async getSites() {
    const response = await fetch("/api/directories", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to load sites (${response.status})`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Invalid API response");
    }

    return data
      .map((item) => ({
        name: String(item.name || "").trim(),
        entry: String(item.entry || "").trim(),
      }))
      .filter((item) => item.name && item.entry);
  }
}

function toDisplayPath(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

class AppController {
  constructor() {
    this.siteService = new SiteService();
    this.sites = [];
    this.filteredSites = [];
    this.activeSite = null;
    this.currentFramePath = "/";

    this.siteListElement = document.getElementById("site-list");
    this.searchInput = document.getElementById("site-search");
    this.themeToggle = document.getElementById("theme-toggle");
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
    this.hydrateTheme();
    this.bindEvents();
    await this.loadSites();
    this.hydrateRoute();
  }

  bindEvents() {
    this.searchInput.addEventListener("input", () => {
      this.filterSites(this.searchInput.value);
    });

    this.themeToggle.addEventListener("click", () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      this.setTheme(isDark ? "light" : "dark");
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
      if (!this.frame.src) {
        return;
      }
      window.open(this.frame.src, "_blank", "noopener");
    });

    this.frame.addEventListener("load", () => {
      try {
        this.currentFramePath =
          this.frame.contentWindow?.location?.pathname || this.frame.src || "/";
        this.pathbar.textContent = toDisplayPath(this.currentFramePath);
      } catch {
        this.pathbar.textContent = toDisplayPath(this.frame.src || "/");
      }
    });

    window.addEventListener("popstate", () => {
      this.hydrateRoute();
    });
  }

  async loadSites() {
    try {
      this.sites = await this.siteService.getSites();
      this.filteredSites = [...this.sites];
      this.renderSiteList();
    } catch (error) {
      console.error(error);
      this.siteListElement.innerHTML =
        '<p class="message message-warning">Could not load sites. Check server logs.</p>';
    }
  }

  renderSiteList() {
    if (this.filteredSites.length === 0) {
      this.siteListElement.innerHTML =
        '<p class="message message-muted">No sites match this filter.</p>';
      return;
    }

    this.siteListElement.innerHTML = "";
    for (const site of this.filteredSites) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "site-item";
      if (this.activeSite && this.activeSite.name === site.name) {
        button.classList.add("active");
      }

      const nameElement = document.createElement("span");
      nameElement.className = "site-item-name";
      nameElement.textContent = site.name;

      const pathElement = document.createElement("span");
      pathElement.className = "site-item-path";
      pathElement.textContent = toDisplayPath(site.entry);

      button.appendChild(nameElement);
      button.appendChild(pathElement);
      button.addEventListener("click", () => {
        this.openSite(site, { replaceState: false });
      });
      this.siteListElement.appendChild(button);
    }
  }

  filterSites(rawFilter) {
    const filter = rawFilter.trim().toLowerCase();
    this.filteredSites = this.sites.filter((site) =>
      site.name.toLowerCase().includes(filter),
    );
    this.renderSiteList();
  }

  openSite(site, { replaceState }) {
    this.activeSite = site;
    this.activeSiteLabel.textContent = `${site.name} loaded`;
    this.viewerPlaceholder.classList.add("hidden");
    this.frame.src = site.entry;
    this.pathbar.textContent = toDisplayPath(site.entry);
    this.renderSiteList();

    const url = new URL(window.location.href);
    url.searchParams.set("site", site.name);
    const state = { site: site.name };

    if (replaceState) {
      history.replaceState(state, "", url);
    } else {
      history.pushState(state, "", url);
    }
  }

  clearSelection({ replaceState }) {
    this.activeSite = null;
    this.activeSiteLabel.textContent = "No site selected";
    this.frame.removeAttribute("src");
    this.currentFramePath = "/";
    this.pathbar.textContent = "/";
    this.viewerPlaceholder.classList.remove("hidden");
    this.renderSiteList();

    const url = new URL(window.location.href);
    url.searchParams.delete("site");
    const state = { site: null };

    if (replaceState) {
      history.replaceState(state, "", url);
    } else {
      history.pushState(state, "", url);
    }
  }

  hydrateRoute() {
    const url = new URL(window.location.href);
    const siteName = url.searchParams.get("site");
    if (!siteName) {
      this.clearSelection({ replaceState: true });
      return;
    }

    const matchingSite = this.sites.find((site) => site.name === siteName);
    if (!matchingSite) {
      this.clearSelection({ replaceState: true });
      return;
    }

    this.openSite(matchingSite, { replaceState: true });
  }

  hydrateTheme() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      this.setTheme(storedTheme);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    this.setTheme(prefersDark ? "dark" : "light");
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    this.themeToggle.textContent =
      theme === "dark" ? "Light Theme" : "Dark Theme";
  }

  withFrameWindow(action) {
    if (!this.frame.contentWindow) {
      return;
    }

    try {
      action(this.frame.contentWindow);
    } catch (error) {
      console.error("Frame navigation failed:", error);
    }
  }
}

const app = new AppController();
app.init();
