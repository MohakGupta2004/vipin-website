"use client";

import * as React from "react";
import { Check, TriangleAlert, X } from "lucide-react";

import { llqpModules, llqpRegions, type LlqpRegion } from "@/lib/data/pathways";
import { cn } from "@/lib/utils";

/** Common Law | Quebec toggle above the module matrix (PLAN §3, DESIGN §8.3). */
export function LlqpRegionMatrix() {
  const uid = React.useId();
  const [regionId, setRegionId] = React.useState<LlqpRegion["id"]>("common-law");
  const region = llqpRegions.find((r) => r.id === regionId) ?? llqpRegions[0];

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Licensing region"
        className="inline-grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border-strong bg-border-strong"
      >
        {llqpRegions.map((r) => {
          const id = `${uid}-${r.id}`;
          return (
            <label
              key={r.id}
              htmlFor={id}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-center px-5 text-sm font-semibold",
                regionId === r.id ? "bg-primary text-primary-foreground" : "bg-surface hover:bg-accent",
                "has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-ring",
              )}
            >
              <input
                id={id}
                type="radio"
                name={`${uid}-region`}
                checked={regionId === r.id}
                onChange={() => setRegionId(r.id)}
                className="sr-only"
              />
              {r.id === "common-law" ? "Common Law" : "Quebec"}
            </label>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {region.label}
      </p>

      {region.offered ? (
        <p className="mt-1 max-w-[68ch] text-[17px]">{region.note}</p>
      ) : (
        <div className="mt-3 flex max-w-[68ch] items-start gap-2 rounded-md bg-warning-bg p-4 text-[15px] text-foreground">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
          <p>
            We don’t offer the Quebec (Civil Code) LLQP yet.{" "}
            <a href="#register-interest" className="font-medium text-link underline underline-offset-4">
              Tell me when it’s available
            </a>
          </p>
        </div>
      )}

      <table className="mt-6 w-full border-collapse text-[15px]">
        <caption className="sr-only">LLQP modules and whether live preparation covers them for {region.label}</caption>
        <thead>
          <tr className="bg-surface-2 text-left">
            <th scope="col" className="px-3 py-3 font-semibold">Module</th>
            <th scope="col" className="hidden px-3 py-3 font-semibold sm:table-cell">What it covers</th>
            <th scope="col" className="px-3 py-3 font-semibold">Live preparation</th>
          </tr>
        </thead>
        <tbody>
          {llqpModules.map((m) => (
            <tr key={m.id} className="border-b border-border">
              <th scope="row" className="px-3 py-3 text-left align-top font-medium">{m.name}</th>
              <td className="hidden px-3 py-3 align-top text-muted-foreground sm:table-cell">{m.summary}</td>
              <td className="px-3 py-3 align-top">
                {region.offered ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="size-4 text-success" aria-hidden="true" /> Included
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <X className="size-4" aria-hidden="true" /> Not offered yet
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
