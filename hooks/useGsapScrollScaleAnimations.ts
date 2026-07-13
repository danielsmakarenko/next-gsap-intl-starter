"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealMode = "fade" | "left" | "right" | "scale";

const initialState: Record<RevealMode, gsap.TweenVars> = {
  fade: { autoAlpha: 0, y: 40 },
  left: { autoAlpha: 0, x: -56 },
  right: { autoAlpha: 0, x: 56 },
  scale: { autoAlpha: 0, scale: 1.12, y: 24 },
};

function getRevealMode(element: HTMLElement): RevealMode {
  const value = element.dataset.scrollReveal;
  return value === "left" || value === "right" || value === "scale"
    ? value
    : "fade";
}

export default function useGsapScrollScaleAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]");

      elements.forEach((element) => {
        const mode = getRevealMode(element);
        gsap.fromTo(element, initialState[mode], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
      ScrollTrigger.clearScrollMemory();
    };
  }, [pathname]);
}
