import { useContext } from "react";
import { LanguageContext } from "@/contexts/language.context";
import type { LanguageContextType } from "@/contexts/language.context";

// Custom hook to access the language context
// Validates that it's being used inside the LanguageProvider
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
