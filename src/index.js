import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Card from './components/Card';

const array = ["Un", "Deux", "Trois", "Quatre"]

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Card data={array} isRounded={true} disposition="LeftRight" />
    </React.StrictMode>,
)

export { Card }
