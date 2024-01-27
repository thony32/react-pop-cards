import Card from "./components/Card"
import React, { useEffect, useState, useMemo } from "react"
import Editor from "@monaco-editor/react"
import { useMediaQuery } from 'react-responsive';

const Sandbox = () => {
    const array = useMemo(
        () => [
            { title: "Title1", description: "Description1", image: "https://placehold.co/600x400" },
            { title: "Title2", description: "Description2", image: "https://placehold.co/600x400" },
            { title: "Title3", description: "Description3", image: "https://placehold.co/600x400" },
            { title: "Title4", description: "Description4", image: "https://placehold.co/600x400" },
        ],
        []
    )

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

    const [disposition, setDisposition] = useState("LeftRight")
    const [radius, setRadius] = useState(false)
    const [code, setCode] = useState(`<Card data={array} disposition="LeftRight" isRounded=false tension={120} friction={10} bgColor="#e5e7eb"/>`)
    const [tension, setTension] = useState()
    const [friction, setFriction] = useState()
    const [tempTension, setTempTension] = useState(120)
    const [tempFriction, setTempFriction] = useState(10)
    const [bgColor, setBgColor] = useState("#e5e7eb")
    const [editorValue, setEditorValue] = useState("")

    const handleBgColorChange = (event) => {
        setBgColor(document.getElementById("colorInput").value)
        updateCode(disposition, bgColor, radius, tempTension, tempFriction)
    }

    const handleTensionChange = (event) => {
        setTempTension(event.target.value)
    }

    const handleFrictionChange = (event) => {
        setTempFriction(event.target.value)
    }

    const setTensionAndFriction = () => {
        setTension(tempTension)
        setFriction(tempFriction)
        updateCode(disposition, bgColor, radius, tempTension, tempFriction)
    }

    const handleDispositionChange = (event) => {
        const newDisposition = event.target.value
        setDisposition(newDisposition)
        updateCode(newDisposition, bgColor, radius, tempTension, tempFriction)
    }

    const handleRadiusChange = () => {
        setRadius(!radius)
        updateCode(disposition, bgColor, !radius, tempTension, tempFriction)
    }

    const updateCode = (newDisposition, newBackground, newIsRounded, newTension, newFriction) => {
        let parts = []

        if (newDisposition !== "") {
            parts.push(`disposition="${newDisposition}"`)
        }

        parts.push(`tension={${newTension !== "" ? newTension : "0"}}`)
        parts.push(`friction={${newFriction !== "" ? newFriction : "0"}}`)

        if (newIsRounded !== undefined) {
            parts.push(`isRounded=${newIsRounded}`)
        } else {
            parts.push(`isRounded=false`)
        }

        if (newBackground !== "") {
            parts.push(`bgColor="${newBackground}"`)
        }

        let codeString = `<Card data={array} ${parts.join(" ")} />`
        setCode(codeString)
    }

    // editor options
    const editorOptions = {
        minimap: {
            enabled: false,
        },
        scrollbar: {
            horizontal: "hidden",
            vertical: "hidden",
        },
        scrollBeyondLastLine: false,
    }

    const handleEditorChange = (value) => {
        setEditorValue(value)
    }

    const handleButtonClick = () => {
        localStorage.setItem("data", editorValue)
        window.dispatchEvent(new Event("DataChange"))
    }

    useEffect(() => {
        setEditorValue(JSON.stringify(array, null, 2))
    }, [array])

    return (
        <div className="space-y-[5%] px-[8%] py-[2%]">
            <div className="max-sm:flex max-sm:flex-col max-sm:gap-16 grid grid-cols-8 gap-[5%]">
                <div className="col-span-2 space-y-10">
                    {/* for data */}
                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="btn btn-info drawer-button">
                                Data
                            </label>
                        </div>
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <div className="bg-base-100 h-screen p-2">
                                <h1 className="mb-2 sm:text-xl uppercase font-bold">Set data here like the example here :</h1>
                                <Editor height="50vh" width={`${isMobile ? "30vvw" :"50vh"}`} onChange={handleEditorChange} options={editorOptions} defaultLanguage="json" theme="vs-dark" defaultValue={JSON.stringify(array, null, 2)} className="max-sm:scale-90"/>
                                <div className="mt-2 space-y-4">
                                    <p className="text-sm">Only 4 elements with different titles</p>
                                    <div className="flex justify-end">
                                        <button onClick={handleButtonClick} className="btn btn-info">
                                            Set data
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* for dispositon */}
                    <div className="space-y-3">
                        <div>
                            <h1 className="text-xl font-bold">Disposition (default : LeftRight. But for mobile devices "LeftRight" is set as TopBottom and "RightLeft" is set as BottomTop)</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className={`${isMobile ? "hidden" :"form-control"}`}>
                                <label className="label cursor-pointer space-x-5">
                                    <span className="label-text">Left to right</span>
                                    <input value={"LeftRight"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "LeftRight"} onChange={handleDispositionChange} />
                                </label>
                            </div>
                            <div className={`${isMobile ? "hidden" :"form-control"}`}>
                                <label className="label cursor-pointer space-x-5">
                                    <span className="label-text">Right to left</span>
                                    <input value={"RightLeft"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "RightLeft"} onChange={handleDispositionChange} />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer space-x-5">
                                    <span className="label-text">Top to bottom</span>
                                    <input value={"TopBottom"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "TopBottom"} onChange={handleDispositionChange} />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer space-x-5">
                                    <span className="label-text">Bottom to top</span>
                                    <input value={"BottomTop"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "BottomTop"} onChange={handleDispositionChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* for radius */}
                    <div className="space-y-3">
                        <div>
                            <h1 className="text-xl font-bold">Radius (default : false)</h1>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label space-x-5">
                                <span className="label-text">Is Rounded</span>
                                <input type="checkbox" onClick={() => handleRadiusChange()} className="checkbox checkbox-info" />
                            </label>
                        </div>
                    </div>
                    {/* for tension */}
                    <div className="space-y-3">
                        <div>
                            <h1 className="text-xl font-bold">Tension and friction (default tension: 120, default friction: 10)</h1>
                        </div>
                        <div className="flex max-sm:flex-col max-sm:items-start items-end gap-3">
                            <div>
                                <label>Tension:</label>
                                <input type="number" value={tempTension} placeholder="120" className="input input-bordered w-full max-w-xs" onChange={handleTensionChange} />
                            </div>
                            <div>
                                <label>Friction:</label>
                                <input type="number" value={tempFriction} placeholder="10" className="input input-bordered w-full max-w-xs" onChange={handleFrictionChange} />
                            </div>
                            <button className="btn btn-info" onClick={setTensionAndFriction}>
                                Set
                            </button>
                            <div>
                                <label>Color:</label>
                                <input type="color" placeholder="120" className="input input-bordered w-full max-w-xs" id="colorInput"/>
                            </div>
                            <button className="btn btn-info" onClick={handleBgColorChange}>
                                Set color
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <Card data={array} bgColor={bgColor} disposition={disposition} isRounded={radius} tension={tension} friction={friction} />
                </div>
            </div>
            <div className="max-sm:flex max-sm:flex-col max-sm:justify-center grid grid-cols-2">
                <div className="max-sm:p-2 p-8">
                    <h1 className="text-3xl font-bold mb-3">Code preview</h1>
                    <div>
                        <div className="mockup-code">
                            <pre>
                                <code id="code">{code}</code>
                            </pre>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col justify-center max-sm:scale-[.85]">
                        <h1 className="text-3xl font-bold">Installation :</h1>
                        <div className="mockup-code">
                            <pre data-prefix="$">
                                <code>npm install react-pop-cards core-js</code>
                            </pre>
                            <pre>
                                <code>or</code>
                            </pre>
                            <pre data-prefix="$">
                                <code>yarn add react-pop-cards core-js</code>
                            </pre>
                            <pre>
                                <code>or</code>
                            </pre>
                            <pre data-prefix="$">
                                <code>pnpm add react-pop-cards core-js</code>
                            </pre>
                            <pre>
                                <code>or</code>
                            </pre>
                            <pre data-prefix="$">
                                <code>bun add react-pop-cards core-js</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sandbox
