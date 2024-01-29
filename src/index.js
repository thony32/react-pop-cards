import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
// import Card from './components/Card';
import Sandbox from "./Sandbox"

// const array = [
//     {
//         title: "Title1",
//         description: "Description1",
//         image: "https://placehold.co/600x400",
//     },
//     {
//         title: "Title2",
//         description: "Description2",
//         image: "https://placehold.co/600x400",
//     },
//     {
//         title: "Title3",
//         description: "Description3",
//         image: "https://placehold.co/600x400",
//     },
//     {
//         title: "Title4",
//         description: "Description4",
//         image: "https://placehold.co/600x400",
//     },
// ]

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* For sandbox */}
        <Sandbox />
        {/* For prod */}
        {/* <Card data={array} disposition="LeftRight" isRounded={false} tension={120} friction={10} bgColor="#e5e7eb"/> */}
    </React.StrictMode>
)

// export { Card }
