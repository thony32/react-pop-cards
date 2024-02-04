const API_STATS = "https://api.npmjs.org/downloads/point/last-week/react-pop-cards"
const API_INFOS = "https://registry.npmjs.org/react-pop-cards"

const getNpmPackage = async ({ type }) => {
    try {
        let response

        if (type === "stats") {
            response = await fetch(API_STATS)
        } else if (type === "infos") {
            response = await fetch(API_INFOS)
        } else {
            throw new Error('Invalid type provided. Use "stats" or "infos".')
        }
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}

export default getNpmPackage
