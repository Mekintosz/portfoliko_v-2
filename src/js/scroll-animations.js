// scroll-animations.js - Handles scroll-triggered animations
export const initScrollAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.35,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll(
    ".about, .projects, .skills, .contact"
  );
  sections.forEach((section) => {
    section.classList.add("fade-in-section");
    observer.observe(section);
  });

  // Return cleanup function
  return () => {
    sections.forEach((section) => {
      observer.unobserve(section);
      section.classList.remove("fade-in-section", "is-visible");
    });
  };
};
