"use client";

import ReactLenis, { useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function LenisSmoothScroll() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }

        return lenis.scroll;
      },
      scrollLeft(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }

        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    document.body.style.overflow = "auto";

    const syncGsapOnScroll = () => ScrollTrigger.update();
    let resizeTimer: number | undefined;
    let lastViewportWidth = window.innerWidth;
    let lastViewportHeight = window.innerHeight;

    lenis.on("scroll", syncGsapOnScroll);

    const refreshOnResize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const widthChanged = nextWidth !== lastViewportWidth;
      const heightDelta = Math.abs(nextHeight - lastViewportHeight);
      const shouldRefresh =
        widthChanged || heightDelta > 120 || nextWidth >= 1024;

      lastViewportWidth = nextWidth;
      lastViewportHeight = nextHeight;

      if (!shouldRefresh) {
        return;
      }

      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }

      resizeTimer = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", refreshOnResize);

    return () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }

      lenis.off("scroll", syncGsapOnScroll);
      window.removeEventListener("resize", refreshOnResize);
      ScrollTrigger.scrollerProxy(document.body, {});
      document.body.style.overflow = "";
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    ScrollTrigger.update();
  }, [lenis, pathname]);

  if (
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  ) {
    return null;
  }

  return <ReactLenis root />;
}
