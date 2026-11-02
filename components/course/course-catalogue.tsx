"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/forms/fields";
import { controlBase, controlHeight, secondaryButton, textLink } from "@/components/forms/styles";
import { cn } from "@/lib/utils";

export type CatalogueItem = {
  key: string;
  kind: "course" | "upcoming";
  code: string;
  name: string;
  blurb: string;
  href: string;
  area: "securities" | "insurance" | "financial-planning" | null;
  type: "live-group" | "coaching" | "upcoming";
  exam: string | null;
  confirmed: boolean;
  /** Lowercased text used for search. */
  haystack: string;
};

const AREAS = [
  { value: "securities", label: "Securities & CIRO" },
  { value: "insurance", label: "Insurance" },
  { value: "financial-planning", label: "Financial planning" },
] as const;

const TYPES = [
  { value: "live-group", label: "Live group classes" },
  { value: "coaching", label: "Exam coaching" },
  { value: "upcoming", label: "Upcoming" },
] as const;

function toggle(list: string[], v: string): string[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export function CourseCatalogue({ items }: { items: CatalogueItem[] }) {
  const uid = React.useId();
  const [query, setQuery] = React.useState("");
  const [areas, setAreas] = React.useState<string[]>([]);
  const [types, setTypes] = React.useState<string[]>([]);

  const q = query.trim().toLowerCase();
  const matches = (it: CatalogueItem, ignore?: "area" | "type") =>
    (!q || it.haystack.includes(q)) &&
    (ignore === "area" || areas.length === 0 || (it.area !== null && areas.includes(it.area))) &&
    (ignore === "type" || types.length === 0 || types.includes(it.type));

  const results = items.filter((it) => matches(it));
  const count = (kind: "area" | "type", v: string) =>
    items.filter((it) => matches(it, kind) && (kind === "area" ? it.area === v : it.type === v)).length;

  const active = areas.length + types.length + (q ? 1 : 0);
  const clear = () => {
    setQuery("");
    setAreas([]);
    setTypes([]);
  };

  const filters = (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-2 text-[15px] font-semibold">Study area</legend>
        {AREAS.map((a) => (
          <label key={a.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-sm px-1 text-[15px] hover:bg-accent">
            <Checkbox
              id={`${uid}-a-${a.value}`}
              name={`area-${a.value}`}
              checked={areas.includes(a.value)}
              onChange={() => setAreas((l) => toggle(l, a.value))}
            />
            <span className="flex-1">{a.label}</span>
            <span className="tabular-nums text-sm text-muted-foreground">{count("area", a.value)}</span>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-[15px] font-semibold">Format</legend>
        {TYPES.map((t) => (
          <label key={t.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-sm px-1 text-[15px] hover:bg-accent">
            <Checkbox
              id={`${uid}-t-${t.value}`}
              name={`type-${t.value}`}
              checked={types.includes(t.value)}
              onChange={() => setTypes((l) => toggle(l, t.value))}
            />
            <span className="flex-1">{t.label}</span>
            <span className="tabular-nums text-sm text-muted-foreground">{count("type", t.value)}</span>
          </label>
        ))}
      </fieldset>
      {active > 0 ? (
        <button type="button" onClick={clear} className={textLink}>
          Clear filters
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-3">
        <label htmlFor={`${uid}-search`} className="mb-2 block text-[15px] font-semibold">
          Search courses
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id={`${uid}-search`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. CIRE or tax"
            className={cn(controlBase, controlHeight, "pl-9")}
          />
        </div>

        {/* Mobile: filters collapse into a disclosure. Desktop: always visible rail. */}
        <details className="group mt-4 rounded-md border border-border lg:hidden">
          <summary className="flex min-h-11 cursor-pointer items-center justify-between px-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
            Filters{active > 0 ? ` (${active})` : ""}
            <span aria-hidden="true" className="text-muted-foreground group-open:hidden">+</span>
            <span aria-hidden="true" className="hidden text-muted-foreground group-open:inline">−</span>
          </summary>
          <div className="border-t border-border p-4">{filters}</div>
        </details>
        <div className="mt-8 hidden lg:block">{filters}</div>
      </div>

      <div className="lg:col-span-9">
        <p className="text-sm text-muted-foreground" aria-live="polite" role="status">
          {results.length} {results.length === 1 ? "course" : "courses"}
        </p>
        {results.length > 0 ? (
          <ul className="mt-4 grid gap-6 sm:grid-cols-2">
            {results.map((it) => (
              <li key={it.key}>
                <article className="group relative flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring">
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
                  <h3 className="mt-3 font-sans text-xl">
                    <Link href={it.href} className="underline-offset-4 outline-none group-hover:underline after:absolute after:inset-0">
                      {it.name}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[15px] text-muted-foreground">{it.blurb}</p>
                  <p className="mt-auto pt-4 text-sm tabular-nums">
                    {it.exam ?? <span className="text-muted-foreground">{it.type === "upcoming" ? "Planned. Join the list to hear first." : "Format announced soon"}</span>}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1 text-[15px] font-medium text-link">
                    {it.type === "upcoming" ? "Notify me" : "View course"} <ArrowRight className="size-4" aria-hidden="true" />
                  </p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 max-w-[60ch] rounded-lg border border-border p-6">
            <h3 className="font-sans">No courses match those filters.</h3>
            <p className="mt-2 text-[17px] text-muted-foreground">
              Try a different exam code or topic, or clear the filters.
            </p>
            <Button type="button" variant="outline" className={cn(secondaryButton, "mt-4")} onClick={clear}>
              Clear filters
            </Button>
          </div>
        )}
        <p className="mt-10 text-sm text-muted-foreground">
          Not sure which exam you need? <Link href="/find-my-course" className="text-link underline underline-offset-4">Use the course finder</Link>.
        </p>
      </div>
    </div>
  );
}
