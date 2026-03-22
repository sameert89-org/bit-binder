export class SiteService {
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
