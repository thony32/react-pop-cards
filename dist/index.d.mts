import * as react_jsx_runtime from 'react/jsx-runtime';

interface CardItem {
    title: string;
    description: string;
    image?: string;
}
interface CardProps {
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
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
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
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
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
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
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
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
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardFlip({ data, bgColor, isRounded, tension, friction }: Readonly<CardFlipProps>): react_jsx_runtime.JSX.Element;

interface CardOrbitProps {
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardOrbit({ data, bgColor, isRounded, tension, friction }: Readonly<CardOrbitProps>): react_jsx_runtime.JSX.Element;

interface CardTiltProps {
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardTilt({ data, bgColor, isRounded, tension, friction }: Readonly<CardTiltProps>): react_jsx_runtime.JSX.Element;

interface CardMasonryProps {
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardMasonry({ data, bgColor, isRounded, tension, friction }: Readonly<CardMasonryProps>): react_jsx_runtime.JSX.Element;

interface CardSpiralProps {
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardSpiral({ data, bgColor, isRounded, tension, friction }: Readonly<CardSpiralProps>): react_jsx_runtime.JSX.Element;

interface CardWaveProps {
    /** Array of 2–10 card items to display */
    data: CardItem[];
    /** Background color (hex, rgb, hsl, named color, or CSS variable e.g. `var(--primary)`) */
    bgColor?: string;
    /** Whether cards have rounded corners */
    isRounded?: boolean;
    /** Spring animation tension */
    tension?: number;
    /** Spring animation friction */
    friction?: number;
}
declare function CardWave({ data, bgColor, isRounded, tension, friction }: Readonly<CardWaveProps>): react_jsx_runtime.JSX.Element;

export { Card, CardAccordion, type CardAccordionProps, CardCarousel, type CardCarouselProps, CardFlip, type CardFlipProps, type CardItem, CardMasonry, type CardMasonryProps, CardOrbit, type CardOrbitProps, type CardProps, CardSpiral, type CardSpiralProps, CardStack, type CardStackProps, CardTilt, type CardTiltProps, CardWave, type CardWaveProps };
