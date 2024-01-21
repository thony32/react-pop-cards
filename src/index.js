import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Card from './components/Card';

ReactDOM.render(
    <React.StrictMode>
        <Card bgColor="bg-red-500" />
    </React.StrictMode>,
    document.getElementById("root")
)

export { Card }
