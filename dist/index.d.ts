<<<<<<< HEAD
import { ReactNode, ReactElement, CSSProperties } from 'react';

=======
>>>>>>> 2d59d5f (merge)
interface CardDataItem {
  title: string;
  description: string;
  image?: string;
<<<<<<< HEAD
=======
  // Ajoutez d'autres propriétés si nécessaire
>>>>>>> 2d59d5f (merge)
}

interface CardProps {
  data: CardDataItem[];
  bgColor?: string;
<<<<<<< HEAD
  disposition?: 'LeftRight' | 'RightLeft' | 'TopBottom' | 'BottomTop';
=======
  disposition?: "LeftRight" | "RightLeft" | "TopBottom" | "BottomTop";
>>>>>>> 2d59d5f (merge)
  isRounded?: boolean;
  tension?: number;
  friction?: number;
}

<<<<<<< HEAD
export declare const Card: React.FC<CardProps>;
=======
declare const Card: React.FC<CardProps>;

export default Card;
>>>>>>> 2d59d5f (merge)
