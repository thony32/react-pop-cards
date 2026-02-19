import * as react_jsx_runtime from 'react/jsx-runtime';

interface CardItem {
    title: string;
    description: string;
    image?: string;
}
interface CardProps {
    /** Array of exactly 4 card items to display */
    data: CardItem[];
    /** Background color of the cards (hex string) */
    bgColor?: string;
    /** Layout disposition for the card grid */
    disposition?: 'LeftRight' | 'RightLeft' | 'TopBottom' | 'BottomTop';
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension (higher = snappier) */
    tension?: number;
    /** Spring animation friction (higher = more damped) */
    friction?: number;
}
declare function Card({ data, bgColor, disposition, isRounded, tension, friction }: Readonly<CardProps>): react_jsx_runtime.JSX.Element;

interface CardStackProps {
    /** Array of card items to display */
    data: CardItem[];
    /** Background color of the cards (hex string) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardStack({ data, bgColor, isRounded, tension, friction }: Readonly<CardStackProps>): react_jsx_runtime.JSX.Element;

interface CardCarouselProps {
    /** Array of card items to display */
    data: CardItem[];
    /** Background color of the cards (hex string) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardCarousel({ data, bgColor, isRounded, tension, friction }: Readonly<CardCarouselProps>): react_jsx_runtime.JSX.Element;

interface CardAccordionProps {
    /** Array of card items to display */
    data: CardItem[];
    /** Background color of the cards (hex string) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardAccordion({ data, bgColor, isRounded, tension, friction }: Readonly<CardAccordionProps>): react_jsx_runtime.JSX.Element;

interface CardFlipProps {
    /** Array of card items to display */
    data: CardItem[];
    /** Background color of the cards (hex string) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardFlip({ data, bgColor, isRounded, tension, friction }: Readonly<CardFlipProps>): react_jsx_runtime.JSX.Element;

export { Card, CardAccordion, type CardAccordionProps, CardCarousel, type CardCarouselProps, CardFlip, type CardFlipProps, type CardItem, type CardProps, CardStack, type CardStackProps };
