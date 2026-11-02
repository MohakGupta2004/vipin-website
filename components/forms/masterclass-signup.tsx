import { LeadForm } from "./lead-form";
import { isEnabled } from "@/lib/feature-flags";

/** Masterclass registration form. Renders nothing when `masterclassSignup` is off in config/feature-flags.json. */
export function MasterclassSignup({
  courseSlug,
  sourcePath,
  className,
}: {
  courseSlug?: string;
  sourcePath?: string;
  className?: string;
}) {
  if (!isEnabled("masterclassSignup")) return null;
  return <LeadForm kind="masterclass" courseSlug={courseSlug} sourcePath={sourcePath} className={className} />;
}
