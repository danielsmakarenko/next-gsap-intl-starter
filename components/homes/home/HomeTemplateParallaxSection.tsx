"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import BackgroundParallax from "@/components/animation/BackgroundParallax";

export default function HomeTemplateParallaxSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const t = useTranslations("home_template");

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".home-template-parallax__media",
        {
          autoAlpha: 0,
          y: 48,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          delay: 0.45,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".home-template-parallax__content > *",
        {
          autoAlpha: 0,
          y: 32,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay: 0.85,
          ease: "power3.out",
          stagger: 0.12,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mxd-section padding-hero-01 padding-pre-manifest mobile-point-subtitle home-template-parallax"
    >
      <div className="mxd-container">
        <div className="mxd-divider home-template-parallax__media">
          <BackgroundParallax
            scale={1.5}
            className="mxd-divider__image divider-image-1 parallax-img"
          />
        </div>
        <div className="home-template-parallax__content">
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
