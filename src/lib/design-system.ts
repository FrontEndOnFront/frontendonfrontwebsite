import { cva, type VariantProps } from "class-variance-authority"

// Button variants to replace repeated button styling
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
        cta: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Badge variants to replace repeated badge styling
export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        brand: "bg-blue-600/20 text-blue-400 border-blue-600/30 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Card variants for consistent card styling
export const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground shadow transition-all",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "shadow-lg hover:shadow-xl",
        interactive: "hover:border-blue-600/50 cursor-pointer transform hover:scale-[1.02] transition-all duration-300",
        glass: "bg-gray-900/20 backdrop-blur-sm border-gray-800/50 hover:border-blue-600/50",
        service: "bg-gray-950 border-gray-800 hover:border-blue-600/50 h-full flex flex-col",
        client: "bg-gray-900 border-gray-800 hover:border-blue-600/50 h-full",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
)

// Icon container variants for consistent icon styling
export const iconContainerVariants = cva(
  "flex items-center justify-center rounded-lg",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white",
        secondary: "bg-blue-600/20 text-blue-400",
        outline: "border border-gray-700 bg-gray-800 text-gray-300",
      },
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
        "2xl": "w-20 h-20",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
)

// Section spacing utilities
export const sectionSpacing = {
  y: "py-12 md:py-24 lg:py-32",
  ySmall: "py-8 md:py-12 lg:py-16",
  yLarge: "py-16 md:py-32 lg:py-48",
}

// Container utilities
export const containerClasses = "container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"

// Animation delays for staggered effects
export const animationDelays = {
  none: 0,
  xs: 50,
  sm: 100,
  md: 200,
  lg: 300,
  xl: 400,
  "2xl": 500,
  "3xl": 600,
  "4xl": 700,
}

// Gradient backgrounds
export const gradientBackgrounds = {
  hero: "bg-gradient-to-b from-gray-950 to-gray-900",
  cta: "bg-gradient-to-b from-gray-900 to-gray-950",
  dark: "bg-gray-950",
  darker: "bg-gray-900",
}

export type ButtonVariants = VariantProps<typeof buttonVariants>
export type BadgeVariants = VariantProps<typeof badgeVariants>
export type CardVariants = VariantProps<typeof cardVariants>
export type IconContainerVariants = VariantProps<typeof iconContainerVariants> 