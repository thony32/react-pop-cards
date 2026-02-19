import { useEffect, useState } from 'react'
import { getNpmPackage, type NpmInfos } from '../services/npmService'

// ─── Types ──────────────────────────────────────────────────────────

interface FooterSectionProps {
    textColor?: string
}

// ─── Component ──────────────────────────────────────────────────────

export function FooterSection({ textColor }: Readonly<FooterSectionProps>) {
    const [npmInfos, setNpmInfos] = useState<NpmInfos | null>(null)

    useEffect(() => {
        getNpmPackage('infos')
            .then(setNpmInfos)
            .catch((err) => console.error('Error fetching npm infos:', err))
    }, [])

    const latestVersion = npmInfos ? Object.keys(npmInfos.versions).reduce((a, b) => (a > b ? a : b)) : null

    return (
        <footer className="w-full py-6 px-[5%] lg:px-[8%] bg-base-200/50 border-t border-base-300">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Social links */}
                <div className="flex gap-4 items-center">
                    <a className="hover:scale-110 duration-150 opacity-70 hover:opacity-100" href="https://github.com/thony32/react-pop-cards" target="_blank" rel="noreferrer" aria-label="GitHub">
                        <svg className="w-6" viewBox="0 0 20 20">
                            <g style={{ fill: textColor }} className="fill-current duration-100" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(-140.000000, -7559.000000)">
                                    <g transform="translate(56.000000, 160.000000)">
                                        <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </a>
                    <a
                        className="hover:scale-110 duration-150 opacity-70 hover:opacity-100"
                        href="https://www.linkedin.com/in/anthony-mahefasoa-3672361b2/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <svg style={{ fill: textColor }} className="w-7 fill-current duration-100" viewBox="-143 145 512 512">
                            <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9 V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7 C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6 c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z" />
                        </svg>
                    </a>
                </div>

                {/* Version info */}
                <div style={{ color: textColor }} className="text-sm font-fortnite duration-100 opacity-70">
                    {latestVersion && <>v{latestVersion} · </>}© {new Date().getFullYear()} react-pop-cards
                </div>

                {/* Tech badges */}
                <div className="flex items-center gap-2 opacity-50">
                    <span className="badge badge-sm">React</span>
                    <span className="badge badge-sm">TypeScript</span>
                    <span className="badge badge-sm">Tailwind</span>
                </div>
            </div>
        </footer>
    )
}
