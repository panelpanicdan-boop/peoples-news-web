import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css"; // optional: we'll include minimal inline styles in App.js, but leave for extension

const root = createRoot(document.getElementById("root"));
root.render(<App />);
