import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Detect mobile touch devices
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth <= 1024);

    // On mobile touch devices, use 100% native momentum scrolling with fallback API
    if (isTouchDevice) {
      window.__lenis = {
        scrollTo: (target, opts = {}) => {
          if (typeof target === "number") {
            window.scrollTo({ top: target, behavior: "smooth" });
          } else if (typeof target === "string") {
            const el = document.querySelector(target);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        },
      };
      return;
    }

    // On desktop, initialize ultra-smooth Lenis momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0, // Never hijack touch
      infinite: false,
    });

    // High performance RAF loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Provide window-level access for anchors & smooth scrolls
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
