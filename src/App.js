import React from "react";
import "./App.css";
import Clock from "./components/Clock";

function App() {
    return (
        <div className="whole_background">
            <Clock city={"Sydney"} timezone={11} />
            <Clock city={"China"} timezone={8} />
            <Clock city={"London"} timezone={1} />
            <Clock city={"New York"} timezone={-4} />
        </div>
    );
}

export default App;
