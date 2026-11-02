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
      <div className="pb-16 lg:pb-24">
        {!siteConfig.legalReviewed ? (
          <div className="mb-10">
            <Notice tone="warning">
              <strong>Draft.</strong> This page has not been reviewed by a lawyer yet and may change before launch.
            </Notice>
          </div>
        ) : null}
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-sans text-xl">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-[17px]">{s.body}</div>
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
