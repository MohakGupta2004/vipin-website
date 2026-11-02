import { siteConfig } from "@/lib/site-config";

export type AppLinkKind = "base" | "signup" | "login" | "courses";

export type AppLinkOptions = {
  /** Where on this site the link sits, e.g. "header", "hero", "course-cire", "footer". Becomes utm_campaign. */
  campaign: string;
  /** Optional detail, e.g. "primary-button". Becomes utm_content. */
  content?: string;
};

/** Site host used as utm_source, taken from siteConfig.url. */
const SOURCE = new URL(siteConfig.url).hostname.replace(/^www\./, "");

/**
 * Link into the learning app with UTM params:
 * `utm_source=<this site>&utm_medium=website&utm_campaign=<campaign>[&utm_content=<content>]`.
 * Pure and safe in server and client components.
 */
export function appUrl(kind: AppLinkKind, { campaign, content }: AppLinkOptions): string {
  const u = new URL(siteConfig.app[kind]);
  u.searchParams.set("utm_source", SOURCE);
  u.searchParams.set("utm_medium", "website");
  u.searchParams.set("utm_campaign", campaign);
  if (content) u.searchParams.set("utm_content", content);
  return u.toString();
}
