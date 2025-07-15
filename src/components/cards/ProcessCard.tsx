import { Card } from "@/components/ui/card"
import { cardVariants, iconContainerVariants } from "@/lib/design-system"
import { cn } from "@/lib/utils"

interface ProcessCardProps {
  step: number
  title: string
  description: string
  className?: string
}

export function ProcessCard({ step, title, description, className }: ProcessCardProps) {
  return (
    <Card className={cn(cardVariants({ variant: "glass", padding: "md" }), "h-[200px] rounded-2xl", className)}>
      <div className="flex flex-col h-full">
        <div className={cn(iconContainerVariants({ variant: "primary", size: "md" }), "mb-4 rounded-full text-white font-medium text-base")}>
          {step}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </Card>
  )
} 