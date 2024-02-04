import React from "react";
interface CardProps {
  data: any;
  bgColor?: string;
  disposition?: "LeftRight" | "RightLeft" | "TopBottom" | "BottomTop";
  isRounded?: boolean;
  tension?: number;
  friction?: number;
}

declare const Card: React.FC<CardProps>;

export default Card;