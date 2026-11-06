import { Notice, PageShell } from "./page-shell";
import { formatReviewed } from "./format";
import { siteConfig } from "@/lib/site-config";

export type LegalSection = { heading: string; body: React.ReactNode };

/** Plain legal-text frame. Shows a draft notice until `siteConfig.legalReviewed` is true. */
export function LegalPage({
  path,
  title,
  lead,
  sections,
  updated,
}: {
  path: string;
  title: string;
  lead: string;
  sections: LegalSection[];
  updated: string;
}) {
  return (
    <PageShell crumbs={[{ name: title, href: path }]} title={title} lead={lead} prose>
      <div className="max-w-[68ch] pb-20 sm:pb-28">
        {!siteConfig.legalReviewed ? (
          <div className="mb-10">
            <Notice tone="warning">
              <strong>Draft.</strong> This page has not been reviewed by a lawyer yet and may change before launch.
            </Notice>
          </div>
        ) : null}
        <div className="space-y-12 border-t border-black/[0.08] pt-10 sm:space-y-14">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[1.5rem] leading-[1.2] tracking-[-0.02em] text-balance sm:text-[1.75rem]">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-[17px] leading-[1.65]">{s.body}</div>
            </section>
          ))}
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          Last updated <time dateTime={updated}>{formatReviewed(updated)}</time>.
        </p>
      </div>
    </PageShell>
  );
}
