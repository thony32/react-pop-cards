import { animated, useSprings } from '@react-spring/web'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CardItem } from './Card'
import { cn } from '../utils/cn'
import { getTextColor, validateData } from '../utils/resolveColor'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardOrbitProps {
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
const DEFAULT_FRICTION = 18

const ORBIT_RADIUS = 160
const CENTER_SIZE = 200
const SATELLITE_SIZE = 80

// ─── Component ──────────────────────────────────────────────────────

export function CardOrbit({ data, bgColor = DEFAULT_BG_COLOR, isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: Readonly<CardOrbitProps>) {
    const [activeIndex, setActiveIndex] = useState(0)

    const textColor = useMemo(() => getTextColor(bgColor), [bgColor])
    const cornerClass = isRounded ? 'rounded-full' : 'rounded-lg'

    const getOrbitalPos = useCallback(
        (index: number) => {
            const total = data.length
            const angle = (index / total) * Math.PI * 2 - Math.PI / 2
            const isActive = index === activeIndex

            if (isActive) {
                return { x: 0, y: 0, scale: 1, opacity: 1, size: CENTER_SIZE }
            }

            return {
                x: Math.cos(angle) * ORBIT_RADIUS,
                y: Math.sin(angle) * ORBIT_RADIUS,
                scale: 0.6,
                opacity: 0.75,
                size: SATELLITE_SIZE
            }
        },
        [activeIndex, data.length]
    )

    const [springs, api] = useSprings(data.length, (i) => {
        const pos = getOrbitalPos(i)
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
            const pos = getOrbitalPos(i)
            return {
                x: pos.x,
                y: pos.y,
                scale: pos.scale,
                opacity: pos.opacity,
                size: pos.size,
                config: { tension, friction }
            }
        })
    }, [activeIndex, tension, friction, api, getOrbitalPos])

    if (!validateData(data, 'CardOrbit')) {
        return <div className="text-red-500 text-sm">Error: CardOrbit requires 2–10 items (received {data.length})</div>
    }

    return (
        <div className="relative flex items-center justify-center" style={{ width: ORBIT_RADIUS * 2 + CENTER_SIZE, height: ORBIT_RADIUS * 2 + CENTER_SIZE }}>
            {/* Orbit ring */}
            <div className="absolute rounded-full border border-dashed opacity-20" style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2, borderColor: textColor }} />

            {data.map((item, index) => {
                const spring = springs[index]
                const isActive = index === activeIndex

                return (
                    <animated.div
                        key={item.title}
                        onClick={() => setActiveIndex(index)}
                        style={{
                            position: 'absolute',
                            backgroundColor: bgColor,
                            color: textColor,
                            width: spring.size,
                            height: spring.size,
                            opacity: spring.opacity,
                            transform: spring.x.to((x) => `translate(${x}px, ${spring.y.get()}px) scale(${spring.scale.get()})`),
                            cursor: 'pointer',
                            zIndex: isActive ? 10 : 1
                        }}
                        className={cn('shadow-lg flex flex-col items-center justify-center p-3 duration-100 overflow-hidden', cornerClass)}
                    >
                        {isActive ? (
                            <div className="text-center space-y-2">
                                {item.image && <img className="w-12 h-12 rounded-full mx-auto" src={item.image} alt={item.title} />}
                                <label className="font-bold text-lg capitalize block">{item.title}</label>
                                <p className="text-xs line-clamp-3">{item.description}</p>
                            </div>
                        ) : (
                            <label className="font-bold text-xs capitalize text-center">{item.title}</label>
                        )}
                    </animated.div>
                )
            })}
        </div>
    )
}
