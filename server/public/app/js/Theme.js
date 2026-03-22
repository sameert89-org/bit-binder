export class ThemeManager {
  constructor(toggleButtonId) {
    this.toggleButton = document.getElementById(toggleButtonId);
    this.currentTheme = "dark";
  }

  init() {
    this.hydrateTheme();
    this.toggleButton?.addEventListener("click", () => this.toggle());
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
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    if (this.toggleButton) {
      this.toggleButton.textContent =
        theme === "dark" ? "Light Mode" : "Dark Mode";
    }
  }

  toggle() {
    this.setTheme(this.currentTheme === "dark" ? "light" : "dark");
  }
}
