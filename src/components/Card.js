/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import { useMediaQuery } from "react-responsive"
import "../index.css"

const Card = ({ data }) => {
    const isMobile = useMediaQuery({ query: "max-width: 600px" })
    const activeCardRef = useRef(null)
    const parentCard = useRef(null)
    
    // Define card data
    const initialCardDimensions = { width: "6rem", height: "6rem" }
    const convertedObject = data.reduce((acc, currentValue) => {
        acc[currentValue.toLowerCase()] = { ...initialCardDimensions };
        return acc;
    }, {});
    const [cards, setCards] = useState(convertedObject)

    // active card
    const [activeCard, setActiveCard] = useState(data[0])

    // Handle card click and update dimensions
    const handleCardClick = (cardKey) => {
        const updatedCards = Object.keys(cards).reduce((acc, key) => {
            acc[key] = cardKey === key ? { width: "20rem", height: isMobile ? "11rem" : "20rem" } : initialCardDimensions
            return acc
        }, {})

        setCards(updatedCards)
        setActiveCard(cardKey)
    }

    // Update active card ref
    useEffect(() => {
        handleCardClick(activeCard)
    }, [activeCard])

    // Animated styles for each card
    const animatedStyles = Object.keys(cards).reduce((acc, card) => {
        acc[card] = useSpring({
            to: { width: cards[card].width, height: cards[card].height },
            config: { tension: 120, friction: 10 },
        })
        return acc
    }, {})

    const getCardClasses = (key) => {
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
                return ""
        }
    }

    return (
        <div className="grid grid-cols-5 h-screen">
            <div className="col-span-3 flex justify-center items-center">
                <div className="grid grid-cols-2 gap-2">
                    {Object.keys(cards).map((cardKey, key) => (
                        <div key={cardKey} className={getCardClasses(key)} ref={parentCard}>
                            <animated.div
                                ref={activeCard === cardKey ? activeCardRef : null}
                                style={animatedStyles[cardKey]}
                                onClick={() => handleCardClick(cardKey)}
                                className={(activeCard === cardKey ? "px-6 py-4 rounded-2xl" : "flex justify-center items-center rounded-2xl") + " cursor-pointer bg-blue-400"}
                            >
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className={(activeCard === cardKey ? "text-5xl" : "text-base") + " capitalize font-bold duration-500"}>{cardKey}</label>
                                        {activeCard === cardKey && <div className="w-20 h-20 text-center bg-green-500">Icon or image here</div>}
                                    </div>
                                    {/* description here */}
                                    {activeCard === cardKey && (
                                        <p className="line-clamp-[8] text-justify">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt possimus assumenda sequi nihil, pariatur, aliquid molestias harum aliquam aut eum incidunt, amet accusantium numquam reiciendis. Dicta architecto quibusdam aspernatur laborum. Lorem ipsum
                                            dolor sit amet consectetur adipisicing elit. Explicabo quasi ipsum fuga ex harum reprehenderit, tempora a alias nisi dignissimos inventore quia eum modi molestiae perspiciatis ducimus optio minus nostrum.
                                        </p>
                                    )}
                                </div>
                            </animated.div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-2 gap-4 flex justify-center items-center">
                {Object.keys(cards).map((cardKey) => (
                    <div key={cardKey} onClick={() => handleCardClick(cardKey)} className={(activeCard === cardKey ? "scale-110 shadow-xl" : "scale-90") + " hover:scale-125 duration-200 cursor-pointer flex justify-center items-center w-[5rem] h-[5rem] shadow-md rounded-2xl"}>
                        <label className="text-center text-xs capitalize">{cardKey}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Card
