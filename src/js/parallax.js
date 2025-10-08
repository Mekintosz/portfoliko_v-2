// parallax.js - Handles the parallax effect for the hero background

import {
  addEventListenerWithCleanup,
  getCSSVariable,
  isMobileContext,
  rafThrottle,
} from "./utils/dom.js";

export function initParallaxEffect() {
  const heroBackground = document.querySelector(".hero__background");

  if (!heroBackground) {
    console.warn("Parallax initialisation skipped: hero background missing.");
    return () => {};
  }

  const cleanupFns = [];
  let scrollCleanup = null;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const contextAllowsParallax = () =>
    !reducedMotionQuery.matches && !isMobileContext();

  const updateParallax = () => {
    const speed = parseFloat(getCSSVariable("--parallax-speed", "0.45")) || 0.45;
    const yPos = -(window.pageYOffset * speed);
    heroBackground.style.transform = `translate3d(0, ${yPos}px, 0)`;
  };

  const throttledScroll = rafThrottle(updateParallax);

  const enableParallax = () => {
    if (scrollCleanup) return;
    updateParallax();
    scrollCleanup = addEventListenerWithCleanup(window, "scroll", throttledScroll, {
      passive: true,
    });
  };

  const disableParallax = () => {
    if (scrollCleanup) {
      scrollCleanup();
      scrollCleanup = null;
    }
    heroBackground.style.transform = "";
  };

  const evaluateContext = () => {
    if (contextAllowsParallax()) {
      enableParallax();
    } else {
      disableParallax();
    }
  };

  cleanupFns.push(addEventListenerWithCleanup(window, "resize", rafThrottle(evaluateContext)));
  cleanupFns.push(addEventListenerWithCleanup(reducedMotionQuery, "change", evaluateContext));

  const themeObserver = new MutationObserver(() => {
    if (scrollCleanup) {
      updateParallax();
    }
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  cleanupFns.push(() => themeObserver.disconnect());

  evaluateContext();
  console.info("Parallax effect initialised.");

  return () => {
    disableParallax();
    while (cleanupFns.length) {
      const dispose = cleanupFns.pop();
      try {
        dispose();
      } catch (error) {
        console.error("Failed to clean up parallax listener", error);
      }
    }
  };
}
