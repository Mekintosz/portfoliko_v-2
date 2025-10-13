// theme-toggle.js - Handles the light/dark theme toggle functionality

import { addEventListenerWithCleanup } from "./utils/dom.js";

const THEME_STORAGE_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";

export function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const themeIcon = themeToggle?.querySelector(".material-symbols-outlined");

  if (!themeToggle || !themeIcon) {
    console.warn("Theme toggle skipped: toggle button or icon missing.");
    return () => {};
  }

  // Normalise legacy markup that used a `.dark` class alongside the data attribute.
  htmlElement.classList.remove(DARK);

  const cleanupFns = [];
  const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  // Tracks whether the user explicitly chose a theme, preventing OS changes from overriding it.
  let userPreferenceLocked = false;

  const getCurrentTheme = () =>
    htmlElement.getAttribute("data-theme") === DARK ? DARK : LIGHT;

  const updateIcon = (theme) => {
    themeIcon.textContent = theme === DARK ? "light_mode" : "dark_mode";
    themeToggle.setAttribute("aria-pressed", theme === DARK ? "true" : "false");
  };

  const applyTheme = (theme, { persist } = { persist: true }) => {
    const nextTheme = theme === DARK ? DARK : LIGHT;
    // `data-theme` drives every theme-specific style, so we keep it as the single source of truth.
    htmlElement.setAttribute("data-theme", nextTheme);
    updateIcon(nextTheme);

    if (persist) {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      userPreferenceLocked = true;
    }
  };

  const resolveInitialTheme = () => {
    // Honour a stored preference first, otherwise fall back to the system setting.
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === DARK || storedTheme === LIGHT) {
      userPreferenceLocked = true;
      applyTheme(storedTheme, { persist: false });
      return;
    }

    userPreferenceLocked = false;
    applyTheme(darkModeMedia.matches ? DARK : LIGHT, { persist: false });
  };

  cleanupFns.push(
    // Toggle theme whenever the user activates the button.
    addEventListenerWithCleanup(themeToggle, "click", (event) => {
      event.preventDefault();
      const currentTheme = getCurrentTheme();
      const nextTheme = currentTheme === DARK ? LIGHT : DARK;
      applyTheme(nextTheme);
    })
  );

  cleanupFns.push(
    // React to operating-system theme changes unless the user has made an explicit choice.
    addEventListenerWithCleanup(darkModeMedia, "change", (event) => {
      if (!userPreferenceLocked) {
        applyTheme(event.matches ? DARK : LIGHT, { persist: false });
      }
    })
  );

  cleanupFns.push(
    // Keep multiple tabs/windows in sync when the theme is changed elsewhere.
    addEventListenerWithCleanup(window, "storage", (event) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      if (event.newValue === DARK || event.newValue === LIGHT) {
        userPreferenceLocked = true;
        applyTheme(event.newValue, { persist: false });
      } else {
        userPreferenceLocked = false;
        applyTheme(darkModeMedia.matches ? DARK : LIGHT, { persist: false });
      }
    })
  );

  resolveInitialTheme();
  console.info("Theme toggle initialised.");

  return () => {
    while (cleanupFns.length) {
      const dispose = cleanupFns.pop();
      try {
        dispose();
      } catch (error) {
        console.error("Failed to clean up theme toggle listener", error);
      }
    }
  };
}
