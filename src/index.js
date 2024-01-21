import React from 'react';
import ReactDOM from 'react-dom';
import Card from "./components/Card"
import "./index.css"

const array = ["Un","Deux","Trois","Quatre"]

ReactDOM.render(
    <React.StrictMode>
        <Card data={array}/>
    </React.StrictMode>,
    document.getElementById('root')
);


export { Card }
