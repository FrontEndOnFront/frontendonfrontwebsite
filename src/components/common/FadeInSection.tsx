"use client"

import { useEffect, useRef, useState } from "react"
import { animationDelays } from "@/lib/design-system"

// Custom hook for intersection observer
function useIntersectionObserver(options = {}): [React.RefObject<HTMLDivElement | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options])

  return [ref, isIntersecting]
}

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: keyof typeof animationDelays;
}

export function FadeInSection({ children, className = "", delay = "none" }: FadeInSectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver()
  const delayValue = animationDelays[delay]

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delayValue}ms` }}
    >
      {children}
    </div>
  )
} 