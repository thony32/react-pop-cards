import { useSpring, animated } from '@react-spring/web'
import { useCallback, useMemo, useState } from 'react'
import type { CardItem } from './Card'
import { cn } from '../utils/cn'
import { getTextColor, darkenColor, validateData } from '../utils/resolveColor'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardFlipProps {
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
const DEFAULT_TENSION = 300
const DEFAULT_FRICTION = 30

// ─── Single Flip Card ───────────────────────────────────────────────

function FlipCard({
    item,
    bgColor,
    textColor,
    cornerClass,
    tension,
    friction
}: Readonly<{
    item: CardItem
    bgColor: string
    textColor: string
    cornerClass: string
    tension: number
    friction: number
}>) {
    const [flipped, setFlipped] = useState(false)

    const { rotateY, frontOpacity, backOpacity } = useSpring({
        rotateY: flipped ? 180 : 0,
        frontOpacity: flipped ? 0 : 1,
        backOpacity: flipped ? 1 : 0,
        config: { tension, friction }
    })

    const handleFlip = useCallback(() => {
        setFlipped((prev) => !prev)
    }, [])

    const backColor = useMemo(() => darkenColor(bgColor, 0.5), [bgColor])

    return (
        <div
            role="button"
            tabIndex={0}
            className="cursor-pointer"
            style={{ perspective: 800, width: 200, height: 240 }}
            onClick={handleFlip}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleFlip()
            }}
        >
            {/* Front face */}
            <animated.div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: bgColor,
                    color: textColor,
                    opacity: frontOpacity,
                    transform: rotateY.to((r) => `rotateY(${r}deg)`)
                }}
                className={cn('shadow-lg flex flex-col items-center justify-center gap-4 p-5', cornerClass)}
            >
                {item.image && <img className="w-16 h-16 rounded" src={item.image} alt={item.title} />}
                <label className="font-bold text-xl capitalize">{item.title}</label>
            </animated.div>

            {/* Back face */}
            <animated.div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: backColor,
                    color: textColor,
                    opacity: backOpacity,
                    transform: rotateY.to((r) => `rotateY(${r + 180}deg)`)
                }}
                className={cn('shadow-lg flex flex-col p-5', cornerClass)}
            >
                <label className="font-bold text-lg capitalize mb-2">{item.title}</label>
                <p className="text-sm text-justify line-clamp-8 flex-1">{item.description}</p>
                <span className="text-xs opacity-65 mt-2">Click to flip back</span>
            </animated.div>
        </div>
    )
}

// ─── Component ──────────────────────────────────────────────────────

export function CardFlip({ data, bgColor = DEFAULT_BG_COLOR, isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: Readonly<CardFlipProps>) {
    const textColor = useMemo(() => getTextColor(bgColor), [bgColor])

    const cornerClass = isRounded ? 'rounded-2xl' : 'rounded-none'

    if (!validateData(data, 'CardFlip')) {
        return <div className="text-red-500 text-sm">Error: CardFlip requires 2–10 items (received {data.length})</div>
    }

    return (
        <div className="grid grid-cols-2 gap-4 justify-items-center">
            {data.map((item) => (
                <FlipCard key={item.title} item={item} bgColor={bgColor} textColor={textColor} cornerClass={cornerClass} tension={tension} friction={friction} />
            ))}
        </div>
    )
}
