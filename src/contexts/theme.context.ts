import { createContext } from "react";

export type Theme = "dark" | "light";

// Type that defines the theme context structure
// Allows switching between dark and light mode across the entire application
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Creates the context that will be shared across the entire application
// Initially undefined until provided by ThemeProvider
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
