import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Card from './components/Card';
import Sandbox from "./Sandbox";

const array = ["Un", "Deux", "Trois", "Quatre"]

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* For sandbox */}
        {/* <Sandbox /> */}
        {/* For prod */}
        <Card data={array} />
    </React.StrictMode>,
)

export { Card }
