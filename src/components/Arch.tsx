import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Pastry } from "@/components/Pastries";
import type { Shape } from "@/lib/menu";

/**
 * The signature shape of this direction: a window with a rounded top.
 *
 * Given a photograph it becomes a frame; without one it falls back to a brass
 * line engraving of the pastry, so the layout never leaves a hole.
 */
export function Arch({
  shape,
  src,
  alt,
  objectPosition = "center",
  priority = false,
  ground = "var(--color-oat)",
  className = "",
  style,
  outline = true,
  shelf = true,
  children,
}: {
  shape?: Shape;
  src?: string;
  alt?: string;
  objectPosition?: string;
  /** When true, also sets fetchPriority="high" for LCP. */
  priority?: boolean;
  ground?: string;
  className?: string;
  style?: CSSProperties;
  outline?: boolean;
  shelf?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`arch ${outline ? "arch-outline" : ""} ${className}`}
      style={{ background: ground, ...style }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover"
          style={{ objectPosition }}
        />
      ) : shape ? (
        <>
          <div className="grid h-full w-full place-items-center px-[13%] pb-[26%] pt-[16%]">
            <Pastry shape={shape} tint="beurre" title={alt} className="line-art w-full" />
          </div>
          {shelf ? (
            <span
              aria-hidden
              className="absolute inset-x-[12%] bottom-[18%] h-px bg-[var(--color-brass)] opacity-40"
            />
          ) : null}
        </>
      ) : null}
      {children}
    </div>
  );
}
