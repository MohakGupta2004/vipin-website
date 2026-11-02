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
      <div className="container-site pt-6 text-sm">
        <Breadcrumbs items={crumbs} />
      </div>
      <header className="container-site py-10 lg:py-14">
        <div className="max-w-(--container-prose)">
          <h1>{title}</h1>
          {lead ? <p className="mt-6 text-lead">{lead}</p> : null}
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
      className={cn("scroll-mt-28 py-12 lg:py-16", tone === "band" && "bg-surface-2", className)}
    >
      <div className="container-site">
        {title ? (
          <h2 id={hid} className="mb-8">
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
      className="flex aspect-video w-full items-center justify-center rounded-lg border border-border bg-surface-2 px-6 text-center text-[15px] text-muted-foreground"
    >
      {label}
    </div>
  );
}

export function Notice({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "warning" }) {
  return (
    <div
      className={cn(
        "max-w-[68ch] rounded-md p-4 text-[15px] text-foreground",
        tone === "warning" ? "bg-warning-bg" : "bg-teal-tint",
      )}
    >
      {children}
    </div>
  );
}
