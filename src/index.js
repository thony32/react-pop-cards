import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

const array = ["Un","Deux","Trois","Quatre"]

ReactDOM.render(
    <React.StrictMode>
        <Card data={array} bgColor="bg-red-500"/>
    </React.StrictMode>,
    document.getElementById("root")
)

export { App }
