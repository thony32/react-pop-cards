import Card from "./components/Card"
import React, { useState } from "react"

const checkForDuplicates = (array) => {
    let valuesAlreadySeen = []

    for (let i = 0; i < array.length; i++) {
        let value = array[i]
        if (valuesAlreadySeen.indexOf(value) !== -1) {
            return true
        }
        valuesAlreadySeen.push(value)
    }
    return false
}

const Sandbox = () => {
    const array = ["Un", "Deux", "Trois", "Quatre"]
    const [disposition, setDisposition] = useState("")
    const [radius, setRadius] = useState()
    const [code, setCode] = useState(`<Card data={array} disposition="LeftRight" isRounded=false tension={120} friction={10} />`)
    const [tension, setTension] = useState()
    const [friction, setFriction] = useState()
    const [tempTension, setTempTension] = useState(120)
    const [tempFriction, setTempFriction] = useState(10)

    const handleTensionChange = (event) => {
        setTempTension(event.target.value)
    }

    const handleFrictionChange = (event) => {
        setTempFriction(event.target.value)
    }

    const setTensionAndFriction = () => {
        setTension(tempTension)
        setFriction(tempFriction)
        updateCode(disposition, radius, tempTension, tempFriction)
    }

    const handleData = () => {
        var data = document.getElementById("dataInputRef").value.split(",")
        if (data.length !== 4) {
            alert("Only 4 letters")
        } else {
            if (checkForDuplicates(data)) {
                alert("Duplicate letters")
            } else {
                localStorage.setItem("data", JSON.stringify(data))
                window.dispatchEvent(new Event("DataChange"))
            }
        }
    }

    const handleDispositionChange = (event) => {
        const newDisposition = event.target.value
        setDisposition(newDisposition)
        updateCode(newDisposition, radius, tempTension, tempFriction)
    }

    const handleRadiusChange = () => {
        setRadius(!radius)
        updateCode(disposition, !radius, tempTension, tempFriction)
    }

    const updateCode = (newDisposition, newIsRounded, newTension, newFriction) => {
        console.log(newDisposition)
        console.log(newIsRounded)
        console.log(newTension)
        console.log(newFriction)

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

        let codeString = `<Card data={array} ${parts.join(" ")} />`
        setCode(codeString)
    }

    return (
        <div className="space-y-[5%] p-8">
            <div className="grid grid-cols-8 gap-[5%]">
                <div className="col-span-2 space-y-10">
                    {/* for data */}
                    <div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="text-xl font-bold">Data</span>
                            </div>
                            <div className="flex gap-2">
                                <input id="dataInputRef" type="text" placeholder={array.join(",")} className="input input-bordered w-full max-w-xs" />
                                <button onClick={() => handleData()} className="btn btn-info">
                                    Set
                                </button>
                            </div>
                            <div className="label">
                                <span className="label-text-alt">
                                    Séparer par <kbd className="kbd kbd-xs">,</kbd> (ex: un,deux,trois,quatre)
                                </span>
                            </div>
                        </label>
                    </div>
                    {/* for dispositon */}
                    <div>
                        <span className="text-xl font-bold">Disposition (default : LeftRight)</span>
                        <div className="form-control">
                            <label className="label cursor-pointer space-x-5">
                                <span className="label-text">Left to right</span>
                                <input value={"LeftRight"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "LeftRight"} onChange={handleDispositionChange} />
                            </label>
                        </div>
                        <div className="form-control">
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
                    {/* for radius */}
                    <div>
                        <span className="text-xl font-bold">Radius (default : false)</span>
                        <div className="form-control">
                            <label className="cursor-pointer label space-x-5">
                                <span className="label-text">Is Rounded</span>
                                <input type="checkbox" onClick={() => handleRadiusChange()} className="checkbox checkbox-info" />
                            </label>
                        </div>
                    </div>
                    {/* for tension */}
                    <div className="flex flex-col gap-4">
                        <span className="text-xl font-bold">Tension and friction</span>
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
                    </div>
                </div>
                <div className="col-span-6">
                    <Card data={array} disposition={disposition} isRounded={radius} tension={tension} friction={friction} />
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="p-8">
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
                    <div>
                        <h1 className="text-3xl font-bold mb-3">Installation</h1>
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
