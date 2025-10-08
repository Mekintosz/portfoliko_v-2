// dom.js - Shared DOM helpers for the portfolio scripts

/**
 * Reads a CSS custom property from the document root.
 * @param {string} variableName - The CSS variable (e.g. "--color-primary").
 * @param {string} [fallback=""] - Optional fallback when the variable is empty.
 * @returns {string}
 */
export const getCSSVariable = (variableName, fallback = "") => {
  if (typeof variableName !== "string" || !variableName.startsWith("--")) {
    throw new Error(`Expected a CSS variable name, received "${variableName}".`);
  }

  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName);
  const trimmed = value.trim();
  return trimmed || fallback;
};

/**
 * Checks whether the current device reports a coarse pointer (touch first).
 * @returns {boolean}
 */
export const isTouchPrimaryDevice = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(pointer: coarse)").matches;

/**
 * Determines whether the viewport width is currently considered mobile.
 * @param {number} [breakpoint=768]
 * @returns {boolean}
 */
export const isMobileViewport = (breakpoint = 768) => window.innerWidth <= breakpoint;

/**
 * Rough heuristic to identify mobile contexts. Combines viewport and pointer data.
 * @param {number} [breakpoint=768]
 * @returns {boolean}
 */
export const isMobileContext = (breakpoint = 768) =>
  isTouchPrimaryDevice() || isMobileViewport(breakpoint);

/**
 * Utility wrapper for requestAnimationFrame based throttling.
 * Ensures the given callback only runs once per animation frame.
 * @param {Function} callback
 * @returns {Function}
 */
export const rafThrottle = (callback) => {
  let ticking = false;
  let storedArgs = [];

  const invoke = () => {
    ticking = false;
    callback(...storedArgs);
  };

  return (...args) => {
    storedArgs = args;
    if (!ticking) {
      requestAnimationFrame(invoke);
      ticking = true;
    }
  };
};

/**
 * Adds an event listener and returns a cleanup function that removes it.
 * @param {EventTarget} target
 * @param {string} type
 * @param {EventListenerOrEventListenerObject} listener
 * @param {boolean|AddEventListenerOptions} [options]
 * @returns {Function}
 */
export const addEventListenerWithCleanup = (target, type, listener, options) => {
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
};
