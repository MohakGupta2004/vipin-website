import type { Metadata } from "next";

import { VipinPhoto } from "@/components/course/vipin-photo";
import { PageSection, PageShell } from "@/components/course/page-shell";
import { LeadForm } from "@/components/forms/lead-form";
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

type Props = { searchParams: Promise<{ course?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.course) ? sp.course[0] : sp.course;
  const course = raw ? getCourse(raw) : undefined;
  const { email, phone, whatsapp, responseTime } = siteConfig.contact;

  return (
    <PageShell
      crumbs={[{ name: "Contact", href: "/contact" }]}
      title={course ? `Talk to Vipin about the ${course.code}` : "Talk to Vipin"}
      lead="Explore your course, understand the requirements and confirm your coaching arrangements before you enroll."
    >
      <PageSection>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-6 max-w-[60ch] text-[17px] text-muted-foreground">
              Have your examination name, target exam date and availability ready when discussing coaching.
            </p>
            <LeadForm kind="contact" courseSlug={course?.slug} sourcePath="/contact" />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-label="Contact details">
            <div className="mb-6 flex items-center gap-4">
              <VipinPhoto size={72} />
              <p className="text-[15px]">
                <span className="font-semibold text-heading">Vipin Garg</span>
                <span className="block text-sm text-muted-foreground">Founder &amp; Instructor</span>
              </p>
            </div>
            <h2 className="font-sans text-xl">Contact details</h2>
            {/* PLACEHOLDER: confirmed contact details shown here — see lib/site-config.ts contact */}
            <dl className="mt-4 space-y-3 text-[15px]">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${email}`} className="text-link underline underline-offset-4">
                    {email}
                  </a>
                </dd>
              </div>
              {phone ? (
                <div>
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-link underline underline-offset-4">
                      {phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {whatsapp ? (
                <div>
                  <dt className="text-muted-foreground">WhatsApp</dt>
                  <dd>
                    <a href={whatsapp} className="text-link underline underline-offset-4">
                      Message on WhatsApp
                    </a>
                  </dd>
                </div>
              ) : null}
              {responseTime ? <p className="text-muted-foreground">{responseTime}</p> : null}
            </dl>
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
