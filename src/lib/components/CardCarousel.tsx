import { animated, useSprings } from '@react-spring/web'
import chroma from 'chroma-js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CardItem } from './Card'
import { cn } from '../utils/cn'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardCarouselProps {
    /** Array of card items to display */
    data: CardItem[]
    /** Background color of the cards (hex string) */
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
const DEFAULT_TENSION = 170
const DEFAULT_FRICTION = 26

// ─── Component ──────────────────────────────────────────────────────

export function CardCarousel({ data, bgColor = DEFAULT_BG_COLOR, isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: Readonly<CardCarouselProps>) {
    const [activeIndex, setActiveIndex] = useState(0)

    const textColor = useMemo(() => {
        try {
            return chroma(bgColor).luminance() < 0.5 ? '#e5e5e5' : '#1c2531'
        } catch {
            return '#1c2531'
        }
    }, [bgColor])

    const cornerClass = isRounded ? 'rounded-2xl' : 'rounded-none'

    const getProps = useCallback(
        (index: number) => {
            const offset = index - activeIndex
            const absOffset = Math.abs(offset)
            const isCenter = offset === 0

            return {
                translateX: offset * 200,
                scale: isCenter ? 1 : Math.max(0.7, 1 - absOffset * 0.15),
                opacity: isCenter ? 1 : Math.max(0.4, 1 - absOffset * 0.3),
                height: isCenter ? 300 : 220,
                width: isCenter ? 300 : 200,
                zIndex: data.length - absOffset
            }
        },
        [activeIndex, data.length]
    )

    const [springs, api] = useSprings(data.length, (i) => {
        const p = getProps(i)
        return {
            translateX: p.translateX,
            scale: p.scale,
            opacity: p.opacity,
            height: p.height,
            width: p.width,
            config: { tension, friction }
        }
    })

    useEffect(() => {
        api.start((i) => {
            const p = getProps(i)
            return {
                translateX: p.translateX,
                scale: p.scale,
                opacity: p.opacity,
                height: p.height,
                width: p.width,
                config: { tension, friction }
            }
        })
    }, [activeIndex, bgColor, tension, friction, api, getProps])

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1))
    }, [data.length])

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0))
    }, [data.length])

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Carousel track */}
            <div className="relative flex items-center justify-center" style={{ height: 320, width: '100%' }}>
                {data.map((item, index) => {
                    const spring = springs[index]
                    const isActive = index === activeIndex
                    const zIndex = getProps(index).zIndex

                    return (
                        <animated.div
                            key={item.title}
                            onClick={() => setActiveIndex(index)}
                            style={{
                                backgroundColor: bgColor,
                                color: textColor,
                                position: 'absolute',
                                zIndex,
                                width: spring.width,
                                height: spring.height,
                                opacity: spring.opacity,
                                transform: spring.translateX.to((x) => `translateX(${x}px) scale(${spring.scale.get()})`),
                                cursor: 'pointer'
                            }}
                            className={cn('shadow-lg overflow-hidden duration-100', cornerClass)}
                        >
                            <div className="p-5 flex flex-col h-full">
                                <div className="flex justify-between items-start">
                                    <label className={cn('font-bold capitalize duration-100', isActive ? 'text-2xl' : 'text-base')}>{item.title}</label>
                                    {isActive && item.image && <img className="w-14 h-14 rounded" src={item.image} alt={item.title} />}
                                </div>
                                {isActive && <p className="mt-3 text-sm text-justify line-clamp-[7] flex-1">{item.description}</p>}
                            </div>
                        </animated.div>
                    )
                })}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 items-center">
                <button onClick={handlePrev} className="btn btn-sm btn-ghost" aria-label="Previous">
                    ←
                </button>
                {data.map((item, i) => (
                    <button
                        key={item.title}
                        onClick={() => setActiveIndex(i)}
                        className={cn('w-2.5 h-2.5 rounded-full duration-200 cursor-pointer', i === activeIndex ? 'scale-125' : 'opacity-50')}
                        style={{ backgroundColor: bgColor }}
                        aria-label={`Go to ${item.title}`}
                    />
                ))}
                <button onClick={handleNext} className="btn btn-sm btn-ghost" aria-label="Next">
                    →
                </button>
            </div>
        </div>
    )
}
