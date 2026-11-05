import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Crumb } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

/** Standard page frame: breadcrumbs, one H1, lead, content. */
export function PageShell({
  crumbs,
  title,
  lead,
  children,
  prose,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  /** Narrow reading column (legal text). */
  prose?: boolean;
}) {
  return (
    <div>
      <Breadcrumbs items={crumbs} />
      <header className="container-site pt-10 pb-12 max-sm:pt-4 max-sm:pb-10 lg:pt-16 lg:pb-20">
        <div className="max-w-3xl">
          <h1 className="vg-rise">{title}</h1>
          {lead ? (
            <p className="vg-rise mt-6 max-w-[46ch] text-lead max-sm:mt-4" style={{ animationDelay: "80ms" }}>
              {lead}
            </p>
          ) : null}
        </div>
      </header>
      <div className={cn(prose ? "container-site max-w-(--container-prose) lg:max-w-(--container-prose)" : "")}>
        {children}
      </div>
    </div>
  );
}

/** Full-width page section. `tone="band"` uses the alternate surface. */
export function PageSection({
  id,
  title,
  children,
  tone,
  className,
}: {
  id?: string;
  title?: string;
  children: React.ReactNode;
  tone?: "band";
  className?: string;
}) {
  const hid = id ? `${id}-h` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? hid : undefined}
      className={cn("scroll-mt-24 py-14 max-sm:py-12 lg:py-20", tone === "band" && "bg-[#f5f5f7]", className)}
    >
      <div className="container-site">
        {title ? (
          <h2 id={hid} className="mb-8 max-w-3xl max-sm:mb-6 lg:mb-10">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/** Framed 16:9 slot for media that does not exist yet. No play icon, no fake playback. */
export function MediaSlot({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-video w-full items-center justify-center rounded-[1.75rem] bg-[#f5f5f7] px-6 text-center text-[15px] text-muted-foreground max-sm:rounded-2xl"
    >
      {label}
    </div>
  );
}

export function Notice({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "warning" }) {
  return (
    <div
      className={cn(
        "max-w-[68ch] rounded-2xl p-5 text-[15px] leading-relaxed text-foreground",
        tone === "warning" ? "bg-warning-bg" : "bg-[#f5f5f7]",
      )}
    >
      {children}
    </div>
  );
}
