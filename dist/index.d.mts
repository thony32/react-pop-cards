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
declare function Card({ data, bgColor, disposition, isRounded, tension, friction }: CardProps): react_jsx_runtime.JSX.Element;

export { Card, type CardItem, type CardProps };
