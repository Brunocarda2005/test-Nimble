import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext, type Theme } from "./theme.context";

const STORAGE_KEY = "app-theme";

interface ThemeProviderProps {
  children: ReactNode;
}

// Provider that manages the application's theme (dark/light)
// Persists the preference in localStorage and applies the CSS variables
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Theme) || "dark";
  });

  // Applies the theme to the document and saves to localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
