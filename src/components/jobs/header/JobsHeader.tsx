import React from "react";
import { useTranslation } from "@/hooks";
import "./JobsHeader.css";

/**
 * JobsHeader
 * 
 * Presentation component that renders the header of the available jobs page.
 * 
 * Functionality:
 * - Displays the main section title using i18n translations.
 * - Presents a descriptive subtitle that explains to the user how to apply to positions.
 * - Supports multiple languages through the useTranslation hook.
 * 
 * Features:
 * - Stateless component optimized for rendering.
 * - Uses semantic HTML elements (header, h1, p) for better accessibility.
 * - Animations and visual styles are handled via external CSS.
 * 
 * @returns Header element with translated title and subtitle.
 */
const JobsHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="jobs-header" role="banner">
      <h1 className="jobs-title">{t("availablePositions")}</h1>
      <p className="jobs-subtitle">{t("applyToPositions")}</p>
    </header>
  );
};

export default JobsHeader;
