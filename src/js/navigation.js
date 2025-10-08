// navigation.js - Handles the main navigation logic

import { addEventListenerWithCleanup, rafThrottle } from "./utils/dom.js";

export function initNavigation() {
  const navigationDots = Array.from(
    document.querySelectorAll(".navigation__dot[data-section]")
  );
  const sections = Array.from(document.querySelectorAll("section[id]"));

  if (!navigationDots.length || !sections.length) {
    console.warn("Navigation initialisation skipped: required elements missing.");
    return () => {};
  }

  const cleanupFns = [];
  let activeSectionId = null;

  const setActiveDot = (sectionId) => {
    if (!sectionId || sectionId === activeSectionId) return;
    activeSectionId = sectionId;

    navigationDots.forEach((dot) => {
      const isActive = dot.getAttribute("data-section") === sectionId;
      dot.classList.toggle("active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "page");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        setActiveDot(visibleEntry.target.id);
      }
    },
    {
      root: null,
      rootMargin: "-30% 0px -30% 0px",
      threshold: [0.25, 0.6, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));
  cleanupFns.push(() => observer.disconnect());

  const updateActiveFromScroll = () => {
    const scrollCenter = window.scrollY + window.innerHeight / 2;
    let closestSection = null;
    let smallestDelta = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + window.scrollY + rect.height / 2;
      const delta = Math.abs(sectionCenter - scrollCenter);

      if (delta < smallestDelta) {
        smallestDelta = delta;
        closestSection = section;
      }
    });

    if (closestSection) {
      setActiveDot(closestSection.id);
    }
  };

  const throttledFallback = rafThrottle(updateActiveFromScroll);

  cleanupFns.push(
    addEventListenerWithCleanup(window, "scroll", throttledFallback, {
      passive: true,
    })
  );
  cleanupFns.push(
    addEventListenerWithCleanup(window, "resize", throttledFallback, {
      passive: true,
    })
  );

  const handleDotClick = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    if (!targetId) return;

    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  navigationDots.forEach((dot) => {
    cleanupFns.push(addEventListenerWithCleanup(dot, "click", handleDotClick));
  });

  requestAnimationFrame(updateActiveFromScroll);
  console.info("Navigation initialised.");

  return () => {
    while (cleanupFns.length) {
      const dispose = cleanupFns.pop();
      try {
        dispose();
      } catch (error) {
        console.error("Failed to clean up navigation listener", error);
      }
    }
  };
}
