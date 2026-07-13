"use client";

import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import Ukiyo from "ukiyojs";

type HtmlTag = keyof HTMLElementTagNameMap;

type BackgroundParallaxProps<Tag extends HtmlTag = "div"> = {
  as?: Tag;
  children?: ReactNode;
  className?: string;
  scale?: number;
  speed?: number;
  willChange?: boolean;
  wrapperClass?: string;
} & Omit<ComponentPropsWithoutRef<Tag>, "as" | "children" | "className">;

export default function BackgroundParallax<Tag extends HtmlTag = "div">({
  as,
  children,
  className,
  scale = 1.2,
  speed = 1.5,
  willChange = true,
  wrapperClass,
  ...elementProps
}: BackgroundParallaxProps<Tag>) {
  const elementRef = useRef<HTMLElement | null>(null);
  const Component = (as ?? "div") as ElementType;

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const parallax = new Ukiyo(element, {
      externalRAF: true,
      scale,
      speed,
      willChange,
      wrapperClass,
    });
    const renderFrame = () => parallax.animate();

    gsap.ticker.add(renderFrame);
    return () => {
      gsap.ticker.remove(renderFrame);
      parallax.destroy();
    };
  }, [scale, speed, willChange, wrapperClass]);

  return (
    <Component ref={elementRef} className={className} {...elementProps}>
      {children}
    </Component>
  );
}
