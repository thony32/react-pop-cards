import { animated, useSprings } from '@react-spring/web'
import chroma from 'chroma-js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { cn } from '../utils/cn'

// ─── Types ──────────────────────────────────────────────────────────

export interface CardItem {
    title: string
    description: string
    image?: string
}

export interface CardProps {
    /** Array of exactly 4 card items to display */
    data: CardItem[]
    /** Background color of the cards (hex string) */
    bgColor?: string
    /** Layout disposition for the card grid */
    disposition?: 'LeftRight' | 'RightLeft' | 'TopBottom' | 'BottomTop'
    /** Whether cards have rounded corners */
    isRounded?: boolean
    /** Spring animation tension (higher = snappier) */
    tension?: number
    /** Spring animation friction (higher = more damped) */
    friction?: number
}

// ─── Constants ──────────────────────────────────────────────────────

const DEFAULT_BG_COLOR = '#e5e7eb'
const DEFAULT_TENSION = 120
const DEFAULT_FRICTION = 10

const MINI_SIZE = { width: '6rem', height: '6rem' }
const ACTIVE_SIZE = { width: '20rem', height: '20rem' }
const ACTIVE_SIZE_MOBILE = { width: '11rem', height: '11rem' }

const CARD_ALIGNMENT_CLASSES: Record<number, string> = {
    0: 'flex justify-end items-end',
    1: 'flex items-end',
    2: 'flex justify-end',
    3: 'flex'
}

// ─── Component ──────────────────────────────────────────────────────

export function Card({ data, bgColor = DEFAULT_BG_COLOR, disposition = 'LeftRight', isRounded = false, tension = DEFAULT_TENSION, friction = DEFAULT_FRICTION }: CardProps) {
    const isMobile = useMediaQuery('(max-width: 640px)')
    const activeCardRef = useRef<HTMLDivElement>(null)

    const [activeTitle, setActiveTitle] = useState(data[0]?.title ?? '')

    // Derive text color from background luminance
    const textColor = useMemo(() => {
        try {
            return chroma(bgColor).luminance() < 0.5 ? '#e5e5e5' : '#1c2531'
        } catch {
            return '#1c2531'
        }
    }, [bgColor])

    // Compute sizes for each card
    const getSize = useCallback(
        (title: string) => {
            if (title === activeTitle) {
                return isMobile ? ACTIVE_SIZE_MOBILE : ACTIVE_SIZE
            }
            return MINI_SIZE
        },
        [activeTitle, isMobile]
    )

    // Use react-spring's useSprings to avoid conditional hook calls
    const [springs, api] = useSprings(data.length, (index) => ({
        width: getSize(data[index].title).width,
        height: getSize(data[index].title).height,
        backgroundColor: bgColor,
        config: { tension, friction }
    }))

    // Update springs when state changes
    useEffect(() => {
        api.start((index) => ({
            width: getSize(data[index].title).width,
            height: getSize(data[index].title).height,
            backgroundColor: bgColor,
            config: { tension, friction }
        }))
    }, [activeTitle, bgColor, tension, friction, isMobile, data, api, getSize])

    const handleCardClick = useCallback((title: string) => {
        setActiveTitle(title)
    }, [])

    // Disposition class mapping
    const dispositionClass = useMemo(() => {
        const verticalCenter = 'flex flex-col justify-center items-center gap-8 h-full'

        switch (disposition) {
            case 'LeftRight':
                return isMobile ? verticalCenter : 'grid grid-cols-5 h-full'
            case 'RightLeft':
                return isMobile ? 'flex flex-col-reverse justify-center items-center gap-8 h-full' : 'grid grid-cols-5 h-full'
            case 'TopBottom':
                return verticalCenter
            case 'BottomTop':
                return 'flex flex-col-reverse justify-center items-center gap-8 h-full'
            default:
                return 'grid grid-cols-5 h-full'
        }
    }, [disposition, isMobile])

    const cornerClass = isRounded ? 'rounded-2xl' : 'rounded-none'

    return (
        <div className={dispositionClass}>
            {/* Main card grid */}
            <div className={cn('col-span-3 flex justify-center items-center duration-100', disposition === 'LeftRight' ? 'order-1' : 'order-2')}>
                <div className="grid grid-cols-2 gap-2">
                    {data.map((item, index) => {
                        const isActive = activeTitle === item.title

                        return (
                            <div key={item.title} className={CARD_ALIGNMENT_CLASSES[index] ?? 'flex'}>
                                <div style={{ color: textColor }}>
                                    <animated.div
                                        ref={isActive ? activeCardRef : undefined}
                                        style={springs[index]}
                                        onClick={() => handleCardClick(item.title)}
                                        className={cn('cursor-pointer duration-100', cornerClass, isActive ? 'px-6 py-4' : 'flex justify-center items-center')}
                                    >
                                        <div className={isActive ? 'min-h-full' : 'max-sm:space-y-1 space-y-3'}>
                                            <div className="flex max-sm:flex-col-reverse justify-between items-center">
                                                <label className={cn('capitalize font-bold duration-100', isActive ? 'max-sm:text-xl text-5xl' : 'max-sm:text-xs text-base')}>{item.title}</label>
                                                {isActive && item.image && <img className="max-sm:w-12 max-sm:h-12 w-20 h-20" src={item.image} alt={`${item.title} card`} />}
                                            </div>
                                            {isActive && <p className="line-clamp-[8] text-justify max-sm:text-xs">{item.description}</p>}
                                        </div>
                                    </animated.div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Mini card navigation */}
            <div className={cn('col-span-2 gap-4 flex justify-center items-center duration-100', disposition === 'RightLeft' ? 'order-1' : 'order-2')}>
                {data.map((item) => {
                    const isActive = activeTitle === item.title

                    return (
                        <div
                            key={item.title}
                            onClick={() => handleCardClick(item.title)}
                            className={cn(
                                'bg-base-100 hover:scale-125 duration-200 cursor-pointer flex justify-center items-center',
                                'max-sm:w-[4rem] max-sm:h-[4rem] w-[5rem] h-[5rem] shadow-lg',
                                cornerClass,
                                isActive ? 'scale-105 shadow-xl' : 'scale-90'
                            )}
                        >
                            <label className="text-center text-xs capitalize">{item.title}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
