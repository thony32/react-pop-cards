import { animated, useSprings } from '@react-spring/web'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CardItem } from './Card'
import { cn } from '../utils/cn'
import { getTextColor, validateData } from '../utils/resolveColor'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardWaveProps {
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
const DEFAULT_TENSION = 170
const DEFAULT_FRICTION = 14

const WAVE_AMPLITUDE = 40
const CARD_WIDTH = 120
const ACTIVE_CARD_WIDTH = 220
const CARD_HEIGHT = 160
const ACTIVE_CARD_HEIGHT = 240

// ─── Component ──────────────────────────────────────────────────────

export function CardWave({ data, bgColor = DEFAULT_BG_COLOR, isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: Readonly<CardWaveProps>) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [wavePhase, setWavePhase] = useState(0)

    const textColor = useMemo(() => getTextColor(bgColor), [bgColor])
    const cornerClass = isRounded ? 'rounded-2xl' : 'rounded-none'

    const getWavePos = useCallback(
        (index: number) => {
            const isActive = index === activeIndex
            const waveY = Math.sin((index / data.length) * Math.PI * 2 + wavePhase) * WAVE_AMPLITUDE

            return {
                y: isActive ? -20 : waveY,
                width: isActive ? ACTIVE_CARD_WIDTH : CARD_WIDTH,
                height: isActive ? ACTIVE_CARD_HEIGHT : CARD_HEIGHT,
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.7,
                rotate: isActive ? 0 : Math.sin((index + wavePhase) * 0.5) * 5
            }
        },
        [activeIndex, data.length, wavePhase]
    )

    const [springs, api] = useSprings(data.length, (i) => {
        const pos = getWavePos(i)
        return {
            y: pos.y,
            width: pos.width,
            height: pos.height,
            scale: pos.scale,
            opacity: pos.opacity,
            rotate: pos.rotate,
            config: { tension, friction }
        }
    })

    useEffect(() => {
        api.start((i) => {
            const pos = getWavePos(i)
            return {
                y: pos.y,
                width: pos.width,
                height: pos.height,
                scale: pos.scale,
                opacity: pos.opacity,
                rotate: pos.rotate,
                config: { tension, friction }
            }
        })
    }, [activeIndex, wavePhase, tension, friction, api, getWavePos])

    const handleClick = useCallback((index: number) => {
        setActiveIndex(index)
        setWavePhase((prev) => prev + Math.PI / 3) // Ripple wave on click
    }, [])

    if (!validateData(data, 'CardWave')) {
        return <div className="text-red-500 text-sm">Error: CardWave requires 2–10 items (received {data.length})</div>
    }

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap" style={{ minHeight: ACTIVE_CARD_HEIGHT + WAVE_AMPLITUDE * 2 + 40 }}>
            {data.map((item, index) => {
                const spring = springs[index]
                const isActive = index === activeIndex

                return (
                    <animated.div
                        key={item.title}
                        onClick={() => handleClick(index)}
                        style={{
                            backgroundColor: bgColor,
                            color: textColor,
                            width: spring.width,
                            height: spring.height,
                            opacity: spring.opacity,
                            transform: spring.y.to((y) => `translateY(${y}px) scale(${spring.scale.get()}) rotate(${spring.rotate.get()}deg)`),
                            cursor: 'pointer'
                        }}
                        className={cn('shadow-lg p-4 overflow-hidden duration-100 shrink-0', cornerClass)}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-2">
                                {item.image && <img className={cn('rounded', isActive ? 'w-12 h-12' : 'w-8 h-8')} src={item.image} alt={item.title} />}
                                <label className={cn('font-bold capitalize', isActive ? 'text-xl' : 'text-sm')}>{item.title}</label>
                            </div>
                            {isActive && <p className="text-sm line-clamp-5 mt-2 flex-1">{item.description}</p>}
                            {!isActive && <p className="text-xs opacity-60 mt-1 line-clamp-2">{item.description}</p>}
                        </div>
                    </animated.div>
                )
            })}
        </div>
    )
}
