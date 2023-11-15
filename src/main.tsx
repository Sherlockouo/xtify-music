import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './i18n/i18n'
import 'virtual:svg-icons-register'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);