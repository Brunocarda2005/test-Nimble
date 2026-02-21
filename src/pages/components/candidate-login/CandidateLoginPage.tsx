import React, { useState } from "react";
import { useCandidateContext, useTranslation } from "@/hooks";
import "./CandidateLoginPage.css";
import { isError } from "@/utils";
import { $Default } from "@/constants/defualt.constants";
import type { TranslationKey } from "@/constants/translations.constants";

// Candidate login component
// Displays a simple form where the user enters their email
// On submit, calls the context to authenticate and retrieve candidate data
// If there's an error, it displays it on screen
const CandidateLoginPage: React.FC = () => {
  const [email, setEmail] = useState($Default.EMPTY_STRING);
  const [errorKey, setErrorKey] = useState<TranslationKey | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useCandidateContext();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorKey(null);

    if (!email.trim()) {
      setErrorKey("enterEmail");
      return;
    }

    setIsLoading(true);

    try {
      await login(email);
    } catch (err) {
      const valid = isError(err) && err.message === "INVALID_EMAIL";
      const errorTranslationKey = valid ? "invalidEmail" : "authFailed";
      setErrorKey(errorTranslationKey);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="candidate-login-page">
      <div className="candidate-login-container">
        <div className="candidate-login-card">
          <div className="candidate-login-header">
            <h1 className="candidate-login-title">
              {t("jobApplicationPortal")}
            </h1>
            <p className="candidate-login-subtitle">{t("enterEmailAccess")}</p>
          </div>

          <form
            className="candidate-login-form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="candidate-form-group">
              <label htmlFor="email" className="candidate-form-label">
                {t("emailAddress")}
              </label>
              <input
                id="email"
                type="email"
                className="candidate-form-input"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoFocus
              />
            </div>

            {errorKey && (
              <div className="candidate-error-message" role="alert">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 4v4M8 10h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{t(errorKey)}</span>
              </div>
            )}

            <button type="submit" className="candidate-login-button">
              {t(isLoading ? "authenticating" : "continue")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateLoginPage;
