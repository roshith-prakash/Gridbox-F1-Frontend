import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { DarkModeProvider } from "./context/DarkModeContext.tsx";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
