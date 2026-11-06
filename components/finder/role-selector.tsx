"use client";

import * as React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { OptionList, OptionRow } from "@/components/finder/option-list";
import { ArrowLink } from "@/components/ui/arrow-link";
import { primaryButton } from "@/components/forms/styles";
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
        <legend className="mb-4 font-heading text-xl font-semibold tracking-[-0.02em] text-heading">I want to be a…</legend>
        <div role="radiogroup">
          <OptionList>
            {rolePathways.map((r) => (
              <OptionRow
                key={r.id}
                id={`${uid}-${r.id}`}
                name={`${uid}-role`}
                value={r.id}
                label={r.label}
                checked={roleId === r.id}
                onChange={() => setRoleId(r.id)}
              />
            ))}
          </OptionList>
        </div>
      </fieldset>

      <div className="lg:col-span-6" aria-live="polite">
        {role && primary ? (
          <div className="rounded-panel bg-white p-5 shadow-[0_0_0_1px_rgb(0_0_0/0.06)] sm:rounded-section sm:p-7">
            <h3 className="font-heading tracking-[-0.02em]">Start with the {primary.code}</h3>
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
            <div className="mt-5 flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href={primary.route} className={cn(buttonVariants(), primaryButton, "max-sm:w-full")}>
                See {primary.code} course
              </Link>
              <ArrowLink href={role.officialUrl} className="max-sm:mt-2">
                Official requirements
              </ArrowLink>
            </div>
          </div>
        ) : (
          <p className="rounded-panel bg-[#f5f5f7] p-5 text-[15px] text-muted-foreground sm:rounded-section sm:p-7">
            Choose a role to see which exam to start with.
          </p>
        )}
      </div>
    </div>
  );
}
