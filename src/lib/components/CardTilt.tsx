import { useSpring, animated } from '@react-spring/web'
import { useCallback, useMemo, useRef, useState } from 'react'
import type { CardItem } from './Card'
import { cn } from '../utils/cn'
import { getTextColor, validateData } from '../utils/resolveColor'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardTiltProps {
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
const DEFAULT_FRICTION = 20

// ─── Single Tilt Card ───────────────────────────────────────────────

function TiltCard({
    item,
    bgColor,
    textColor,
    cornerClass,
    tension,
    friction,
    isActive,
    onClick
}: Readonly<{
    item: CardItem
    bgColor: string
    textColor: string
    cornerClass: string
    tension: number
    friction: number
    isActive: boolean
    onClick: () => void
}>) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)

    const [spring, api] = useSpring(() => ({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        config: { tension, friction }
    }))

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!cardRef.current) return
            const rect = cardRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const mouseX = e.clientX - centerX
            const mouseY = e.clientY - centerY

            api.start({
                rotateX: -(mouseY / rect.height) * 25,
                rotateY: (mouseX / rect.width) * 25,
                scale: 1.08,
                config: { tension, friction }
            })
        },
        [api, tension, friction]
    )

    const handleMouseLeave = useCallback(() => {
        setHovered(false)
        api.start({ rotateX: 0, rotateY: 0, scale: 1, config: { tension, friction } })
    }, [api, tension, friction])

    const handleMouseEnter = useCallback(() => {
        setHovered(true)
    }, [])

    return (
        <animated.div
            ref={cardRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                backgroundColor: bgColor,
                color: textColor,
                perspective: 600,
                transform: spring.rotateX.to((rx) => `perspective(600px) rotateX(${rx}deg) rotateY(${spring.rotateY.get()}deg) scale(${spring.scale.get()})`),
                cursor: 'pointer',
                width: isActive ? 260 : 180,
                minHeight: isActive ? 200 : 120,
                transition: 'width 0.3s, min-height 0.3s'
            }}
            className={cn('shadow-lg p-4 duration-100 relative overflow-hidden', cornerClass, isActive && 'ring-2 ring-white/30')}
        >
            {/* Glare effect */}
            {hovered && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                        borderRadius: 'inherit'
                    }}
                />
            )}

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    {item.image && <img className={cn('rounded', isActive ? 'w-12 h-12' : 'w-8 h-8')} src={item.image} alt={item.title} />}
                    <label className={cn('font-bold capitalize', isActive ? 'text-xl' : 'text-sm')}>{item.title}</label>
                </div>
                {isActive && <p className="text-sm line-clamp-4 mt-2">{item.description}</p>}
            </div>
        </animated.div>
    )
}

// ─── Component ──────────────────────────────────────────────────────

export function CardTilt({ data, bgColor = DEFAULT_BG_COLOR, isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: Readonly<CardTiltProps>) {
    const [activeIndex, setActiveIndex] = useState(0)

    const textColor = useMemo(() => getTextColor(bgColor), [bgColor])
    const cornerClass = isRounded ? 'rounded-2xl' : 'rounded-none'

    if (!validateData(data, 'CardTilt')) {
        return <div className="text-red-500 text-sm">Error: CardTilt requires 2–10 items (received {data.length})</div>
    }

    return (
        <div className="flex flex-wrap gap-4 justify-center items-center">
            {data.map((item, i) => (
                <TiltCard
                    key={item.title}
                    item={item}
                    bgColor={bgColor}
                    textColor={textColor}
                    cornerClass={cornerClass}
                    tension={tension}
                    friction={friction}
                    isActive={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                />
            ))}
        </div>
    )
}
