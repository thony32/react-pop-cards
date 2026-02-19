import chroma from 'chroma-js'

/**
 * Resolves a CSS color value. If the value is a CSS variable (e.g. `var(--primary)`),
 * it reads the computed value from the document root. Otherwise returns the value as-is.
 */
export function resolveColor(color: string): string | null {
    if (color.startsWith('var(')) {
        if (globalThis.window === undefined) return null
        const varName = color.slice(4, -1).trim()
        const resolved = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
        return resolved || null
    }
    return color
}

/**
 * Derives a readable text color (light or dark) based on the background color's luminance.
 * Handles hex, rgb, hsl, named colors, and CSS variables.
 */
export function getTextColor(bgColor: string): string {
    const resolved = resolveColor(bgColor)
    if (!resolved) return '#1c2531'
    try {
        return chroma(resolved).luminance() < 0.5 ? '#e5e5e5' : '#1c2531'
    } catch {
        return '#1c2531'
    }
}

/**
 * Darkens a color by the given amount. Handles CSS variables by resolving first.
 * Returns the original color string if resolution or darkening fails.
 */
export function darkenColor(bgColor: string, amount = 0.5): string {
    const resolved = resolveColor(bgColor)
    if (!resolved) return bgColor
    try {
        return chroma(resolved).darken(amount).hex()
    } catch {
        return bgColor
    }
}

/** Minimum number of card items */
export const MIN_ITEMS = 2
/** Maximum number of card items */
export const MAX_ITEMS = 10

/**
 * Validates the data array length. Logs an error and returns false if invalid.
 */
export function validateData(data: unknown[], componentName: string): boolean {
    if (data.length < MIN_ITEMS || data.length > MAX_ITEMS) {
        console.error(`react-pop-cards [${componentName}]: data must contain between ${MIN_ITEMS} and ${MAX_ITEMS} items (received ${data.length})`)
        return false
    }
    return true
}
