import Card from "./lib/components/Card"
import React, { useEffect, useState, useMemo } from "react"
import Editor from "@monaco-editor/react"
import { useMediaQuery } from "react-responsive"
import { ReactTyped } from "react-typed"
import ThemeChanger from "./lib/components/ThemeChanger"
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker"
import BuildFor from "./lib/components/BuildFor"
import Stats from "./lib/components/Stats"
import getNpmPackage from "./lib/services/npmService"
import { Toaster, toast } from "react-hot-toast"

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

    const isMobile = useMediaQuery({ query: "(max-width: 640px)" })

    const [disposition, setDisposition] = useState("LeftRight")
    const [radius, setRadius] = useState(false)
    const [code, setCode] = useState(`<Card data={array} disposition="LeftRight" isRounded={false} tension={120} friction={10} bgColor="#e5e7eb"/>`)
    const [tension, setTension] = useState()
    const [friction, setFriction] = useState()
    const [tempTension, setTempTension] = useState(120)
    const [tempFriction, setTempFriction] = useState(10)
    const [bgColor, setBgColor] = useState("#e5e7eb")
    const [editorValue, setEditorValue] = useState("")

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
            parts.push(`isRounded={${newIsRounded}}`)
        } else {
            parts.push(`isRounded=false`)
        }

        if (newBackground !== "") {
            parts.push(`bgColor="${newBackground}"`)
        }

        let codeString = `<Card data={array} ${parts.join(" ")} />`
        setCode(codeString)
    }

    // NOTE editor options
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

    const [color, setColor] = useState(bgColor)
    const { valueToHex } = useColorPicker(color, setColor)
    const hexString = valueToHex()
    const [textColor, setTextColor] = useState()

    useEffect(() => {
        setBgColor(hexString)
        if (bgColor !== color) {
            setTextColor(hexString)
        }
        updateCode(disposition, bgColor, radius, tempTension, tempFriction)
    }, [hexString, bgColor, disposition, radius, tempFriction, tempTension, color])

    // NOTE: get version
    const [npmInfos, setNpminfos] = useState(null)
    useEffect(() => {
        const fetchNpmInfos = async () => {
            const infos = await getNpmPackage({ type: "infos" })
            setNpminfos(infos)
        }
        fetchNpmInfos()
    }, [])

    // NOTE: Copy to clipboard
    const copy = () => {
        const textToCopy = document.getElementById("code").innerText
        // NOTE Use the Navigator clipboard API to copy the text
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                toast.success("Copied to clipboard")
            })
            .catch((err) => {
                toast.error("Failed to copy text: " + err)
            })
    }

    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false} />
            <div className="space-y-[3%] px-[2%] lg:px-[8%] py-[2%] lg:h-screen overflow-x-hidden">
                <div className="flex max-sm:flex-col justify-between max-sm:gap-4">
                    <div className="space-y-3">
                        <h1 className="text-5xl text-center lg:text-7xl lg:text-left font-fortnite uppercase" style={{ color: textColor }}>
                            React pop cards
                        </h1>
                    </div>
                    <div className="space-y-3 flex max-sm:flex-col max-sm:items-center max-sm:gap-2 gap-8">
                        <div className="flex justify-center">
                            <div className="flex flex-col justify-center ">
                                <div className="flex justify-between items-center mb-2">
                                    <h1 className="text-2xl font-fortnite">Installation :</h1>
                                    <ThemeChanger />
                                </div>
                                <div className="mockup-code w-full xl:w-[25.5rem] ">
                                    <pre data-prefix="$">
                                        <ReactTyped strings={["npm install react-pop-cards", "yarn add react-pop-cards", "pnpm add react-pop-cards", "bun add react-pop-cards"]} typeSpeed={50} loop={true} />
                                    </pre>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <Stats textColor={textColor} />
                        </div>
                    </div>
                </div>
                <div className="max-sm:flex max-sm:flex-col max-sm:gap-16 xl:grid xl:grid-cols-11 gap-[5%]">
                    <div className="scrollbar xl:col-span-3 space-y-10 px-5 py-3 overflow-y-scroll h-[70vh]">
                        {/* for data */}
                        <div className="drawer">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <div className="flex flex-col gap-3 max-sm:items-center items-start">
                                    <div>
                                        <h1 className="text-2xl font-fortnite">Data (must be set) :</h1>
                                    </div>
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer" className="btn btn-info drawer-button max-sm:w-full">
                                        Set
                                    </label>
                                </div>
                            </div>
                            <div className="drawer-side z-50">
                                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                                <div className="bg-base-100 h-screen p-2">
                                    <h1 className="mb-1 sm:text-xl uppercase font-fortnite">Set data here like the example here :</h1>
                                    <Editor height="50vh" width={`${isMobile ? "30vvw" : "50vh"}`} onChange={handleEditorChange} options={editorOptions} defaultLanguage="json" theme="vs-dark" defaultValue={JSON.stringify(array, null, 2)} className="max-sm:scale-90" />
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
                        {/* for color */}
                        <div className="space-y-3">
                            <div>
                                <h1 className="text-2xl font-fortnite">Color :</h1>
                            </div>
                            <div className="flex justify-center">
                                <ColorPicker value={color} hideAdvancedSliders hidePresets hideOpacity hideColorTypeBtns hideGradientAngle hideGradientType hideInputType hideInputs onChange={setColor} />
                            </div>
                        </div>
                        {/* for dispositon */}
                        <div className="space-y-3">
                            <div>
                                <h1 className="text-2xl font-fortnite">Disposition (default : LeftRight)</h1>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`${isMobile ? "hidden" : "form-control"}`}>
                                    <label className="label cursor-pointer space-x-5">
                                        <span className="label-text">Left to right</span>
                                        <input value={"LeftRight"} type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={disposition === "LeftRight"} onChange={handleDispositionChange} />
                                    </label>
                                </div>
                                <div className={`${isMobile ? "hidden" : "form-control"}`}>
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
                            <div className="text-xs text-justify">But for mobile devices "LeftRight" is set as "TopBottom" and "RightLeft" is set as "BottomTop"</div>
                        </div>
                        {/* for radius */}
                        <div className="space-y-3">
                            <div>
                                <h1 className="text-2xl font-fortnite">Radius (default : false)</h1>
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
                                <h1 className="text-2xl font-fortnite">Tension and friction (default tension: 120, default friction: 10)</h1>
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
                                <button className="btn btn-info max-sm:w-full" onClick={setTensionAndFriction}>
                                    Set
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-8 flex flex-col justify-between space-y-4">
                        <div className="translate-y-[0%]">
                            <Card data={array} bgColor={bgColor} disposition={disposition} isRounded={radius} tension={tension} friction={friction} />
                        </div>
                        <div className="w-full flex justify-center">
                            <div>
                                <h1 className="text-2xl font-fortnite mb-1">Code preview</h1>
                                <div>
                                    <div className="mockup-code">
                                        <pre>
                                            <code id="code" className="whitespace-pre-wrap">
                                                {code}
                                            </code>
                                            <button className="absolute top-2 right-2 rounded-full bg-base-200 active:scale-90 duration-300" onClick={copy}>
                                                <svg className="w-7 h-7 p-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M12 11H9M15 15H9"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute -left-[4%] bottom-[17%] -rotate-90">
                    <BuildFor bgColor={textColor} />
                </div>
            </div>
            <footer className="w-full py-3 px-[7%] bg-base-200/50 grid grid-cols-3">
                <div className="flex gap-3 items-center justify-start">
                    <a className="hover:scale-110 duration-150 tooltip tooltip-right" data-tip="Project link" href="https://github.com/thony32/react-pop-cards" target="_blank" rel="noreferrer">
                        <svg className="w-7" viewBox="0 0 20 20">
                            <g style={{ fill: textColor }} className="fill-current duration-100" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(-140.000000, -7559.000000)">
                                    <g transform="translate(56.000000, 160.000000)">
                                        <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </a>
                    <a className="hover:scale-110 duration-150" href="https://www.linkedin.com/in/anthony-mahefasoa-3672361b2/" target="_blank" rel="noreferrer">
                        <svg style={{ fill: textColor }} className="w-8 fill-current duration-100" viewBox="-143 145 512 512">
                            <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9 V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7 C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6 c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z" />
                        </svg>
                    </a>
                </div>
                {npmInfos && (
                    <div style={{ color: textColor }} className="flex items-center justify-center font-fortnite duration-100">
                        Version {Object.keys(npmInfos.versions).reduce((a, b) => (a > b ? a : b))} , copyright {new Date().getFullYear()}
                    </div>
                )}
                <div className="flex items-center justify-end gap-3">
                    <svg style={{ fill: textColor }} className="w-7 fill-current duration-100" viewBox="0 0 16 16" fill="none">
                        <path
                            fillRule="nonzero"
                            clipRule="nonzero"
                            d="M4.84989 2.37195C4.59895 2.51683 4.33488 2.91636 4.30424 3.78785C4.28968 4.20181 3.9423 4.52559 3.52835 4.51103C3.11439 4.49647 2.79061 4.1491 2.80516 3.73514C2.84273 2.66673 3.1806 1.60366 4.09989 1.07291C5.02179 0.540653 6.11484 0.782356 7.06128 1.28727C7.42674 1.48224 7.56495 1.93656 7.36998 2.30201C7.17501 2.66747 6.72069 2.80568 6.35524 2.61072C5.5818 2.1981 5.10158 2.22663 4.84989 2.37195ZM8.87139 3.67284C9.19036 3.40858 9.66315 3.45293 9.92741 3.7719C10.4818 4.44103 11.0136 5.20405 11.4963 6.04018C12.5366 7.84191 13.178 9.68785 13.3509 11.2362C13.4372 12.0091 13.4108 12.7446 13.2303 13.3754C13.0484 14.011 12.6941 14.5863 12.0999 14.9293C11.381 15.3444 10.5509 15.2855 9.79114 15.0089C9.02868 14.7313 8.24395 14.2056 7.49586 13.5228C7.18993 13.2435 7.16831 12.7691 7.44756 12.4632C7.72681 12.1573 8.20119 12.1356 8.50712 12.4149C9.16624 13.0165 9.78567 13.4105 10.3043 13.5994C10.8257 13.7892 11.1537 13.7436 11.3499 13.6303C11.5143 13.5354 11.6797 13.342 11.7882 12.9627C11.8981 12.5787 11.9328 12.0529 11.8602 11.4026C11.7152 10.1045 11.1591 8.45607 10.1973 6.79018C9.75492 6.02396 9.27081 5.33055 8.77232 4.72886C8.50807 4.40989 8.55242 3.93709 8.87139 3.67284Z"
                        />
                        <path
                            fillRule="nonzero"
                            clipRule="nonzero"
                            d="M14.5 8.20557C14.5 7.91581 14.286 7.48735 13.5466 7.02507C13.1954 6.80549 13.0887 6.34276 13.3083 5.99154C13.5279 5.64032 13.9906 5.53361 14.3418 5.75319C15.2483 6.31993 16 7.14407 16 8.20557C16 9.27009 15.2442 10.0958 14.3337 10.663C13.9821 10.882 13.5195 10.7746 13.3005 10.423C13.0815 10.0714 13.189 9.60887 13.5405 9.38985C14.2846 8.92635 14.5 8.4962 14.5 8.20557ZM11.3626 11.0378C11.432 11.4462 11.1572 11.8335 10.7488 11.9029C9.89219 12.0484 8.96547 12.1274 8 12.1274C5.91954 12.1274 4.00018 11.76 2.57286 11.1355C1.86032 10.8238 1.23659 10.4332 0.780529 9.9615C0.320977 9.48616 0 8.89166 0 8.20557C0 7.37549 0.466082 6.68599 1.08548 6.16636C1.70712 5.64485 2.55471 5.22808 3.52013 4.92164C3.91494 4.79633 4.33657 5.01479 4.46189 5.40959C4.5872 5.80439 4.36874 6.22603 3.97394 6.35135C3.12334 6.62134 2.4724 6.96078 2.04954 7.31553C1.62442 7.67217 1.5 7.97899 1.5 8.20557C1.5 8.39536 1.58476 8.6353 1.85895 8.91891C2.13663 9.20613 2.57464 9.49905 3.17409 9.76131C4.37076 10.2848 6.07639 10.6274 8 10.6274C8.88475 10.6274 9.72732 10.5549 10.4976 10.424C10.906 10.3547 11.2933 10.6295 11.3626 11.0378Z"
                        />
                        <path
                            fillRule="nonzero"
                            clipRule="nonzero"
                            d="M4.87192 13.6303C5.12286 13.7752 5.6009 13.8041 6.37095 13.3949C6.73673 13.2005 7.19082 13.3395 7.38519 13.7052C7.57957 14.071 7.44062 14.5251 7.07484 14.7195C6.13079 15.2211 5.04121 15.4601 4.12192 14.9293C3.20003 14.3971 2.86282 13.3296 2.82687 12.2575C2.81299 11.8435 3.13733 11.4967 3.55131 11.4828C3.96529 11.4689 4.31215 11.7932 4.32603 12.2072C4.35541 13.0834 4.62023 13.485 4.87192 13.6303ZM3.98778 9.49712C3.59944 9.35301 3.40145 8.92138 3.54556 8.53304C3.84786 7.71839 4.24274 6.8763 4.72548 6.04018C5.76571 4.23845 7.04361 2.75996 8.29806 1.83609C8.92431 1.37487 9.57441 1.02999 10.211 0.870901C10.8524 0.71059 11.5278 0.729863 12.1219 1.07291C12.8408 1.48795 13.2049 2.23634 13.3452 3.03257C13.486 3.83168 13.4232 4.77409 13.2058 5.7634C13.1169 6.16796 12.7169 6.42388 12.3124 6.33501C11.9078 6.24613 11.6519 5.84612 11.7408 5.44155C11.9322 4.56992 11.9637 3.83647 11.868 3.29288C11.7717 2.7464 11.5681 2.48524 11.3719 2.37195C11.2076 2.27705 10.9574 2.23049 10.5747 2.32614C10.1871 2.42301 9.71442 2.65588 9.18757 3.04388C8.13584 3.81846 6.98632 5.12428 6.02452 6.79018C5.58214 7.55639 5.22369 8.32235 4.95185 9.0549C4.80774 9.44323 4.37611 9.64122 3.98778 9.49712Z"
                        />
                        <path d="M9.45925 8.06618C9.45925 8.81694 8.85063 9.42556 8.09987 9.42556C7.34911 9.42556 6.7405 8.81694 6.7405 8.06618C6.7405 7.31542 7.34911 6.70681 8.09987 6.70681C8.85063 6.70681 9.45925 7.31542 9.45925 8.06618Z" />
                    </svg>
                    <svg style={{ fill: textColor }} className="w-7 fill-current duration-100" viewBox="0 0 15 15" fill="none">
                        <path d="M7.50006 2.5C6.47409 2.5 5.59203 2.77691 4.89966 3.37037C4.21227 3.95956 3.76259 4.81729 3.51314 5.88638C3.45869 6.1197 3.57742 6.35885 3.79619 6.45654C4.01496 6.55423 4.27228 6.483 4.40967 6.28672C4.7263 5.8344 5.04244 5.56261 5.3462 5.42313C5.64038 5.28805 5.95748 5.26068 6.32069 5.35797C6.68723 5.45615 6.97097 5.74369 7.41643 6.22816L7.43082 6.24382C7.76661 6.60905 8.17623 7.0546 8.73649 7.40028C9.31785 7.75898 10.0413 7.99999 11.0001 7.99999C12.026 7.99999 12.9081 7.72307 13.6005 7.12962C14.2878 6.54043 14.7375 5.6827 14.987 4.61361C15.0414 4.38029 14.9227 4.14114 14.7039 4.04345C14.4852 3.94576 14.2278 4.01698 14.0904 4.21326C13.7738 4.66559 13.4577 4.93737 13.1539 5.07686C12.8597 5.21194 12.5426 5.23931 12.1794 5.14202C11.8129 5.04384 11.5291 4.7563 11.0837 4.27182L11.0693 4.25616C10.7335 3.89093 10.3239 3.44538 9.76362 3.09971C9.18227 2.74101 8.45883 2.5 7.50006 2.5Z" />
                        <path d="M4.00006 6.99999C2.97409 6.99999 2.09203 7.2769 1.39966 7.87036C0.712271 8.45955 0.262592 9.31727 0.0131365 10.3864C-0.0413057 10.6197 0.0774162 10.8588 0.296186 10.9565C0.514956 11.0542 0.772276 10.983 0.909673 10.7867C1.2263 10.3344 1.54244 10.0626 1.8462 9.92312C2.14038 9.78804 2.45747 9.76067 2.82069 9.85796C3.18723 9.95614 3.47097 10.2437 3.91643 10.7282L3.93082 10.7438C4.2666 11.109 4.67624 11.5546 5.23649 11.9003C5.81785 12.259 6.54128 12.5 7.50006 12.5C8.52602 12.5 9.40808 12.2231 10.1005 11.6296C10.7878 11.0404 11.2375 10.1827 11.487 9.1136C11.5414 8.88027 11.4227 8.64113 11.2039 8.54343C10.9852 8.44574 10.7278 8.51697 10.5904 8.71325C10.2738 9.16558 9.95768 9.43736 9.65391 9.57684C9.35974 9.71192 9.04264 9.7393 8.67942 9.64201C8.31289 9.54383 8.02915 9.25628 7.58369 8.77181L7.56929 8.75615C7.23351 8.39092 6.82388 7.94537 6.26362 7.59969C5.68227 7.241 4.95883 6.99999 4.00006 6.99999Z" />
                    </svg>
                </div>
            </footer>
        </>
    )
}

export default Sandbox
