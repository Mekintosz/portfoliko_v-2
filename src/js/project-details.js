// project-details.js - Behaviour for individual project pages

import { addEventListenerWithCleanup, rafThrottle } from "./utils/dom.js";
import { initThemeToggle } from "./theme-toggle.js";

const initDetailNavigation = () => {
  const navLinks = Array.from(
    document.querySelectorAll(".project-nav__link[data-target]")
  );
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.target || ""))
    .filter(Boolean);

  if (!navLinks.length || !sections.length) {
    return () => {};
  }

  const cleanupFns = [];
  let activeId = null;

  const setActiveLink = (id) => {
    if (activeId === id) return;
    activeId = id;
    navLinks.forEach((link) => {
      const isActive = link.dataset.target === id;
      link.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const observeSections = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (inView) {
          setActiveLink(inView.target.id);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.6],
        rootMargin: "-30% 0px -30% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  };

  cleanupFns.push(observeSections());

  const scrollToSection = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.dataset.target;
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  navLinks.forEach((link) => {
    cleanupFns.push(addEventListenerWithCleanup(link, "click", scrollToSection));
  });

  const handleScrollFallback = rafThrottle(() => {
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    let nearestSection = null;
    let smallestDelta = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + window.scrollY + rect.height / 2;
      const delta = Math.abs(sectionCenter - viewportCenter);
      if (delta < smallestDelta) {
        smallestDelta = delta;
        nearestSection = section;
      }
    });

    if (nearestSection) {
      setActiveLink(nearestSection.id);
    }
  });

  cleanupFns.push(
    addEventListenerWithCleanup(window, "scroll", handleScrollFallback, {
      passive: true,
    })
  );

  cleanupFns.push(
    addEventListenerWithCleanup(window, "resize", handleScrollFallback, {
      passive: true,
    })
  );

  return () => {
    while (cleanupFns.length) {
      const dispose = cleanupFns.pop();
      try {
        dispose();
      } catch (error) {
        console.error("Failed to clean up detail navigation", error);
      }
    }
  };
};

const initBackLink = () => {
  const backButton = document.querySelector("[data-back-to-portfolio]");
  if (!backButton) return () => {};

  const handleBackClick = (event) => {
    if (backButton.hasAttribute("data-instant")) return;
    event.preventDefault();
    window.location.href = backButton.getAttribute("href") || "../index.html";
  };

  return addEventListenerWithCleanup(backButton, "click", handleBackClick);
};

const initialise = () => {
  const cleanups = [];

  try {
    cleanups.push(initDetailNavigation());
  } catch (error) {
    console.error("Failed to initialise detail navigation", error);
  }

  try {
    cleanups.push(initBackLink());
  } catch (error) {
    console.error("Failed to bind back button", error);
  }

  try {
    const themeCleanup = initThemeToggle();
    if (typeof themeCleanup === "function") {
      cleanups.push(themeCleanup);
    }
  } catch (error) {
    console.error("Failed to initialise theme toggle", error);
  }

  window.addEventListener("beforeunload", () => {
    while (cleanups.length) {
      const dispose = cleanups.pop();
      try {
        dispose();
      } catch (error) {
        console.error("Failed to dispose project detail cleanup", error);
      }
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialise, { once: true });
} else {
  initialise();
}
