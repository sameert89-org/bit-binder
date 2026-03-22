export function createSiteItem(site, isActive, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group flex flex-col gap-1 ${
    isActive
      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 shadow-sm"
      : "hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent"
  }`;

  const name = document.createElement("span");
  name.className = `text-sm font-semibold truncate ${
    isActive
      ? "text-blue-700 dark:text-blue-400"
      : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100"
  }`;
  name.textContent = site.name;

  const path = document.createElement("span");
  path.className = `text-[10px] font-mono truncate ${
    isActive
      ? "text-blue-600/70 dark:text-blue-400/60"
      : "text-slate-400 dark:text-slate-500"
  }`;
  path.textContent = site.entry;

  button.appendChild(name);
  button.appendChild(path);
  button.addEventListener("click", onClick);

  return button;
}
