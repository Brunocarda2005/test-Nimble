import { useContext } from "react";
import { ThemeContext } from "@/contexts/theme.context";
import type { ThemeContextType } from "@/contexts/theme.context";

// Custom hook to access the theme context
// Validates that it's being used inside the ThemeProvider
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
