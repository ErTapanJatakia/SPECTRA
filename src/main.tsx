import React from "react";
import ReactDOM from "react-dom/client";
import "./design-system.css";
import "./styles.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch((error: unknown) => {
      console.warn("SPECTRA offline support could not be registered.", error);
    });
  });
}
