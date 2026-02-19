import { animated, useSprings } from '@react-spring/web'
import { useEffect, useMemo, useState } from 'react'
import type { CardItem } from './Card'
import { cn } from '../utils/cn'
import { getTextColor, validateData } from '../utils/resolveColor'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardMasonryProps {
    /** Array of 2–10 card items to display */
    data: CardItem[]
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
    bgColor?: string
    /** Whether cards have rounded corners */
    isRounded?: boolean
    /** Spring animation tension */
    tension?: number
    /** Spring animation friction */
    friction?: number
}

// ─── Constants ──────────────────────────────────────────────────────

const DEFAULT_BG_COLOR = '#e5e7eb'
const DEFAULT_TENSION = 200
const DEFAULT_FRICTION = 22

// Staggered heights for masonry effect
const HEIGHTS = [200, 260, 180, 300, 220, 240, 280, 190, 250, 210]
const COLLAPSED_HEIGHT = 70

// ─── Component ──────────────────────────────────────────────────────

export function CardMasonry({ data, bgColor = DEFAULT_BG_COLOR, isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: Readonly<CardMasonryProps>) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [revealed, setRevealed] = useState(false)

    const textColor = useMemo(() => getTextColor(bgColor), [bgColor])
    const cornerClass = isRounded ? 'rounded-2xl' : 'rounded-none'

    // Staggered reveal on mount
    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), 100)
        return () => clearTimeout(timer)
    }, [])

    const [springs, api] = useSprings(data.length, (i) => ({
        from: { opacity: 0, y: 60, scale: 0.8, height: HEIGHTS[i % HEIGHTS.length] },
        to: {
            opacity: revealed ? 1 : 0,
            y: revealed ? 0 : 60,
            scale: activeIndex === i ? 1.05 : 1,
            height: activeIndex === i ? HEIGHTS[i % HEIGHTS.length] : COLLAPSED_HEIGHT
        },
        delay: revealed ? i * 80 : 0,
        config: { tension, friction }
    }))

    useEffect(() => {
        api.start((i) => ({
            opacity: revealed ? 1 : 0,
            y: revealed ? 0 : 60,
            scale: activeIndex === i ? 1.05 : 1,
            height: activeIndex === i ? HEIGHTS[i % HEIGHTS.length] : COLLAPSED_HEIGHT,
            delay: revealed ? i * 80 : 0,
            config: { tension, friction }
        }))
    }, [revealed, activeIndex, tension, friction, api])

    if (!validateData(data, 'CardMasonry')) {
        return <div className="text-red-500 text-sm">Error: CardMasonry requires 2–10 items (received {data.length})</div>
    }

    const cols = data.length <= 4 ? 2 : 3

    return (
        <div className="w-full max-w-2xl mx-auto" style={{ columnCount: cols, columnGap: '0.75rem' }}>
            {data.map((item, index) => {
                const spring = springs[index]
                const isActive = activeIndex === index

                return (
                    <animated.div
                        key={item.title}
                        onClick={() => setActiveIndex(isActive ? null : index)}
                        style={{
                            backgroundColor: bgColor,
                            color: textColor,
                            opacity: spring.opacity,
                            height: spring.height,
                            transform: spring.y.to((y) => `translateY(${y}px) scale(${spring.scale.get()})`),
                            cursor: 'pointer',
                            breakInside: 'avoid' as const,
                            marginBottom: '0.75rem',
                            overflow: 'hidden'
                        }}
                        className={cn('shadow-lg p-4 duration-100', cornerClass)}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-2 mb-2">
                                {item.image && <img className="w-10 h-10 rounded" src={item.image} alt={item.title} />}
                                <label className="font-bold text-lg capitalize">{item.title}</label>
                            </div>
                            <p className={cn('text-sm flex-1', isActive ? 'line-clamp-none' : 'line-clamp-4')}>{item.description}</p>
                            {isActive && <span className="text-xs opacity-50 mt-2">Click to collapse</span>}
                        </div>
                    </animated.div>
                )
            })}
        </div>
    )
}
