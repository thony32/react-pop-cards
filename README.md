# Docs (Beta)

Official documentation on [react-pop-cards](https://react-pop-cards.vercel.app)

## How can you use it in a jsx file?

Here is an example:

```jsx
import { Card } from "react-pop-cards"

const array = [
  {
    "title": "Title1",
    "description": "Description1",
    "image": "https://placehold.co/600x400"
  },
  {
    "title": "Title2",
    "description": "Description2",
    "image": "https://placehold.co/600x400"
  },
  {
    "title": "Title3",
    "description": "Description3",
    "image": "https://placehold.co/600x400"
  },
  {
    "title": "Title4",
    "description": "Description4",
    "image": "https://placehold.co/600x400"
  }
]

const myApp = () => {
    return (
        <Card data={array} disposition="LeftRight" isRounded=true tension={120} friction={10}/>
    )
}

export default myApp

```
