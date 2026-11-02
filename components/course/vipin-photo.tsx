import Image from "next/image";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Official photo of Vipin Garg via next/image. Renders nothing when `siteConfig.instructor.photo` is null.
 * `size` is the displayed width/height in px. `round` gives a circular avatar for small bylines.
 */
export function VipinPhoto({
  size,
  round,
  priority,
  className,
}: {
  size: number;
  round?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const photo = siteConfig.instructor.photo;
  if (!photo) return null;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={`${size}px`}
      priority={priority}
      style={{ width: size, height: size }}
      className={cn("shrink-0 object-cover", round ? "rounded-full" : "rounded-lg", className)}
    />
  );
}
