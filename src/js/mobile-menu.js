// mobile-menu.js - Controls the mobile dropdown navigation and icon swap

import { addEventListenerWithCleanup } from "./utils/dom.js";

export function initMobileMenu() {
  const toggleButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("header-nav");
  const icon = toggleButton?.querySelector(".material-symbols-outlined");

  if (!toggleButton || !nav || !icon) {
    return () => {};
  }

  const cleanupFns = [];

  const setOpenState = (open) => {
    toggleButton.setAttribute("aria-expanded", String(open));
    toggleButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("header__nav--open", open);
    icon.textContent = open ? "close" : "menu";
  };

  const handleToggle = (e) => {
    e.preventDefault();
    const open = toggleButton.getAttribute("aria-expanded") !== "true";
    setOpenState(open);
  };

  cleanupFns.push(
    addEventListenerWithCleanup(toggleButton, "click", handleToggle)
  );

  // Close when a nav link is clicked (better UX)
  const navLinks = Array.from(nav.querySelectorAll(".header__nav-link"));
  navLinks.forEach((link) => {
    cleanupFns.push(
      addEventListenerWithCleanup(link, "click", () => setOpenState(false))
    );
  });

  // Close on escape key
  const handleKeydown = (e) => {
    if (e.key === "Escape") setOpenState(false);
  };
  cleanupFns.push(
    addEventListenerWithCleanup(window, "keydown", handleKeydown)
  );

  // Ensure correct icon for initial state
  setOpenState(false);

  return () => {
    while (cleanupFns.length) {
      const dispose = cleanupFns.pop();
      try {
        dispose();
      } catch (err) {
        console.error("Failed to cleanup mobile menu listener", err);
      }
    }
  };
}
