import type { Metadata } from "next";
import Link from "next/link";
import { PageSection, PageShell } from "@/components/course/page-shell";
import { ArrowUpRight } from "lucide-react";

import { ctaButton } from "@/components/forms/styles";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const g = siteConfig.guarantee;

// Placeholder page until the client approves written terms.
export const metadata: Metadata = {
  ...buildMetadata({
    title: g ? g.headline : "Guarantee and Terms Before You Pay",
    description:
      "Confirm class dates, fees, materials, support and cancellation terms with Vipin Garg before you pay. Guarantee terms are published here once approved.",
    path: "/guarantee",
    noindex: !g,
  }),
};

const confirm = [
  "Class dates, time zone and session length",
  "Total coaching fee and payment arrangements",
  "Materials and resources available for your course",
  "Support, access and cancellation terms",
  "Separate official course or examination fees",
];

export default function GuaranteePage() {
  return (
    <PageShell
      crumbs={[{ name: "Guarantee", href: "/guarantee" }]}
      title={g ? g.headline : "Know the terms before you pay."}
      lead={g ? g.summary : "No guarantee terms are published yet. Until they are, confirm everything below in writing before you pay."}
    >
      <PageSection>
        {/* PLACEHOLDER: client must approve guarantee terms — set siteConfig.guarantee { headline, summary, terms[] } */}
        {g ? (
          <ol className="max-w-[68ch] list-decimal space-y-3 pl-6 text-[17px]">
            {g.terms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        ) : (
          <div className="max-w-[68ch]">
            <h2 className="text-[1.375rem]">Confirm these details before payment</h2>
            <ul className="mt-4 divide-y divide-black/[0.06] overflow-hidden rounded-panel shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
              {confirm.map((c) => (
                <li key={c} className="px-5 py-4 text-[17px]">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Browsing this website does not enroll you or create a payment obligation.
            </p>
            <Link href="/contact" className={cn(ctaButton, "group mt-6 inline-flex items-center justify-center gap-1.5 max-sm:w-full")}>
              Ask Vipin a question
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={2}
                className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </Link>
          </div>
        )}
      </PageSection>
    </PageShell>
  );
}
