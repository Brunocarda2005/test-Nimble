import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import "./SettingsBar.css";

// Component that displays application settings controls
// Allows switching between dark/light theme and English/Spanish
// Displays floating and minimizes on scroll
const SettingsBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detects when the user scrolls to minimize the controls
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`settings-bar ${isScrolled ? "settings-bar-scrolled" : ""}`}>
      <div className="settings-container">
        {/* Language control */}
        <div className="settings-control">
          {!isScrolled && <span className="settings-label">{t("language")}</span>}
          <button
            className={`settings-toggle ${language === "es" ? "active" : ""}`}
            onClick={toggleLanguage}
            aria-label="Toggle language"
            title={t("language")}
          >
            <span className="toggle-option">EN</span>
            <span className="toggle-option">ES</span>
            <span className="toggle-slider" />
          </button>
        </div>

        {/* Theme control */}
        <div className="settings-control">
          {!isScrolled && <span className="settings-label">{t("theme")}</span>}
          <button
            className={`settings-toggle ${theme === "light" ? "active" : ""}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={t("theme")}
          >
            <span className="toggle-option">🌙</span>
            <span className="toggle-option">☀️</span>
            <span className="toggle-slider" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsBar;
