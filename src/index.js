import React from 'react';
import ReactDOM from 'react-dom';
import Card from "./components/Card"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Card />
    </React.StrictMode>,
    document.getElementById('root')
);


export { Card }
