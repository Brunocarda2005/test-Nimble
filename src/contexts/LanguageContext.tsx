import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { LanguageContext, type Language } from "./language.context";

const STORAGE_KEY = "app-language";

interface LanguageProviderProps {
  children: ReactNode;
}

// Provider that manages the application's language (English/Spanish)
// Persists the preference in localStorage
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Language) || "en";
  });

  // Saves the preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
