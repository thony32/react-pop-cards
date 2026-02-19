import { useEffect, useState } from 'react'

/**
 * Custom hook that listens to a CSS media query and returns whether it matches.
 * Replaces `react-responsive` with zero dependencies.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 640px)");
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false
        return window.matchMedia(query).matches
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches)
        }

        // Set initial value
        setMatches(mediaQuery.matches)

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [query])

    return matches
}
