"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { primaryButton, textLink } from "@/components/forms/styles";
import { getCourse } from "@/lib/data/courses";
import { rolePathways, type RoleId } from "@/lib/data/pathways";
import { cn } from "@/lib/utils";

/** "I want to be a…" selector for /licensing-pathways. Native radios, arrow keys work. */
export function RoleSelector() {
  const uid = React.useId();
  const [roleId, setRoleId] = React.useState<RoleId | null>(null);
  const role = rolePathways.find((r) => r.id === roleId);
  const primary = role ? getCourse(role.primary) : undefined;
  const others = role ? role.alsoConsider.map((s) => getCourse(s)).filter((c) => !!c) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <fieldset className="lg:col-span-6">
        <legend className="mb-3 text-lg font-semibold text-heading">I want to be a…</legend>
        <div role="radiogroup" className="grid gap-2">
          {rolePathways.map((r) => {
            const id = `${uid}-${r.id}`;
            return (
              <label
                key={r.id}
                htmlFor={id}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl bg-surface px-4 py-2.5 text-[15px] text-heading shadow-[0_0_0_1px_rgb(0_0_0/0.1)] transition-[box-shadow,background-color,transform] duration-200 ease-out hover:shadow-[0_0_0_1px_rgb(0_0_0/0.22)] active:scale-[0.985] motion-reduce:transition-none has-checked:bg-accent/50 has-checked:shadow-[0_0_0_2px_var(--primary)] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
              >
                <input
                  id={id}
                  type="radio"
                  name={`${uid}-role`}
                  checked={roleId === r.id}
                  onChange={() => setRoleId(r.id)}
                  className="size-5 shrink-0 appearance-none rounded-full border border-border-strong bg-surface checked:border-primary checked:bg-primary checked:shadow-[inset_0_0_0_4px_var(--surface)]"
                />
                {r.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="lg:col-span-6" aria-live="polite">
        {role && primary ? (
          <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
            <h3>Start with the {primary.code}</h3>
            <p className="mt-2 text-[17px]">{role.explanation}</p>
            <p className="mt-3 text-sm text-muted-foreground">{role.caveat}</p>
            {others.length > 0 ? (
              <p className="mt-3 text-[15px]">
                Also on this route:{" "}
                {others.map((c, i) => (
                  <React.Fragment key={c!.slug}>
                    {i > 0 ? ", " : null}
                    <Link href={c!.route} className="font-medium text-link underline underline-offset-4">
                      {c!.code}
                    </Link>
                  </React.Fragment>
                ))}
              </p>
            ) : null}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
              <Link href={primary.route} className={cn(buttonVariants(), primaryButton)}>
                See {primary.code} course
              </Link>
              <a href={role.officialUrl} target="_blank" rel="noopener" className={textLink}>
                Official requirements <ArrowRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        ) : (
          <p className="rounded-[1.75rem] bg-[#f5f5f7] p-7 text-[15px] text-muted-foreground">
            Choose a role to see which exam to start with.
          </p>
        )}
      </div>
    </div>
  );
}
