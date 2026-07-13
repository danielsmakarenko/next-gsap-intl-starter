"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";

export default function ScrollTop() {
  const t = useTranslations("accessibility");
  const lenis = useLenis();
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateVisibility = () => {
      const scrollOffset = lenis?.scroll ?? window.scrollY;
      setIsButtonVisible(scrollOffset > 200);
    };

    if (lenis) {
      lenis.on("scroll", updateVisibility);
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    return () => {
      if (lenis) {
        lenis.off("scroll", updateVisibility);
      }

      window.removeEventListener("scroll", updateVisibility);
    };
  }, [lenis]);

  const scrollBackToTop = (event: React.MouseEvent) => {
    event.preventDefault();

    if (lenis) {
      lenis.resize();
      lenis.scrollTo(0, {
        duration: 1.2,
        force: true,
        lock: true,
      });
      return;
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <a
      href="#"
      id="to-top"
      aria-label={t("back_to_top")}
      className="btn btn-to-top"
      onClick={scrollBackToTop}
      style={{
        opacity: isButtonVisible ? 1 : 0,
        visibility: isButtonVisible ? "inherit" : "hidden",
        pointerEvents: isButtonVisible ? "auto" : "none",
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 19V5M6 11l6-6 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
