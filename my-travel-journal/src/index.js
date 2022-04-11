import React from "react";
import App from "./App";
import "./index.css";

// For upto v17
// import ReactDOM from "react-dom";
// ReactDOM.render(<App />,document.getElementById("root") );

// for v18+
import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")).render(<App />);
