import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { VipinPhoto } from "@/components/course/vipin-photo";
import { PageSection, PageShell } from "@/components/course/page-shell";
import { FormCard } from "@/components/course/form-card";
import { LeadForm } from "@/components/forms/lead-form";
import { findCohort } from "@/lib/data/batches";
import { getCourse } from "@/lib/data/courses";
import { buildMetadata } from "@/lib/seo";
import { appUrl } from "@/lib/app-links";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact Vipin Garg: Ask About a Course",
  description:
    "Ask Vipin Garg about an exam, a class date or a group enrollment. Share your exam name, target exam date and availability and we will reply by email.",
  path: "/contact",
});

type Props = { searchParams: Promise<{ course?: string | string[]; cohort?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.course) ? sp.course[0] : sp.course;
  const course = raw ? getCourse(raw) : undefined;
  // Originating cohort (from /upcoming-batches) for lead attribution. Only known ids are kept.
  const cohort = findCohort(Array.isArray(sp.cohort) ? sp.cohort[0] : sp.cohort);
  const sourcePath = cohort ? `/upcoming-batches?cohort=${cohort.id}` : "/contact";
  const { email, phone, whatsapp, responseTime } = siteConfig.contact;

  return (
    <PageShell
      crumbs={[{ name: "Contact", href: "/contact" }]}
      title={course ? `Talk to Vipin about the ${course.code}` : "Talk to Vipin"}
      lead="Explore your course, understand the requirements and confirm your coaching arrangements before you enroll."
    >
      <PageSection tone="band">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            {cohort ? (
              <p className="mb-4 inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm text-heading shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
                About: <span className="ml-1 font-semibold">{cohort.title}</span>
              </p>
            ) : null}
            <p className="mb-6 max-w-[60ch] text-[17px] text-muted-foreground">
              Have your examination name, target exam date and availability ready when discussing coaching.
            </p>
            <FormCard>
              <LeadForm kind="contact" courseSlug={course?.slug} sourcePath={sourcePath} />
            </FormCard>
          </div>
          <aside className="min-w-0 lg:col-span-4 lg:col-start-9" aria-label="Contact details">
            <div className="mb-6 flex items-center gap-4">
              <VipinPhoto size={72} />
              <p className="text-[15px]">
                <span className="font-semibold text-heading">Vipin Garg</span>
                <span className="block text-sm text-muted-foreground">Founder &amp; Instructor</span>
              </p>
            </div>
            <h2 className="text-[1.375rem]">Contact details</h2>
            {/* PLACEHOLDER: confirmed contact details shown here — see lib/site-config.ts contact */}
            <ul className="mt-4 divide-y divide-black/[0.06] overflow-hidden rounded-panel bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
              <ContactRow label="Email" value={email} href={`mailto:${email}`} />
              {phone ? <ContactRow label="Phone" value={phone} href={`tel:${phone.replace(/\s/g, "")}`} /> : null}
              {whatsapp ? <ContactRow label="WhatsApp" value="Message on WhatsApp" href={whatsapp} external /> : null}
            </ul>
            {responseTime ? <p className="mt-3 px-1 text-[15px] text-muted-foreground">{responseTime}</p> : null}
            <p className="mt-6 text-sm text-muted-foreground">
              Already a student?{" "}
              <a href={appUrl("login", { campaign: "contact" })} className="text-link underline underline-offset-4">
                Log in to the learning app
              </a>
              .
            </p>
          </aside>
        </div>
      </PageSection>
    </PageShell>
  );
}

/** One row of the grouped contact list: 52px tall, label left, value right, arrow when it leaves the site. */
function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener" : undefined}
        className="group flex min-h-[3.25rem] items-center justify-between gap-4 px-4 py-2 text-[15px] outline-hidden hover:bg-[#fbfbfd] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <span className="shrink-0 text-muted-foreground">{label}</span>
        <span className="flex min-w-0 items-center gap-1 font-medium break-words text-link">
          <span className="min-w-0 break-all text-right">{value}</span>
          {external ? (
            <>
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={2}
                className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </>
          ) : null}
        </span>
      </a>
    </li>
  );
}
