import { HeroSection } from './sections/HeroSection'
import { PlaygroundSection } from './sections/PlaygroundSection'
import { FooterSection } from './sections/FooterSection'
import { BuildFor } from './components/BuildFor'

// ─── Component ──────────────────────────────────────────────────────

export function Sandbox() {
    return (
        <>
            <div className="relative overflow-x-hidden">
                <HeroSection />
                <PlaygroundSection />

                {/* Build for badge */}
                <div className="absolute -left-[4%] bottom-[17%] -rotate-90 max-sm:hidden">
                    <BuildFor />
                </div>
            </div>

            <FooterSection />
        </>
    )
}
