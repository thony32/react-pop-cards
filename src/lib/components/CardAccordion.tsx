import { animated, useSprings } from '@react-spring/web'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CardItem } from './Card'
import { cn } from '../utils/cn'
import { getTextColor, validateData } from '../utils/resolveColor'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardAccordionProps {
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
const DEFAULT_TENSION = 180
const DEFAULT_FRICTION = 22

const COLLAPSED_HEIGHT = 56
const EXPANDED_HEIGHT = 280

// ─── Component ──────────────────────────────────────────────────────

export function CardAccordion({ data, bgColor = DEFAULT_BG_COLOR, isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: Readonly<CardAccordionProps>) {
    const [activeIndex, setActiveIndex] = useState(0)

    const textColor = useMemo(() => getTextColor(bgColor), [bgColor])

    const cornerClass = isRounded ? 'rounded-2xl' : 'rounded-none'

    const [springs, api] = useSprings(data.length, (i) => ({
        height: i === activeIndex ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
        opacity: i === activeIndex ? 1 : 0.7,
        config: { tension, friction }
    }))

    useEffect(() => {
        api.start((i) => ({
            height: i === activeIndex ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
            opacity: i === activeIndex ? 1 : 0.7,
            config: { tension, friction }
        }))
    }, [activeIndex, tension, friction, api])

    const handleClick = useCallback((index: number) => {
        setActiveIndex(index)
    }, [])

    if (!validateData(data, 'CardAccordion')) {
        return <div className="text-red-500 text-sm">Error: CardAccordion requires 2–10 items (received {data.length})</div>
    }

    return (
        <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
            {data.map((item, index) => {
                const spring = springs[index]
                const isActive = index === activeIndex

                return (
                    <animated.div
                        key={item.title}
                        onClick={() => handleClick(index)}
                        style={{
                            height: spring.height,
                            opacity: spring.opacity,
                            backgroundColor: bgColor,
                            color: textColor,
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}
                        className={cn('shadow-lg px-5 duration-100', cornerClass)}
                    >
                        {/* Header bar */}
                        <div className="flex items-center justify-between h-14">
                            <label className="font-bold text-lg capitalize">{item.title}</label>
                            <span className={cn('text-sm duration-200', isActive ? 'rotate-180' : 'rotate-0')}>▼</span>
                        </div>

                        {/* Expanded content */}
                        {isActive && (
                            <div className="pb-4">
                                <div className="flex gap-4 items-start">
                                    {item.image && <img className="w-20 h-20 rounded" src={item.image} alt={item.title} />}
                                    <p className="text-sm text-justify line-clamp-[8] flex-1">{item.description}</p>
                                </div>
                            </div>
                        )}
                    </animated.div>
                )
            })}
        </div>
    )
}
