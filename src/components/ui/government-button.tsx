import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-saffron hover:shadow-elegant hover:scale-105 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground shadow hover:shadow-lg",
        outline: "border border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-saffron",
        secondary: "bg-secondary text-secondary-foreground shadow hover:shadow-lg hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Government specific variants
        saffron: "bg-gradient-saffron text-foreground shadow-saffron hover:shadow-elegant hover:scale-105 font-semibold",
        navy: "bg-accent text-accent-foreground shadow-elegant hover:shadow-gold hover:scale-105",
        gold: "bg-gradient-gold text-gold-foreground shadow-gold hover:shadow-elegant hover:scale-105 font-semibold",
        success: "bg-secondary text-secondary-foreground shadow hover:shadow-lg hover:scale-105",
        info: "bg-info text-info-foreground shadow hover:shadow-lg hover:scale-105"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const GovButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GovButton.displayName = "GovButton"

export { GovButton, buttonVariants }