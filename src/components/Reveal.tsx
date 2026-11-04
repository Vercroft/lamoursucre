"use client";

import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "style">;

/** Fades a block up the first time it crosses into view. */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  className = "",
  style,
  ...rest
}: RevealProps<T>) {
  const Comp = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Comp
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ ...style, "--delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Comp>
  );
}
