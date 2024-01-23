import Card from "./components/Card"
import React, { useState } from "react"

function checkForDuplicates(array) {
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
    const array = ["Un", "Deux", "Trois", "Quatre"];
    const [disposition, setDisposition] = useState("");
    const [radius, setRadius] = useState();
    const [code, setCode] = useState("<Card data={array} />");

    function handleData() {
        var data = document.getElementById("dataInputRef").value.split(',');
        if (data.length !== 4) {
            alert('Only 4 letters')
        } else {
            if (checkForDuplicates(data)) {
                alert("Duplicate letters")
            } else {
                localStorage.setItem("data", JSON.stringify(data));
                window.dispatchEvent(new Event('DataChange'));
            }
        }
    }


    const handleDispositionChange = (event) => {
        const newDisposition = event.target.value;
        setDisposition(newDisposition);
        updateCode(newDisposition, radius);
    };

    const handleRadiusChange = () => {
        setRadius(!radius);
        updateCode(disposition, !radius);
    }

    const updateCode = (newDisposition, newIsRounded) => {
        console.log(newDisposition);
        console.log(newIsRounded);
        if (newDisposition !== null) {
            setCode(`<Card data={array} disposition="${newDisposition}" />`);
        }
        if (newIsRounded !== undefined) {
            setCode(`<Card data={array} isRounded=${newIsRounded} />`);
        }
        if (newDisposition !== "" && newIsRounded !== undefined) {
            setCode(`<Card data={array} disposition="${newDisposition}" isRounded={${newIsRounded}} />`);
        }
    };

    return (
        <div className="space-y-5 p-8">
            <div className="grid grid-cols-5">
                <div className="col-span-3 p-8 flex gap-[5%]">
                    {/* for data */}
                    <div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="text-xl font-bold">Data</span>
                            </div>
                            <div className="flex gap-2">
                                <input id="dataInputRef" type="text" placeholder={array.join(',')} className="input input-bordered w-full max-w-xs" />
                                <button onClick={() => handleData()} className="btn btn-info">
                                    Set
                                </button>
                            </div>
                            <div className="label">
                                <span className="label-text-alt">Séparer par <kbd className="kbd kbd-xs">,</kbd> (ex: un,deux,trois,quatre)</span>
                            </div>
                        </label>
                    </div>
                    {/* for dispositon */}
                    <div>
                        <span className="text-xl font-bold">Disposition (default : LeftRight)</span>
                        <div className="form-control">
                            <label className="label cursor-pointer space-x-5">
                                <span className="label-text">Left to right</span>
                                <input value={"LeftRight"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "LeftRight"}
                                    onChange={handleDispositionChange} />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer space-x-5">
                                <span className="label-text">Right to left</span>
                                <input value={"RightLeft"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "RightLeft"}
                                    onChange={handleDispositionChange} />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer space-x-5">
                                <span className="label-text">Top to bottom</span>
                                <input value={"TopBottom"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "TopBottom"}
                                    onChange={handleDispositionChange} />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer space-x-5">
                                <span className="label-text">Bottom to top</span>
                                <input value={"BottomTop"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "BottomTop"}
                                    onChange={handleDispositionChange} />
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
                </div>
                <div className="col-span-2 p-8">
                    <h1 className="text-3xl font-bold mb-3">Code preview</h1>
                    <div>
                        <div className="mockup-code">
                            <pre><code id="code">{code}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Card data={array} disposition={disposition} isRounded={radius} />
            </div>
            <div className="flex justify-center">
                <div>
                    <h1 className="mb-3 text-2xl text-center font-medium">Installation</h1>
                    <div className="mockup-code">
                        <pre data-prefix="$"><code>bun install rajoelina-js</code></pre>
                        <pre><code>or</code></pre>
                        <pre data-prefix="$"><code>pnpm i rajoelina-js</code></pre>
                        <pre><code>or</code></pre>
                        <pre data-prefix="$"><code>npm i rajoelina-js</code></pre>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sandbox