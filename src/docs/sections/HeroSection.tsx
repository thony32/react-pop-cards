import { TypeWriter } from '../components/TypeWriter'
import { Stats } from '../components/Stats'

// ─── Constants ──────────────────────────────────────────────────────

const INSTALL_COMMANDS = ['npm install react-pop-cards', 'yarn add react-pop-cards', 'pnpm add react-pop-cards', 'bun add react-pop-cards']

const TAGLINES = ['Beautiful animated cards.', 'Spring-based animations.', 'TypeScript first.', 'Lightweight & fast.']

// ─── Types ──────────────────────────────────────────────────────────

interface HeroSectionProps {
    textColor?: string
}

// ─── Component ──────────────────────────────────────────────────────

export function HeroSection({ textColor }: Readonly<HeroSectionProps>) {
    return (
        <section className="min-h-[90vh] flex flex-col justify-center px-[5%] lg:px-[8%] py-12 relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
                {/* Left — Title + Tagline */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-5xl lg:text-7xl font-fortnite uppercase tracking-tight" style={{ color: textColor }}>
                            React Pop Cards
                        </h1>
                    </div>

                    <div className="text-xl lg:text-2xl opacity-65 h-8">
                        <TypeWriter strings={TAGLINES} typeSpeed={40} loop />
                    </div>

                    <p className="max-w-lg text-base opacity-80 leading-relaxed">
                        A collection of animated card components for React with spring-based physics. 5 unique variants, fully customizable, TypeScript-ready.
                    </p>

                    {/* Install command */}
                    <div className="max-w-md">
                        <div className="mockup-code shadow-2xl">
                            <pre data-prefix="$">
                                <TypeWriter strings={INSTALL_COMMANDS} typeSpeed={50} loop />
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Right — Stats */}
                <div className="flex flex-col items-end gap-6">
                    <Stats textColor={textColor} />

                    <div className="flex gap-3 mt-4">
                        <a href="#playground" className="btn btn-primary btn-md">
                            Try it live →
                        </a>
                        <a href="https://github.com/thony32/react-pop-cards" target="_blank" rel="noreferrer" className="btn btn-ghost btn-md">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
