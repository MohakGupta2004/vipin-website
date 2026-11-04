"use client";

import * as React from "react";
import Link from "next/link";
// hidden until courses live in app: ExternalLink (only used by the browse-all link)
import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { controlBase, controlHeight, focusRing, secondaryButton } from "@/components/forms/styles";
// hidden until courses live in app: appUrl (only used by the browse-all link)
// import { appUrl } from "@/lib/app-links";
import { cn } from "@/lib/utils";

import { catalogueItems, type CatalogueItem } from "./catalogue-items";

export type { CatalogueItem } from "./catalogue-items";

/** Filter chips. One is active at a time. `id` is also the `?area=` URL value. */
const AREAS: { id: string; label: string; test: (i: CatalogueItem) => boolean }[] = [
  { id: "all", label: "All", test: () => true },
  { id: "live-group", label: "Instructor Led", test: (i) => i.type === "live-group" },
  { id: "securities", label: "Securities", test: (i) => i.category === "Securities"},
  { id: "ciro", label: "CIRO", test: (i) => i.category === "CIRO" },
  { id: "mutual-funds", label: "Mutual funds", test: (i) => i.category === "Mutual funds" },
  { id: "insurance", label: "Insurance", test: (i) => i.category === "Insurance" },
  { id: "planning", label: "Wealth & planning", test: (i) => i.category === "Planning & wealth" },
  { id: "professional", label: "Professional", test: (i) => i.category === "Professional" },
  { id: "upcoming", label: "Upcoming", test: (i) => i.type === "upcoming" },
];

const AREA_IDS = new Set(AREAS.map((a) => a.id));

export type CourseCatalogueProps = {
  /** Chip selected on first render. One of the chip ids: all, live-group, securities, mutual-funds, insurance, planning, professional, upcoming. */
  defaultArea?: string;
  /** Show only this many cards until "Show all" is pressed. Omit to show everything. */
  initialLimit?: number;
  showSearch?: boolean;
  /** Heading level used for card titles. Pick the level that follows the section heading. */
  headingLevel?: "h2" | "h3";
  /** DOM id for the section (anchor target). */
  id?: string;
  /** Mirror search and chip into ?q= and ?area= without reloading. Default true. */
  syncUrl?: boolean;
  /** Override the item list (defaults to every course and upcoming programme). */
  items?: CatalogueItem[];
  className?: string;
};

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export function CourseCatalogue({
  defaultArea = "all",
  initialLimit,
  showSearch = true,
  headingLevel = "h3",
  id,
  syncUrl = true,
  items = catalogueItems,
  className,
}: CourseCatalogueProps) {
  const uid = React.useId();
  const startArea = AREA_IDS.has(defaultArea) ? defaultArea : "all";
  const [input, setInput] = React.useState("");
  const [area, setArea] = React.useState(startArea);
  const [expanded, setExpanded] = React.useState(false);
  const query = useDebounced(input, 200).trim().toLowerCase();
  const hydrated = React.useRef(false);

  // Read ?q= and ?area= once after mount. Deferred so server and client markup match on first paint.
  React.useEffect(() => {
    if (!syncUrl) {
      hydrated.current = true;
      return;
    }
    const t = setTimeout(() => {
      const p = new URLSearchParams(window.location.search);
      const q = p.get("q");
      const a = p.get("area");
      if (q) setInput(q);
      if (a && AREA_IDS.has(a)) setArea(a);
      hydrated.current = true;
    }, 0);
    return () => clearTimeout(t);
  }, [syncUrl]);

  // Write state back to the URL. replaceState does not reload or scroll.
  React.useEffect(() => {
    if (!syncUrl || !hydrated.current) return;
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", input.trim());
    else url.searchParams.delete("q");
    if (area !== startArea) url.searchParams.set("area", area);
    else url.searchParams.delete("area");
    const next = `${url.pathname}${url.search}${url.hash}`;
    if (next !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.replaceState(window.history.state, "", next);
    }
  }, [query, area, input, startArea, syncUrl]);

  const areaTest = (AREAS.find((a) => a.id === area) ?? AREAS[0]).test;
  const matchesQuery = (it: CatalogueItem) => !query || it.haystack.includes(query);
  const results = items.filter((it) => matchesQuery(it) && areaTest(it));
  const limited = initialLimit !== undefined && !expanded && results.length > initialLimit;
  const shown = limited ? results.slice(0, initialLimit) : results;
  const chipCount = (test: (i: CatalogueItem) => boolean) => items.filter((it) => matchesQuery(it) && test(it)).length;

  const reset = () => {
    setInput("");
    setArea("all");
  };

  const Heading = headingLevel;
  const filtered = area !== startArea || input !== "";

  return (
    <div id={id} className={cn("scroll-mt-28", className)}>
      {showSearch ? (
        <div className="max-w-md">
          <label htmlFor={`${uid}-search`} className="mb-2 block text-[15px] font-semibold max-sm:sr-only">
            Search courses
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 max-sm:left-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id={`${uid}-search`}
              type="search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setExpanded(false);
              }}
              placeholder="e.g. CIRE or tax"
              autoComplete="off"
              className={cn(controlBase, controlHeight, "pl-9 max-sm:rounded-xl max-sm:border-border max-sm:bg-surface-2 max-sm:pl-10")}
            />
          </div>
        </div>
      ) : null}

      <div role="group" aria-label="Filter courses by area" className={cn(
          "flex flex-wrap gap-2 max-sm:-mx-5 max-sm:snap-x max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:scroll-px-5 max-sm:px-5 max-sm:pb-1 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden",
          showSearch && "mt-5 max-sm:mt-4",
        )}
      >
        {AREAS.map((a) => {
          const pressed = area === a.id;
          return (
            <button
              key={a.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => {
                setArea(a.id);
                setExpanded(false);
              }}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-md border px-4 text-[15px] font-medium transition-colors max-sm:shrink-0 max-sm:snap-start max-sm:rounded-full max-sm:px-3.5 max-sm:whitespace-nowrap max-sm:active:scale-[0.97] max-sm:transition-[transform,background-color,border-color] max-sm:duration-100 motion-reduce:transition-none",
                pressed
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border-strong bg-surface text-foreground hover:bg-accent max-sm:border-border max-sm:bg-surface-2",
                focusRing,
              )}
            >
              {a.label}
              <span className={cn("text-sm tabular-nums", pressed ? "text-primary-foreground" : "text-muted-foreground")}>
                {chipCount(a.test)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-muted-foreground" role="status" aria-live="polite">
        {results.length === 0
          ? "No courses found"
          : limited
            ? `Showing ${shown.length} of ${results.length} courses`
            : `${results.length} ${results.length === 1 ? "course" : "courses"}`}
      </p>

      {shown.length > 0 ? (
        <ul className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {shown.map((it) => (
            <li key={it.key}>
              <article className="group relative flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong max-sm:rounded-2xl max-sm:p-5 max-sm:shadow-xs max-sm:transition-transform max-sm:duration-100 max-sm:active:scale-[0.985] motion-reduce:transform-none has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[15px] font-semibold tabular-nums text-link">{it.code}</p>
                  <p className="text-sm text-muted-foreground">
                    {it.type === "upcoming"
                      ? "Upcoming"
                      : !it.confirmed
                        ? "Register interest"
                        : it.type === "live-group"
                          ? "Live group"
                          : "Exam coaching"}
                  </p>
                </div>
                <Heading className="mt-2 font-sans text-xl max-sm:text-lg max-sm:leading-snug sm:mt-3">
                  <Link
                    href={it.href}
                    className="underline-offset-4 outline-hidden group-hover:underline after:absolute after:inset-0"
                  >
                    {it.name}
                  </Link>
                </Heading>
                <p className="mt-2 line-clamp-2 text-[15px] text-muted-foreground">{it.blurb}</p>
                <p className="mt-auto pt-4 text-sm tabular-nums">
                  {it.exam ?? (
                    <span className="text-muted-foreground">
                      {it.type === "upcoming" ? "Planned. Join the list to hear first." : "Format announced soon"}
                    </span>
                  )}
                </p>
                <p className="mt-3 inline-flex items-center gap-1 text-[15px] font-medium text-link">
                  {it.type === "upcoming" ? "Notify me" : "View course"}{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </p>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 max-w-[60ch] rounded-lg border border-border p-6">
          <Heading className="font-sans text-xl">No courses match your search.</Heading>
          <p className="mt-2 text-[17px] text-muted-foreground">
            Try a different exam code or topic, or reset the search and filters.
          </p>
          <Button type="button" variant="outline" className={cn(secondaryButton, "mt-4")} onClick={reset}>
            Reset search and filters
          </Button>
        </div>
      )}

      {limited ? (
        <Button
          type="button"
          variant="outline"
          className={cn(secondaryButton, "mt-8 max-sm:mt-5 max-sm:w-full max-sm:rounded-xl")}
          onClick={() => setExpanded(true)}
        >
          Show all {results.length} courses
        </Button>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 max-sm:mt-3">
        {/* hidden until courses live in app */}
        {/*
        <a
          href={appUrl("courses", { campaign: "catalogue" })}
          rel="noopener"
          className={cn("inline-flex min-h-11 items-center gap-1.5 rounded-sm text-[15px] font-semibold text-link underline underline-offset-4", focusRing)}
        >
          Browse all courses in the app <ExternalLink className="size-4" aria-hidden="true" />
        </a>
        */}
        {filtered && shown.length > 0 ? (
          <button
            type="button"
            onClick={reset}
            className={cn("min-h-11 rounded-sm text-[15px] font-medium text-muted-foreground underline underline-offset-4 hover:text-link", focusRing)}
          >
            Reset search and filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
