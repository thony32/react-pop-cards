const API_STATS = 'https://api.npmjs.org/downloads/point/last-week/react-pop-cards'
const API_INFOS = 'https://registry.npmjs.org/react-pop-cards'

// ─── Types ──────────────────────────────────────────────────────────

export interface NpmStats {
    downloads: number
    start: string
    end: string
    package: string
}

export interface NpmInfos {
    name: string
    versions: Record<string, unknown>
    [key: string]: unknown
}

// ─── Service ────────────────────────────────────────────────────────

type FetchType = 'stats' | 'infos'

export async function getNpmPackage<T extends FetchType>(type: T): Promise<T extends 'stats' ? NpmStats : NpmInfos> {
    const url = type === 'stats' ? API_STATS : API_INFOS

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response.json()
}
