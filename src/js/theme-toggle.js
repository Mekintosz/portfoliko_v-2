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

  const cleanupFns = [];
  const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  let userPreferenceLocked = false;

  const updateIcon = (theme) => {
    themeIcon.textContent = theme === DARK ? "light_mode" : "dark_mode";
    themeToggle.setAttribute("aria-pressed", theme === DARK ? "true" : "false");
  };

  const applyTheme = (theme, { persist } = { persist: true }) => {
    const nextTheme = theme === DARK ? DARK : LIGHT;
    htmlElement.classList.toggle(DARK, nextTheme === DARK);
    htmlElement.setAttribute("data-theme", nextTheme);
    updateIcon(nextTheme);

    if (persist) {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      userPreferenceLocked = true;
    }
  };

  const resolveInitialTheme = () => {
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
    addEventListenerWithCleanup(themeToggle, "click", (event) => {
      event.preventDefault();
      const currentTheme = htmlElement.classList.contains(DARK) ? DARK : LIGHT;
      const nextTheme = currentTheme === DARK ? LIGHT : DARK;
      applyTheme(nextTheme);
    })
  );

  cleanupFns.push(
    addEventListenerWithCleanup(darkModeMedia, "change", (event) => {
      if (!userPreferenceLocked) {
        applyTheme(event.matches ? DARK : LIGHT, { persist: false });
      }
    })
  );

  cleanupFns.push(
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
