"use client";

import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useState,
} from "react";
import Link from "next/link";

type AnimatedButtonOwnProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  href?: string;
  position?: "previous" | "next";
  target?: string;
  text: string;
};

type AnimatedButtonProps<Tag extends ElementType> = AnimatedButtonOwnProps &
  Omit<ComponentPropsWithoutRef<Tag>, keyof AnimatedButtonOwnProps>;

function AnimatedLabel({ text }: { text: string }) {
  return (
    <>
      {Array.from(text, (character, index) => (
        <span className="btn-anim__letter" key={`${character}-${index}`}>
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <span className="btn-caption">
      <span className="btn-anim__block">{text}</span>
      <span className="btn-anim__block" aria-hidden="true">
        <AnimatedLabel text={text} />
      </span>
    </span>
  );
}

export default function AnimatedButton<Tag extends ElementType = "div">({
  as,
  children,
  className = "",
  href,
  position = "next",
  target,
  text,
  ...elementProps
}: AnimatedButtonProps<Tag>) {
  const [active, setActive] = useState(false);
  const isInternalLink = Boolean(href?.startsWith("/") && !target);
  const Component = href ? (isInternalLink ? Link : "a") : (as ?? "div");
  const linkProps = href ? { href, ...(target ? { target } : {}) } : {};

  return (
    <Component
      {...elementProps}
      {...linkProps}
      aria-label={text}
      className={`btn-anim ${active ? "play" : ""} ${className}`.trim()}
      onAnimationEnd={() => setActive(false)}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      {position === "previous" ? children : null}
      <Caption text={text} />
      {position === "next" ? children : null}
    </Component>
  );
}
