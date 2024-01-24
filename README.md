# Docs (Beta)

Official documentation on [react-pop-cards](https://react-pop-cards.vercel.app)

## How can you use it in a jsx file?

Here is an example:

```jsx
import { Card } from "react-pop-cards"

const array = ["one", "two", "three", "four"]

const myApp = () => {
    return (
        <Card data={array} disposition="LeftRight" isRounded=true tension={120} friction={10}/>
    )
}

export default myApp

