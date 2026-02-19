# react-pop-cards

Animated pop card component for React with spring-based animations.

[![npm version](https://img.shields.io/npm/v/react-pop-cards.svg)](https://www.npmjs.com/package/react-pop-cards)
[![npm downloads](https://img.shields.io/npm/dw/react-pop-cards.svg)](https://www.npmjs.com/package/react-pop-cards)

> 📖 **[Live Playground](https://react-pop-cards.vercel.app)** — Try it in your browser

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
    <Card
      data={data}
      disposition="LeftRight"
      isRounded
      tension={120}
      friction={10}
      bgColor="#e5e7eb"
    />
  );
}
```

## Props

| Prop          | Type                                                       | Default        | Description                                      |
| ------------- | ---------------------------------------------------------- | -------------- | ------------------------------------------------ |
| `data`        | `CardItem[]`                                               | **(required)** | Array of exactly 4 card items                    |
| `disposition` | `"LeftRight" \| "RightLeft" \| "TopBottom" \| "BottomTop"` | `"LeftRight"`  | Layout direction                                 |
| `bgColor`     | `string`                                                   | `"#e5e7eb"`    | Background color (hex)                           |
| `isRounded`   | `boolean`                                                  | `false`        | Rounded corners on cards                         |
| `tension`     | `number`                                                   | `120`          | Spring animation tension (higher = snappier)     |
| `friction`    | `number`                                                   | `10`           | Spring animation friction (higher = more damped) |

### `CardItem`

```ts
interface CardItem {
  title: string;
  description: string;
  image?: string;
}
```

## TypeScript

Full TypeScript support out of the box. Types are exported from the package:

```ts
import { Card } from "react-pop-cards";
import type { CardProps, CardItem } from "react-pop-cards";
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (docs playground)
pnpm dev

# Build the library only
pnpm build

# Build the docs site (for Vercel deployment)
pnpm build:vercel

# Type check
pnpm typecheck
```

## Publishing to npm

1. **Login** to your npm account (one-time setup):

   ```bash
   npm login
   ```

2. **Build** the library:

   ```bash
   pnpm build
   ```

3. **Verify** the package contents before publishing:

   ```bash
   npm pack --dry-run
   ```

   This should show only `dist/` and `README.md` (as defined in `"files"` in package.json).

4. **Publish**:

   ```bash
   npm publish
   ```

   For the first publish of a new package name, you may need:

   ```bash
   npm publish --access public
   ```

5. **Bump version** for future releases:

   ```bash
   # Patch release (1.0.0 → 1.0.1) — bug fixes
   npm version patch

   # Minor release (1.0.0 → 1.1.0) — new features
   npm version minor

   # Major release (1.0.0 → 2.0.0) — breaking changes
   npm version major

   # Then publish
   npm publish
   ```

> **Tip:** Always run `pnpm build` before `npm publish` to ensure `dist/` is up to date.

## License

MIT © [thony32](https://github.com/thony32)
