import { cardVariants } from "@/lib/design-system"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ClientCardProps {
  name: string
  description: string
  logoSrc: string
  logoAlt: string
  logoWidth?: number
  logoHeight?: number
  className?: string
}

export function ClientCard({ 
  name, 
  description, 
  logoSrc, 
  logoAlt, 
  logoWidth = 120, 
  logoHeight = 40,
  className 
}: ClientCardProps) {
  return (
    <div className={cn(
      cardVariants({ variant: "client", padding: "md" }),
      "flex flex-col items-center space-y-4 min-h-[400px]",
      className
    )}>
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center p-4">
        <Image
          src={logoSrc}
          width={logoWidth}
          height={logoHeight}
          alt={logoAlt}
          className="object-contain"
        />
      </div>
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-gray-400 text-center flex-1">{description}</p>
    </div>
  )
} 