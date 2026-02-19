import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
    /** Target number to count up to */
    end: number
    /** Animation duration in seconds */
    duration?: number
    /** Class name for the wrapper element */
    className?: string
}

/**
 * A lightweight animated counter component that replaces `react-countup`.
 * Uses requestAnimationFrame for smooth 60fps animation.
 */
export function AnimatedCounter({ end, duration = 2, className }: AnimatedCounterProps) {
    const [count, setCount] = useState(0)
    const startTimeRef = useRef<number | null>(null)
    const rafRef = useRef<number>(0)

    useEffect(() => {
        startTimeRef.current = null

        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp
            }

            const elapsed = timestamp - startTimeRef.current
            const progress = Math.min(elapsed / (duration * 1000), 1)

            // Ease-out cubic for a smooth deceleration
            const eased = 1 - (1 - progress) ** 3
            setCount(Math.floor(eased * end))

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate)
            } else {
                setCount(end)
            }
        }

        rafRef.current = requestAnimationFrame(animate)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [end, duration])

    return <span className={className}>{count.toLocaleString()}</span>
}
