<<<<<<< HEAD
interface CardDataItem {
<<<<<<< HEAD
    title: string
    description: string
    image?: string
}

interface CardProps {
    data: CardDataItem[]
    bgColor?: string
    disposition?: "LeftRight" | "RightLeft" | "TopBottom" | "BottomTop"
    isRounded?: boolean
    tension?: number
    friction?: number
}

export declare const Card: React.FC<CardProps>
=======
  title: string;
  description: string;
  image?: string;
=======
<<<<<<<< HEAD:dist/index.d.ts
<<<<<<< HEAD
import { ReactNode, ReactElement, CSSProperties } from 'react';

=======
>>>>>>> 2d59d5f (merge)
========
import React , { ReactNode } from "react";

>>>>>>>> e678435 (merge):src/index.d.ts
interface CardDataItem {
  title: string;
  description: string;
  image?: string;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  // Ajoutez d'autres propriétés si nécessaire
>>>>>>> 2d59d5f (merge)
=======
>>>>>>> 50b671a (merge)
>>>>>>> e678435 (merge)
}

interface CardProps {
  data: CardDataItem[];
  bgColor?: string;
<<<<<<< HEAD
  disposition?: "LeftRight" | "RightLeft" | "TopBottom" | "BottomTop";
=======
<<<<<<< HEAD
  disposition?: 'LeftRight' | 'RightLeft' | 'TopBottom' | 'BottomTop';
=======
  disposition?: "LeftRight" | "RightLeft" | "TopBottom" | "BottomTop";
>>>>>>> 2d59d5f (merge)
>>>>>>> e678435 (merge)
  isRounded?: boolean;
  tension?: number;
  friction?: number;
}

<<<<<<< HEAD
declare const Card: React.FC<CardProps>;

export default Card;
>>>>>>> 50b671a (merge)
=======
<<<<<<< HEAD
export declare const Card: React.FC<CardProps>;
=======
declare const Card: React.FC<CardProps>;

export default Card;
>>>>>>> 2d59d5f (merge)
>>>>>>> e678435 (merge)
