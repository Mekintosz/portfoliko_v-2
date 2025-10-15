// main.js - Entry point for portfolio scripts

import { initNavigation } from "./navigation.js";
import { initGenerativeBackground } from "./generative-background.js";
import { initParallaxEffect } from "./parallax.js";
import { initThemeToggle } from "./theme-toggle.js";
import { initMobileMenu } from "./mobile-menu.js";

const modules = [
  { name: "navigation", initializer: initNavigation },
  { name: "generative-background", initializer: initGenerativeBackground },
  { name: "parallax", initializer: initParallaxEffect },
  { name: "theme-toggle", initializer: initThemeToggle },
  { name: "mobile-menu", initializer: initMobileMenu },
];

const initialiseModules = () => {
  const cleanups = [];

  modules.forEach(({ name, initializer }) => {
    try {
      const cleanup = initializer();
      if (typeof cleanup === "function") {
        cleanups.push({ name, cleanup });
      }
    } catch (error) {
      console.error(`Error initialising ${name}:`, error);
    }
  });

  if (cleanups.length) {
    window.addEventListener("beforeunload", () => {
      cleanups.forEach(({ name, cleanup }) => {
        try {
          cleanup();
        } catch (error) {
          console.error(`Failed to clean up module ${name}`, error);
        }
      });
    });
  }

  console.info("Portfolio scripts ready.");
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialiseModules, {
    once: true,
  });
} else {
  initialiseModules();
}
