import { useEffect, useRef, useState } from 'react'

interface TypeWriterProps {
    /** Array of strings to cycle through */
    strings: string[]
    /** Typing speed in milliseconds per character */
    typeSpeed?: number
    /** Deleting speed in milliseconds per character */
    deleteSpeed?: number
    /** Pause duration in milliseconds before starting to delete */
    pauseDuration?: number
    /** Whether to loop through the strings */
    loop?: boolean
    /** Class name for the wrapper element */
    className?: string
}

/**
 * A lightweight typing animation component that replaces `react-typed`.
 * Types through an array of strings with customizable speeds.
 */
export function TypeWriter({ strings, typeSpeed = 50, deleteSpeed = 30, pauseDuration = 1500, loop = true, className }: TypeWriterProps) {
    const [displayText, setDisplayText] = useState('')
    const [stringIndex, setStringIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

    useEffect(() => {
        if (strings.length === 0) return

        const currentFullString = strings[stringIndex]

        const tick = () => {
            if (isDeleting) {
                // Deleting characters
                setDisplayText((prev) => prev.slice(0, -1))

                if (displayText.length <= 1) {
                    setIsDeleting(false)
                    const nextIndex = (stringIndex + 1) % strings.length

                    if (!loop && nextIndex === 0) return
                    setStringIndex(nextIndex)
                }
            } else {
                // Typing characters
                setDisplayText(currentFullString.slice(0, displayText.length + 1))

                if (displayText.length >= currentFullString.length - 1) {
                    // Pause before deleting
                    timeoutRef.current = setTimeout(() => {
                        setIsDeleting(true)
                    }, pauseDuration)
                    return
                }
            }
        }

        timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed)

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [displayText, isDeleting, stringIndex, strings, typeSpeed, deleteSpeed, pauseDuration, loop])

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    )
}
