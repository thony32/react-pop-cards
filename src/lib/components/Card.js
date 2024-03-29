/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import { useMediaQuery } from "react-responsive"
import "../../index.css"
import PropTypes from "prop-types"
import chroma from "chroma-js"

const Card = ({ data, bgColor, disposition, isRounded, tension, friction }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 640px)" })
    const activeCardRef = useRef(null)
    const parentCard = useRef(null)

    // NOTE: default content div classes
    const cardDivClass = "col-span-3 flex justify-center items-center duration-100"
    const miniCardDivClass = "col-span-2 gap-4 flex justify-center items-center duration-100"
    const miniCardClass = "hover:scale-125 duration-200 cursor-pointer flex justify-center items-center max-sm:w-[4rem] max-sm:h-[4rem] w-[5rem] h-[5rem] shadow-lg"

    // Define card data
    const initialCardDimensions = { width: "6rem", height: "6rem" }

    // NOTE: assign the data to the cards

    const newArray = data.map((item) => ({
        ...initialCardDimensions,
        ...item,
    }))
    const [cards, setCards] = useState(newArray)

    // active card
    const [activeCard, setActiveCard] = useState(data[0].title)

    useEffect(() => {
        handleCardClick(activeCard)
        const handleLocalStorageUpdate = () => {
            try {
                const updatedArray = JSON.parse(localStorage.getItem("data")).map((item) => ({
                    ...initialCardDimensions,
                    ...item,
                }))
                setCards(updatedArray)
                setActiveCard(updatedArray[0].title)
            } catch (error) {
                console.error("Error parsing local storage data:", error)
            }
        }
        window.addEventListener("DataChange", handleLocalStorageUpdate)
        return () => {
            window.removeEventListener("DataChange", handleLocalStorageUpdate)
        }
    }, [data, activeCard, isMobile])

    // Handle card click and update dimensions
    const handleCardClick = (cardKey) => {
        const updatedCards = cards.map((card) => {
            return {
                ...card,
                width: cardKey === card.title ? (isMobile ? "11rem" : "20rem") : initialCardDimensions.width,
                height: cardKey === card.title ? (isMobile ? "11rem" : "20rem") : initialCardDimensions.height,
            }
        })

        setCards(updatedCards)
        setActiveCard(cardKey)
    }

    // NOTE: Animated styles for each card
    const animatedStyles = Object.keys(cards).reduce((acc, cardKey) => {
        acc[cardKey] = useSpring({
            to: { width: cards[cardKey[0]].width.toString(), height: cards[cardKey[0]].height.toString(), backgroundColor: bgColor },
            config: { tension: tension, friction: friction },
        })
        return acc
    }, {})

    // NOTE: parent classNames of the animated cards
    const getCardClasses = (key) => {
        key = Number(key)
        switch (key) {
            case 0:
                return "flex justify-end items-end"
            case 1:
                return "flex items-end"
            case 2:
                return "flex justify-end"
            case 3:
                return "flex"
            default:
                return "lol"
        }
    }

    // NOTE: classNames for the disposition
    const getDisposition = (disposition) => {
        switch (disposition) {
            case "LeftRight":
                return `${isMobile ? "flex flex-col justify-center items-center gap-8 h-full" : "grid grid-cols-5 h-full"}`
            case "RightLeft":
                return `${isMobile ? "flex flex-col-reverse justify-center items-center gap-8 h-full" : "grid grid-cols-5 h-full"}`
            case "TopBottom":
                return "flex flex-col justify-center items-center gap-8 h-full"
            case "BottomTop":
                return "flex flex-col-reverse justify-center items-center gap-8 h-full"
            default:
                return "grid grid-cols-5 h-full"
        }
    }

    // NOTE: text color according to bg color
    const [textColor, setTextColor] = useState()
    useEffect(() => {
        const luminance = chroma(bgColor).luminance()
        luminance < 0.5 ? setTextColor("#e5e5e5") : setTextColor("#1c2531")
    }, [bgColor])

    return (
        <div className={getDisposition(disposition)}>
            <div className={(disposition === "LeftRight" ? "order-1" : "order-2") + ` ${cardDivClass}`}>
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(cards).map(([key, value]) => (
                        <div key={key} className={getCardClasses(key)} ref={parentCard}>
                            <div style={{ color: textColor }}>
                                <animated.div
                                    ref={activeCard === value.title ? activeCardRef : null}
                                    style={animatedStyles[key]}
                                    onClick={() => handleCardClick(value.title)}
                                    className={`${activeCard === value.title ? "max-sm:px-2 px-6 py-4" : "flex justify-center items-center"} cursor-pointer duration-100 ${isRounded ? " rounded-2xl" : " rounded-none"}`}
                                >
                                    <div className={`${activeCard === value.title ? "min-h-full" : "max-sm:space-y-1 space-y-3"}`}>
                                        <div className="flex max-sm:flex-col-reverse justify-between items-center">
                                            <label className={(activeCard === value.title ? "max-sm:text-xl text-4xl" : "max-sm:text-xs text-base") + " capitalize font-bold duration-100"}>{value.title}</label>
                                            {activeCard === value.title && value.image != null && <img className="max-sm:w-8 max-sm:h-8 w-16 h-16" src={value.image} alt="imageCard" />}
                                        </div>
                                        {activeCard === value.title && <p className="line-clamp-[8] text-justify max-sm:text-[8px]">{value.description}</p>}
                                    </div>
                                </animated.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={(disposition === "RightLeft" ? "order-1" : "order-2") + ` ${miniCardDivClass}`} style={{ color: textColor }}>
                {Object.entries(cards).map(([key, value]) => (
                    <div key={key} onClick={() => handleCardClick(value.title)} className={`bg-base-100 ${activeCard === value.title ? "scale-105 shadow-xl" : "scale-90"} ${miniCardClass} ${isRounded ? "rounded-2xl" : "rounded-none"}`}>
                        <label className="text-center text-xs capitalize">{value.title}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

Card.propTypes = {
    data: PropTypes.array.isRequired,
}

Card.defaultProps = {
    disposition: "LeftRight",
    bgColor: "#e5e7eb",
    isRounded: false,
    tension: 120,
    friction: 10,
}

export default Card
