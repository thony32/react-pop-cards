# react-pop-cards

Animated pop card components for React with spring-based animations. 10 unique variants, fully customizable.

[![npm version](https://img.shields.io/npm/v/react-pop-cards.svg)](https://www.npmjs.com/package/react-pop-cards)
[![npm downloads](https://img.shields.io/npm/dw/react-pop-cards.svg)](https://www.npmjs.com/package/react-pop-cards)

> 📖 **[Live Playground](https://react-pop-cards.vercel.app)** — Try all variants in your browser

## Installation

```bash
# pnpm
pnpm add react-pop-cards

# npm
npm install react-pop-cards

# yarn
yarn add react-pop-cards

# bun
bun add react-pop-cards
```

## Quick Start

```tsx
import { Card } from "react-pop-cards";
import "react-pop-cards/styles.css";

const data = [
  {
    title: "Design",
    description: "Beautiful UI components",
    image: "https://placehold.co/600x400",
  },
  {
    title: "Animate",
    description: "Spring-based animations",
    image: "https://placehold.co/600x400",
  },
  {
    title: "Build",
    description: "Production ready",
    image: "https://placehold.co/600x400",
  },
  {
    title: "Ship",
    description: "Lightweight bundle",
    image: "https://placehold.co/600x400",
  },
];

export default function App() {
  return (
    <Card data={data} disposition="LeftRight" isRounded bgColor="#e5e7eb" />
  );
}
```

## Components

### `Card`

2×2 grid with expandable active card and navigation pills.

```tsx
<Card data={data} disposition="LeftRight" bgColor="#e5e7eb" isRounded />
```

### `CardStack`

Stacked deck that fans out with rotation and offset transforms.

```tsx
<CardStack data={data} bgColor="#e5e7eb" isRounded />
```

### `CardCarousel`

Horizontal center-focus carousel with scale and opacity transitions.

```tsx
<CardCarousel data={data} bgColor="#e5e7eb" isRounded />
```

### `CardAccordion`

Vertical accordion with spring-animated height expand/collapse.

```tsx
<CardAccordion data={data} bgColor="#e5e7eb" isRounded />
```

### `CardFlip`

3D flip cards that reveal content on the back face.

```tsx
<CardFlip data={data} bgColor="#e5e7eb" isRounded />
```

### `CardOrbit`

Cards orbit around a central active card like planets in a solar system.

```tsx
<CardOrbit data={data} bgColor="#e5e7eb" isRounded />
```

### `CardTilt`

Cards with 3D parallax tilt on mouse hover, plus a glare effect.

```tsx
<CardTilt data={data} bgColor="#e5e7eb" isRounded />
```

### `CardMasonry`

Staggered masonry grid with sequential pop-in spring animations.

```tsx
<CardMasonry data={data} bgColor="#e5e7eb" isRounded />
```

### `CardSpiral`

Cards arranged in a logarithmic spiral with rotation twist on each selection.

```tsx
<CardSpiral data={data} bgColor="#e5e7eb" isRounded />
```

### `CardWave`

Wave pattern with sine-based vertical offsets that ripple on interaction.

```tsx
<CardWave data={data} bgColor="#e5e7eb" isRounded />
```

## Props

All components share these common props:

| Prop        | Type         | Default        | Description                                                                       |
| ----------- | ------------ | -------------- | --------------------------------------------------------------------------------- |
| `data`      | `CardItem[]` | **(required)** | Array of 2–10 card items                                                          |
| `bgColor`   | `string`     | `"#e5e7eb"`    | Background color — hex, rgb, hsl, named color, or CSS variable (`var(--primary)`) |
| `isRounded` | `boolean`    | `false`        | Rounded corners on cards                                                          |
| `tension`   | `number`     | varies         | Spring animation tension (higher = snappier)                                      |
| `friction`  | `number`     | varies         | Spring animation friction (higher = more damped)                                  |

**`Card` only:**

| Prop          | Type                                                       | Default       | Description      |
| ------------- | ---------------------------------------------------------- | ------------- | ---------------- |
| `disposition` | `"LeftRight" \| "RightLeft" \| "TopBottom" \| "BottomTop"` | `"LeftRight"` | Layout direction |

### `CardItem`

```ts
interface CardItem {
  title: string;
  description: string;
  image?: string;
}
```

> **Note:** `data` must contain between **2 and 10** items. Components will display an error message if outside this range.

## bgColor with CSS Variables

Pass CSS custom properties as the background color:

```tsx
<Card data={data} bgColor="var(--primary)" />
```

The component resolves the CSS variable at runtime and adjusts text color for contrast.

## TypeScript

Full TypeScript support. All types are exported:

```ts
import {
  Card,
  CardStack,
  CardCarousel,
  CardAccordion,
  CardFlip,
  CardOrbit,
  CardTilt,
  CardMasonry,
  CardSpiral,
  CardWave,
} from "react-pop-cards";
import type {
  CardProps,
  CardStackProps,
  CardCarouselProps,
  CardAccordionProps,
  CardFlipProps,
  CardOrbitProps,
  CardTiltProps,
  CardMasonryProps,
  CardSpiralProps,
  CardWaveProps,
  CardItem,
} from "react-pop-cards";
```
