import { createContext } from "react";

export type Language = "en" | "es";

// Type that defines the language context structure
// Allows switching between English and Spanish across the entire application
export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

// Creates the context that will be shared across the entire application
// Initially undefined until provided by LanguageProvider
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);
