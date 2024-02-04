import React , { ReactNode } from "react";

interface CardDataItem {
  title: string;
  description: string;
  image?: string;
}

interface CardProps {
  data: CardDataItem[];
  bgColor?: string;
  disposition?: "LeftRight" | "RightLeft" | "TopBottom" | "BottomTop";
  isRounded?: boolean;
  tension?: number;
  friction?: number;
}

declare const Card: React.FC<CardProps>;

export default Card;