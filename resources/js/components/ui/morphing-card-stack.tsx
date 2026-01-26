"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Grid3X3, Layers, LayoutList, ExternalLink } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
  timeline?: string
  teamSize?: string
  tech?: string[]
  projectUrl?: string
  image?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

const SWIPE_THRESHOLD = 50

export function Component({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      // Swiped left - go to next card
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      // Swiped right - go to previous card
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse() // Reverse so top card renders last (on top)
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        }
      case "grid":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
    }
  }

  const containerStyles = {
    stack: "relative h-64 w-64",
    grid: "grid grid-cols-2 gap-3",
    list: "flex flex-col gap-3",
  }

  const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn("space-y-4", className)}>
      {/* Layout Toggle */}
      <div className="flex items-center justify-center gap-1 rounded-lg bg-secondary/50 p-1 w-fit mx-auto">
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode]
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={cn(
                "rounded-md p-2 transition-all",
                layout === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Cards Container */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], "mx-auto")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition)
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === "stack" && card.stackPosition === 0

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isExpanded ? 1.05 : 1,
                    x: 0,
                    ...styles,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return
                    if (card.projectUrl) {
                      window.location.href = card.projectUrl
                    } else {
                      setExpandedCard(isExpanded ? null : card.id)
                      onCardClick?.(card)
                    }
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl border border-border bg-card overflow-hidden",
                    "hover:border-primary/50 transition-colors",
                    layout === "stack" && "absolute w-56 h-48",
                    layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full aspect-square",
                    layout === "list" && "w-full h-48",
                    isExpanded && "ring-2 ring-primary",
                  )}
                  style={{
                    backgroundColor: card.color || undefined,
                  }}
                >
                  {/* Image Background */}
                  {card.image && (
                    <div className="absolute inset-0">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className={cn(
                    "relative p-4 flex flex-col justify-between h-full",
                    card.image && "bg-gradient-to-t from-black/80 to-transparent"
                  )}>
                    <div className="flex items-start gap-3">
                      {card.icon && (
                        <div className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          card.image ? "bg-white/20 text-white" : "bg-secondary text-foreground"
                        )}>
                          {card.icon}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className={cn(
                          "font-semibold truncate",
                          card.image ? "text-white" : "text-card-foreground"
                        )}>{card.title}</h3>
                        <p
                          className={cn(
                            "text-sm mt-1",
                            layout === "stack" && "line-clamp-1",
                            layout === "grid" && "line-clamp-2",
                            layout === "list" && "line-clamp-1",
                            card.image ? "text-white/90" : "text-muted-foreground"
                          )}
                        >
                          {card.description}
                        </p>
                        
                        {/* Project Stats */}
                        {(card.timeline || card.teamSize) && (
                          <div className="flex items-center gap-3 mt-2 text-xs">
                            {card.timeline && (
                              <span className={cn(
                                "flex items-center gap-1",
                                card.image ? "text-white/80" : "text-muted-foreground"
                              )}>
                                <span className="w-2 h-2 rounded-full bg-primary/80"></span>
                                {card.timeline}
                              </span>
                            )}
                            {card.teamSize && (
                              <span className={cn(
                                "flex items-center gap-1",
                                card.image ? "text-white/80" : "text-muted-foreground"
                              )}>
                                <span className="w-2 h-2 rounded-full bg-primary/80"></span>
                                {card.teamSize}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Technology Badges */}
                        {card.tech && card.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {card.tech.slice(0, layout === "stack" ? 2 : 3).map((tech, index) => (
                              <span
                                key={index}
                                className={cn(
                                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs border",
                                  card.image 
                                    ? "bg-white/20 text-white border-white/30" 
                                    : "bg-primary/10 text-primary border-primary/20"
                                )}
                              >
                                {tech}
                              </span>
                            ))}
                            {card.tech.length > (layout === "stack" ? 2 : 3) && (
                              <span className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded-full text-xs",
                                card.image 
                                  ? "bg-white/10 text-white/70" 
                                  : "bg-muted text-muted-foreground"
                              )}>
                                +{card.tech.length - (layout === "stack" ? 2 : 3)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* View Project CTA */}
                    {card.projectUrl && (
                      <div className="flex items-center justify-center">
                        <span className={cn(
                          "text-xs font-medium flex items-center gap-1 px-3 py-1 rounded-full border transition-all",
                          card.image 
                            ? "bg-white/20 text-white border-white/30 hover:bg-white/30" 
                            : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                        )}>
                          View Project
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </div>
                    )}
                  </div>

                  {isTopCard && (
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-xs text-muted-foreground/50">Swipe to navigate</span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
