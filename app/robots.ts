import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/seo"

/**
 * AI crawlers we explicitly welcome. Each one is named in its own group so
 * audit tools (and the bots themselves) see an unambiguous "Allow: /" instead
 * of relying on the `*` wildcard, which many scanners report as "partial".
 */
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini / Vertex AI training token)
  "Google-Extended",
  "GoogleOther",
  // Apple (Apple Intelligence training token)
  "Applebot",
  "Applebot-Extended",
  // Amazon
  "Amazonbot",
  // Meta
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  // Mistral
  "MistralAI-User",
  // Common Crawl (open LLM training corpus)
  "CCBot",
  // ByteDance
  "Bytespider",
  // Others
  "cohere-ai",
  "cohere-training-data-crawler",
  "DuckAssistBot",
  "YouBot",
  "Diffbot",
  "AI2Bot",
  "PetalBot",
  "Timpibot",
]

const SEARCH_ENGINES = ["Googlebot", "Bingbot", "DuckDuckBot", "Slurp", "YandexBot"]

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production"
  const host = new URL(SITE_URL).hostname
  const isStaging = /(^|\.)(staging|stage|preview|dev)\./.test(host) || host.endsWith(".vercel.app")

  if (!isProd || isStaging) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
      ...SEARCH_ENGINES.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
