"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("border-t border-border", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="m-0 text-[1.125rem] leading-snug">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-sans text-[1.125rem] font-semibold text-heading outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-5 shrink-0 text-muted-foreground group-data-[panel-open]/trigger:hidden"
        />
        <Minus
          aria-hidden="true"
          strokeWidth={1.75}
          className="hidden size-5 shrink-0 text-muted-foreground group-data-[panel-open]/trigger:block"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/** keepMounted so answers stay in the DOM for FAQPage schema and in-page search. */
function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      keepMounted
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-[180ms] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("max-w-[68ch] pb-6 text-[1.0625rem] leading-relaxed", className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
