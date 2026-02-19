import { animated, useSprings } from '@react-spring/web'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CardItem } from './Card'
import { cn } from '../utils/cn'
import { getTextColor, validateData } from '../utils/resolveColor'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardStackProps {
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
const DEFAULT_TENSION = 120
const DEFAULT_FRICTION = 14

const CARD_WIDTH = 280
const CARD_HEIGHT = 320

// ─── Component ──────────────────────────────────────────────────────

export function CardStack({ data, bgColor = DEFAULT_BG_COLOR, isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: Readonly<CardStackProps>) {
    const [activeIndex, setActiveIndex] = useState(0)

    const textColor = useMemo(() => getTextColor(bgColor), [bgColor])

    const cornerClass = isRounded ? 'rounded-2xl' : 'rounded-none'

    const getTransform = useCallback(
        (index: number) => {
            const offset = index - activeIndex
            if (offset === 0) {
                return { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: data.length }
            }
            const direction = offset > 0 ? 1 : -1
            const absOffset = Math.abs(offset)
            return {
                x: direction * absOffset * 40,
                y: -absOffset * 8,
                scale: 1 - absOffset * 0.06,
                rotate: direction * absOffset * 4,
                opacity: Math.max(0.3, 1 - absOffset * 0.25),
                zIndex: data.length - absOffset
            }
        },
        [activeIndex, data.length]
    )

    const [springs, api] = useSprings(data.length, (i) => {
        const t = getTransform(i)
        return {
            x: t.x,
            y: t.y,
            scale: t.scale,
            rotate: t.rotate,
            opacity: t.opacity,
            config: { tension, friction }
        }
    })

    useEffect(() => {
        api.start((i) => {
            const t = getTransform(i)
            return {
                x: t.x,
                y: t.y,
                scale: t.scale,
                rotate: t.rotate,
                opacity: t.opacity,
                config: { tension, friction }
            }
        })
    }, [activeIndex, bgColor, tension, friction, api, getTransform])

    const handleClick = useCallback((index: number) => {
        setActiveIndex(index)
    }, [])

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1))
    }, [data.length])

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0))
    }, [data.length])

    if (!validateData(data, 'CardStack')) {
        return <div className="text-red-500 text-sm">Error: CardStack requires 2–10 items (received {data.length})</div>
    }

    return (
        <div className="flex flex-col items-center gap-8">
            {/* Stack container */}
            <div className="relative" style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
                {data.map((item, index) => {
                    const spring = springs[index]
                    const isActive = index === activeIndex

                    return (
                        <animated.div
                            key={item.title}
                            onClick={() => handleClick(index)}
                            style={{
                                ...spring,
                                backgroundColor: bgColor,
                                color: textColor,
                                position: 'absolute',
                                width: CARD_WIDTH,
                                height: CARD_HEIGHT,
                                zIndex: getTransform(index).zIndex,
                                transform: spring.x.to((x) => `translateX(${x}px) translateY(${spring.y.get()}px) rotate(${spring.rotate.get()}deg) scale(${spring.scale.get()})`),
                                cursor: 'pointer'
                            }}
                            className={cn('shadow-lg px-6 py-4 duration-100', cornerClass)}
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center">
                                    <label className="font-bold text-2xl capitalize">{item.title}</label>
                                    {isActive && item.image && <img className="w-16 h-16 rounded" src={item.image} alt={`${item.title}`} />}
                                </div>
                                {isActive && <p className="mt-3 text-sm text-justify line-clamp-[8]">{item.description}</p>}
                                {!isActive && (
                                    <div className="flex-1 flex items-center justify-center">
                                        <span className="text-sm opacity-65">{item.title}</span>
                                    </div>
                                )}
                            </div>
                        </animated.div>
                    )
                })}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 items-center">
                <button onClick={handlePrev} className="btn btn-sm btn-ghost" aria-label="Previous card">
                    ←
                </button>
                {data.map((item, i) => (
                    <button
                        key={item.title}
                        onClick={() => handleClick(i)}
                        className={cn('w-2.5 h-2.5 rounded-full duration-200 cursor-pointer', i === activeIndex ? 'scale-125' : 'opacity-50')}
                        style={{ backgroundColor: bgColor }}
                        aria-label={`Go to ${item.title}`}
                    />
                ))}
                <button onClick={handleNext} className="btn btn-sm btn-ghost" aria-label="Next card">
                    →
                </button>
            </div>
        </div>
    )
}
