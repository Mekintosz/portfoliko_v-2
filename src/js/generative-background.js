// generative-background.js - Handles the generative art canvas background

import {
  addEventListenerWithCleanup,
  getCSSVariable,
  rafThrottle,
} from "./utils/dom.js";

class Particle {
  constructor(bounds, palette, velocityLimit) {
    this.bounds = bounds;
    this.palette = palette;
    this.velocityLimit = velocityLimit;
    this.reset();
  }

  reset() {
    const { width, height } = this.bounds();
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2 + 1;
    const palette = this.palette();
    this.color = palette[Math.floor(Math.random() * palette.length)];
    this.velocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5,
    };
    this.alpha = Math.random() * 0.4 + 0.4;
  }

  update(mouse, noiseFactor = 0.006) {
    const { width, height } = this.bounds();
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const attractionForce = 0.003;

    if (distance > 0 && distance < 150) {
      this.velocity.x += (dx / distance) * attractionForce;
      this.velocity.y += (dy / distance) * attractionForce;
    }

    this.velocity.x += (Math.random() - 0.5) * noiseFactor;
    this.velocity.y += (Math.random() - 0.5) * noiseFactor;

    this.velocity.x *= 0.98;
    this.velocity.y *= 0.98;

    this.velocity.x = Math.max(
      -this.velocityLimit,
      Math.min(this.velocityLimit, this.velocity.x)
    );
    this.velocity.y = Math.max(
      -this.velocityLimit,
      Math.min(this.velocityLimit, this.velocity.y)
    );

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export function initGenerativeBackground() {
  const canvas = document.getElementById("generative-background");
  if (!canvas) {
    console.warn("Generative background skipped: canvas element missing.");
    return () => {};
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Canvas context is not available for generative background.");
    return () => {};
  }

  let width = window.innerWidth;
  let height = window.innerHeight;
  let animationId = null;
  let particles = [];
  let backgroundFill = "rgb(27, 21, 61)";
  const cleanupFns = [];
  const pointer = { x: width / 2, y: height / 2 };

  const bounds = () => ({ width, height });

  const palette = () => [
    getCSSVariable("--color-particle-1", "#FFC107"),
    getCSSVariable("--color-particle-2", "#E91E63"),
    getCSSVariable("--color-particle-3", "#9C27B0"),
    getCSSVariable("--color-particle-4", "#03A9F4"),
    getCSSVariable("--color-particle-5", "#4CAF50"),
  ];

  const refreshBackgroundFill = () => {
    backgroundFill = getCSSVariable(
      "--color-background-body",
      "rgb(27, 21, 61)"
    );
    const canvasColor = getCSSVariable(
      "--color-background-body",
      backgroundFill
    );
    canvas.style.background = canvasColor;
  };

  const targetParticleCount = () => {
    const area = window.innerWidth * window.innerHeight;
    const density = Math.min(0.00008 * area, 100);
    return Math.max(40, Math.floor(density));
  };

  const buildParticles = (count) => {
    particles = new Array(count)
      .fill(null)
      .map(() => new Particle(bounds, palette, 1.8));
  };

  const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    refreshBackgroundFill();
    buildParticles(targetParticleCount());
  };

  const drawFrame = () => {
    ctx.fillStyle = backgroundFill;
    ctx.fillRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.update(pointer);
      particle.draw(ctx);
    });

    animationId = requestAnimationFrame(drawFrame);
  };

  const startAnimation = () => {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(drawFrame);
  };

  cleanupFns.push(
    addEventListenerWithCleanup(
      window,
      "resize",
      rafThrottle(() => {
        resizeCanvas();
        startAnimation();
      })
    )
  );

  cleanupFns.push(
    addEventListenerWithCleanup(window, "mousemove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    })
  );

  cleanupFns.push(
    addEventListenerWithCleanup(document, "visibilitychange", () => {
      if (document.hidden) {
        if (animationId) cancelAnimationFrame(animationId);
        animationId = null;
      } else {
        startAnimation();
      }
    })
  );

  const themeObserver = new MutationObserver(() => {
    refreshBackgroundFill();
    const paletteColors = palette();
    particles.forEach((particle) => {
      const nextColor =
        paletteColors[Math.floor(Math.random() * paletteColors.length)];
      if (nextColor) {
        particle.color = nextColor;
      }
    });
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  cleanupFns.push(() => themeObserver.disconnect());

  try {
    resizeCanvas();
    startAnimation();
    console.info("Generative background initialised.");
  } catch (error) {
    console.error("Failed to initialise generative background", error);
    canvas.style.background = getCSSVariable(
      "--color-background-canvas",
      "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
    );
  }

  return () => {
    if (animationId) cancelAnimationFrame(animationId);
    while (cleanupFns.length) {
      const dispose = cleanupFns.pop();
      try {
        dispose();
      } catch (error) {
        console.error("Failed to clean up background listener", error);
      }
    }
  };
}
