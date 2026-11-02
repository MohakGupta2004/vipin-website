import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-[0.9375rem] leading-none font-semibold whitespace-nowrap transition-colors duration-150 outline-hidden select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Navy primary. */
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        /** The one conversion button per view. */
        cta: "bg-cta text-cta-foreground hover:bg-cta-hover",
        secondary:
          "border-border-strong bg-surface text-heading hover:bg-accent",
        outline:
          "border-border-strong bg-surface text-heading hover:bg-accent",
        ghost: "text-foreground hover:bg-accent",
        destructive:
          "bg-destructive-bg text-destructive hover:bg-destructive-bg/80",
        link: "h-auto px-0 text-link underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-6",
        sm: "h-9 px-4 text-sm pointer-coarse:h-11",
        xs: "h-8 px-3 text-sm pointer-coarse:h-11",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-xs": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
