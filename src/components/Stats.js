import { useEffect, useState } from "react"
import getNpmPackage from "../services/npmService"
import CountUp from "react-countup"

const Stats = ({ textColor }) => {
    // * get stats
    const [npmStats, setNpmStats] = useState(null)

    useEffect(() => {
        const fetchNpmStats = async () => {
            try {
                const stats = await getNpmPackage({ type: "stats" })
                setNpmStats(stats)
            } catch (error) {
                console.error("Error fetching stats:", error)
            }
        }

        fetchNpmStats()
    }, [])

    return (
        <div className="relative">
            {npmStats && (
                <>
                    <label style={{ color: textColor }} className="text-3xl font-fortnite">
                        <CountUp duration={4} end={npmStats.downloads} />
                    </label>
                    <svg style={{ stroke: textColor }} className="stroke-current w-5 absolute -top-[50%] -right-[50%]" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
                            stroke-width="2.5"
                            stroke-linecap="round"
                        />
                        <path className="animate-bounce" d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </>
            )}
        </div>
    )
}

export default Stats
