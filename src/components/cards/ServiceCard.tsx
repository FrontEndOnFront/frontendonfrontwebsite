import { Card, CardContent } from "@/components/ui/card"
import { cardVariants, iconContainerVariants } from "@/lib/design-system"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function ServiceCard({ icon: Icon, title, description, className }: ServiceCardProps) {
  return (
    <Card className={cn(cardVariants({ variant: "service", padding: "md" }), className)}>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className={cn(iconContainerVariants({ variant: "primary", size: "lg" }), "mx-auto")}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold text-white text-center">{title}</h3>
        <p className="text-gray-400 text-center flex-1">{description}</p>
      </CardContent>
    </Card>
  )
} 