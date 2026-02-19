import { animated, useSprings } from '@react-spring/web'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CardItem } from './Card'
import { cn } from '../utils/cn'
import { getTextColor, validateData } from '../utils/resolveColor'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardSpiralProps {
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
const DEFAULT_TENSION = 150
const DEFAULT_FRICTION = 20

const CONTAINER_SIZE = 520
const CARD_SIZE = 130
const ACTIVE_CARD_SIZE = 210

// ─── Component ──────────────────────────────────────────────────────

export function CardSpiral({ data, bgColor = DEFAULT_BG_COLOR, isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: Readonly<CardSpiralProps>) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [rotation, setRotation] = useState(0)

    const textColor = useMemo(() => getTextColor(bgColor), [bgColor])
    const cornerClass = isRounded ? 'rounded-2xl' : 'rounded-none'

    const getSpiralPos = useCallback(
        (index: number) => {
            const total = data.length
            const normalizedIndex = (index - activeIndex + total) % total
            const angle = (normalizedIndex / total) * Math.PI * 2 + rotation
            const spiralR = 80 + normalizedIndex * 22
            const isActive = index === activeIndex

            return {
                x: isActive ? 0 : Math.cos(angle) * spiralR,
                y: isActive ? 0 : Math.sin(angle) * spiralR,
                scale: isActive ? 1 : Math.max(0.75, 0.9 - normalizedIndex * 0.02),
                opacity: isActive ? 1 : Math.max(0.45, 1 - normalizedIndex * 0.12),
                size: isActive ? ACTIVE_CARD_SIZE : CARD_SIZE,
                zIndex: isActive ? 20 : total - normalizedIndex
            }
        },
        [activeIndex, data.length, rotation]
    )

    const [springs, api] = useSprings(data.length, (i) => {
        const pos = getSpiralPos(i)
        return {
            x: pos.x,
            y: pos.y,
            scale: pos.scale,
            opacity: pos.opacity,
            size: pos.size,
            config: { tension, friction }
        }
    })

    useEffect(() => {
        api.start((i) => {
            const pos = getSpiralPos(i)
            return {
                x: pos.x,
                y: pos.y,
                scale: pos.scale,
                opacity: pos.opacity,
                size: pos.size,
                config: { tension, friction }
            }
        })
    }, [activeIndex, rotation, tension, friction, api, getSpiralPos])

    const handleClick = useCallback((index: number) => {
        setActiveIndex(index)
        setRotation((prev) => prev + Math.PI / 4)
    }, [])

    if (!validateData(data, 'CardSpiral')) {
        return <div className="text-red-500 text-sm">Error: CardSpiral requires 2–10 items (received {data.length})</div>
    }

    return (
        <div className="relative flex items-center justify-center" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>
            {data.map((item, index) => {
                const spring = springs[index]
                const isActive = index === activeIndex
                const zIndex = getSpiralPos(index).zIndex

                return (
                    <animated.div
                        key={item.title}
                        onClick={() => handleClick(index)}
                        style={{
                            position: 'absolute',
                            backgroundColor: bgColor,
                            color: textColor,
                            width: spring.size,
                            height: spring.size,
                            opacity: spring.opacity,
                            zIndex,
                            transform: spring.x.to((x) => `translate(${x}px, ${spring.y.get()}px) scale(${spring.scale.get()})`),
                            cursor: 'pointer'
                        }}
                        className={cn('shadow-lg p-3 overflow-hidden duration-100', cornerClass)}
                    >
                        {isActive ? (
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-2 mb-1">
                                    {item.image && <img className="w-10 h-10 rounded" src={item.image} alt={item.title} />}
                                    <label className="font-bold text-base capitalize">{item.title}</label>
                                </div>
                                <p className="text-xs line-clamp-4 flex-1">{item.description}</p>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <label className="font-bold text-xs capitalize text-center">{item.title}</label>
                            </div>
                        )}
                    </animated.div>
                )
            })}
        </div>
    )
}
