import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CandidateProvider, ThemeProvider, LanguageProvider } from "@/contexts";

// Application entry point
// Wraps App in multiple providers to provide global contexts:
// - ThemeProvider: manages the theme (dark/light)
// - LanguageProvider: manages the language (en/es)
// - CandidateProvider: manages candidate authentication
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <CandidateProvider>
          <App />
        </CandidateProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
