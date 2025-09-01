import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <Provider>
    <Toaster />
    <App />
  </Provider>
);
