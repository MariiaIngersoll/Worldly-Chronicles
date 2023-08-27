import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
