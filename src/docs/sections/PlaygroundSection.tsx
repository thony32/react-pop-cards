import Editor from '@monaco-editor/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'
import type { CardItem, CardProps } from '../../lib'
import { Card, CardStack, CardCarousel, CardAccordion, CardFlip } from '../../lib'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { useToast } from '../components/Toast'

// ─── Types ──────────────────────────────────────────────────────────

type Disposition = CardProps['disposition']
type VariantName = 'Card' | 'CardStack' | 'CardCarousel' | 'CardAccordion' | 'CardFlip'

// ─── Constants ──────────────────────────────────────────────────────

const VARIANT_NAMES: VariantName[] = ['Card', 'CardStack', 'CardCarousel', 'CardAccordion', 'CardFlip']

const DEFAULT_DATA: CardItem[] = [
    { title: 'Design', description: 'Beautiful UI components with spring physics', image: 'https://placehold.co/600x400' },
    { title: 'Animate', description: 'Smooth spring-based animations', image: 'https://placehold.co/600x400' },
    { title: 'Build', description: 'Production-ready components', image: 'https://placehold.co/600x400' },
    { title: 'Ship', description: 'Lightweight, tree-shakeable bundle', image: 'https://placehold.co/600x400' }
]

const EDITOR_OPTIONS = {
    minimap: { enabled: false },
    scrollbar: { horizontal: 'hidden' as const, vertical: 'hidden' as const },
    scrollBeyondLastLine: false
}

// ─── Helpers ────────────────────────────────────────────────────────

function buildCodeString(variant: VariantName, disposition: Disposition, bgColor: string, isRounded: boolean, tension: number, friction: number): string {
    const commonProps = [`bgColor="${bgColor}"`, `isRounded={${isRounded}}`, `tension={${tension}}`, `friction={${friction}}`]

    if (variant === 'Card') {
        return `<${variant} data={data} disposition="${disposition}" ${commonProps.join(' ')} />`
    }

    return `<${variant} data={data} ${commonProps.join(' ')} />`
}

function buildImportString(variant: VariantName): string {
    return `import { ${variant} } from "react-pop-cards"\nimport "react-pop-cards/styles.css"`
}

// ─── Component ──────────────────────────────────────────────────────

export function PlaygroundSection() {
    const toast = useToast()
    const isMobile = useMediaQuery('(max-width: 640px)')

    // Variant selection
    const [activeVariant, setActiveVariant] = useState<VariantName>('Card')

    // Card config state
    const [disposition, setDisposition] = useState<Disposition>('LeftRight')
    const [isRounded, setIsRounded] = useState(false)
    const [tension, setTension] = useState(120)
    const [friction, setFriction] = useState(10)
    const [tempTension, setTempTension] = useState(120)
    const [tempFriction, setTempFriction] = useState(10)
    const [bgColor, setBgColor] = useState('#e5e7eb')

    // Data editor state
    const [cardData, setCardData] = useState<CardItem[]>(DEFAULT_DATA)
    const [editorValue, setEditorValue] = useState(JSON.stringify(DEFAULT_DATA, null, 2))

    // Color picker state
    const [color, setColor] = useState('#e5e7eb')
    const { valueToHex } = useColorPicker(color, setColor)
    const hexColor = valueToHex()

    useEffect(() => {
        setBgColor(hexColor)
    }, [hexColor])

    // Code preview strings
    const importCode = useMemo(() => buildImportString(activeVariant), [activeVariant])
    const usageCode = useMemo(
        () => buildCodeString(activeVariant, disposition, bgColor, isRounded, tempTension, tempFriction),
        [activeVariant, disposition, bgColor, isRounded, tempTension, tempFriction]
    )
    const fullCode = `${importCode}\n\n${usageCode}`

    // Handlers
    const applyTensionFriction = useCallback(() => {
        setTension(tempTension)
        setFriction(tempFriction)
    }, [tempTension, tempFriction])

    const handleDispositionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDisposition(e.target.value as Disposition)
    }, [])

    const handleApplyData = useCallback(() => {
        try {
            const parsed = JSON.parse(editorValue) as CardItem[]
            setCardData(parsed)
        } catch {
            toast.error('Invalid JSON data')
        }
    }, [editorValue, toast])

    const copyToClipboard = useCallback(() => {
        navigator.clipboard
            .writeText(fullCode)
            .then(() => toast.success('Copied to clipboard'))
            .catch((err) => toast.error(`Failed to copy: ${err}`))
    }, [fullCode, toast])

    // Render the active variant
    const renderPreview = useMemo(() => {
        const props = { data: cardData, bgColor, isRounded, tension, friction }

        switch (activeVariant) {
            case 'Card':
                return <Card {...props} disposition={disposition} />
            case 'CardStack':
                return <CardStack {...props} />
            case 'CardCarousel':
                return <CardCarousel {...props} />
            case 'CardAccordion':
                return <CardAccordion {...props} />
            case 'CardFlip':
                return <CardFlip {...props} />
        }
    }, [activeVariant, cardData, bgColor, disposition, isRounded, tension, friction])

    return (
        <section id="playground" className="px-[5%] lg:px-[8%] py-16 scroll-mt-8">
            <h2 className="text-3xl lg:text-5xl font-fortnite uppercase mb-4">Playground</h2>
            <p className="opacity-65 mb-8 max-w-lg">Customize any variant and copy the code.</p>

            {/* Variant selector tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {VARIANT_NAMES.map((name) => (
                    <button key={name} onClick={() => setActiveVariant(name)} className={`btn btn-sm ${activeVariant === name ? 'btn-primary' : 'btn-ghost'}`}>
                        {name}
                    </button>
                ))}
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
                {/* Controls */}
                <div className="xl:w-80 shrink-0 space-y-6">
                    {/* Data editor */}
                    <div className="collapse collapse-arrow bg-base-200/50 shadow">
                        <input type="checkbox" />
                        <div className="collapse-title font-bold text-lg">Data</div>
                        <div className="collapse-content space-y-3">
                            <Editor
                                height="30vh"
                                width="100%"
                                onChange={(val) => setEditorValue(val ?? '')}
                                options={EDITOR_OPTIONS}
                                defaultLanguage="json"
                                theme="vs-dark"
                                defaultValue={JSON.stringify(DEFAULT_DATA, null, 2)}
                            />
                            <p className="text-xs opacity-65">4 elements with unique titles</p>
                            <button onClick={handleApplyData} className="btn btn-primary btn-sm w-full">
                                Apply
                            </button>
                        </div>
                    </div>

                    {/* Color */}
                    <div className="collapse collapse-arrow bg-base-200/50 shadow">
                        <input type="checkbox" defaultChecked />
                        <div className="collapse-title font-bold text-lg">Color</div>
                        <div className="collapse-content flex justify-center">
                            <ColorPicker value={color} hideAdvancedSliders hidePresets hideOpacity hideColorTypeBtns hideGradientAngle hideGradientType hideInputType hideInputs onChange={setColor} />
                        </div>
                    </div>

                    {/* Disposition — only for Card variant */}
                    {activeVariant === 'Card' && (
                        <div className="collapse collapse-arrow bg-base-200/50 shadow">
                            <input type="checkbox" defaultChecked />
                            <div className="collapse-title font-bold text-lg">Disposition</div>
                            <div className="collapse-content space-y-2">
                                {(
                                    [
                                        { value: 'LeftRight', label: 'Left → Right', hideOnMobile: true },
                                        { value: 'RightLeft', label: 'Right → Left', hideOnMobile: true },
                                        { value: 'TopBottom', label: 'Top → Bottom', hideOnMobile: false },
                                        { value: 'BottomTop', label: 'Bottom → Top', hideOnMobile: false }
                                    ] as const
                                ).map(({ value, label, hideOnMobile }) => (
                                    <label key={value} className={`flex items-center gap-3 cursor-pointer ${hideOnMobile && isMobile ? 'hidden' : ''}`}>
                                        <input
                                            value={value}
                                            type="radio"
                                            name="disposition"
                                            className="radio radio-sm radio-primary"
                                            checked={disposition === value}
                                            onChange={handleDispositionChange}
                                        />
                                        <span className="text-sm">{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Radius */}
                    <div className="flex items-center justify-between bg-base-200/50 shadow rounded-2xl px-4 py-3">
                        <span className="font-bold">Rounded</span>
                        <input type="checkbox" checked={isRounded} onChange={() => setIsRounded((prev) => !prev)} className="toggle toggle-primary" />
                    </div>

                    {/* Tension & Friction */}
                    <div className="collapse collapse-arrow bg-base-200/50 shadow">
                        <input type="checkbox" defaultChecked />
                        <div className="collapse-title font-bold text-lg">Physics</div>
                        <div className="collapse-content space-y-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm">Tension: {tempTension}</label>
                                <input type="range" min={10} max={500} value={tempTension} onChange={(e) => setTempTension(Number(e.target.value))} className="range range-sm range-primary" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm">Friction: {tempFriction}</label>
                                <input type="range" min={1} max={100} value={tempFriction} onChange={(e) => setTempFriction(Number(e.target.value))} className="range range-sm range-primary" />
                            </div>
                            <button className="btn btn-primary btn-sm w-full" onClick={applyTensionFriction}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="bg-base-200/30 rounded-2xl p-6 min-h-[450px] flex items-center justify-center shadow-inner">{renderPreview}</div>

                    {/* Code preview */}
                    <div className="mockup-code relative shadow-lg">
                        <pre data-prefix="1">
                            <code>{`import { ${activeVariant} } from "react-pop-cards"`}</code>
                        </pre>
                        <pre data-prefix="2">
                            <code>{`import "react-pop-cards/styles.css"`}</code>
                        </pre>
                        <pre data-prefix="3">
                            <code> </code>
                        </pre>
                        <pre data-prefix="4">
                            <code>{usageCode}</code>
                        </pre>
                        <button className="absolute top-2 right-2 btn btn-sm btn-ghost btn-circle" onClick={copyToClipboard} aria-label="Copy code">
                            📋
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
