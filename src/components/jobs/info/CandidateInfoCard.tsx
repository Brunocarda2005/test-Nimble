import React, { useState, useEffect, useRef, useCallback } from "react";
import type { CandidateInfoCardProps } from "@/models";
import { getInitials } from "@/utils";
import { useTranslation } from "@/hooks";
import "./CandidateInfoCard.css";

/**
 * Configuration constants for the card's sticky behavior.
 * STICKY_OFFSET_TOP: Distance in pixels from the top of the viewport when sticky is activated.
 * CARD_HEIGHT: Total height of the card including padding and margins (20px padding + 48px content + 20px padding + 32px margin).
 */
const STICKY_CONFIG = {
  STICKY_OFFSET_TOP: 24,
  CARD_HEIGHT: 88,
  CARD_MARGIN_BOTTOM: 32,
} as const;

/**
 * CandidateInfoCard
 * 
 * Component that displays the authenticated candidate's information on the jobs page.
 * 
 * Functionality:
 * - Displays the candidate's avatar with initials generated from their full name.
 * - Presents the candidate's full name and email.
 * - Includes a logout button that triggers the onLogout callback.
 * - Implements sticky behavior: when the user scrolls down, the card sticks
 *   to the top of the viewport to keep the candidate's information always visible.
 * - Uses an invisible placeholder to prevent content jumps when the card changes to sticky.
 * 
 * Performance:
 * - The scroll listener is optimized with useCallback to avoid unnecessary recreations.
 * - The initial position is calculated dynamically to support different screen resolutions.
 * 
 * @param props - CandidateInfoCardProps with the candidate's information and logout handler.
 * @returns React element that renders the candidate information card.
 */
const CandidateInfoCard: React.FC<CandidateInfoCardProps> = ({
  candidate,
  onLogout,
}) => {
  const { firstName, lastName, email } = candidate;
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const cardRef = useRef<HTMLElement>(null);
  const initialOffsetRef = useRef<number | null>(null);
  const { t } = useTranslation();

  const fullName = `${firstName} ${lastName}`;

  /**
   * Calculates whether the card should be in sticky state based on the current scroll position.
   * 
   * The card becomes sticky when the user's scroll exceeds the card's initial position
   * minus the configured offset (STICKY_OFFSET_TOP). This creates a smooth effect where the card
   * begins to stick just before it disappears from view.
   * 
   * @returns true if the card should be sticky, false otherwise.
   */
  const shouldBeSticky = useCallback((): boolean => {
    if (!cardRef.current) {
      return false;
    }

    // Calculates and saves the initial position only the first time
    if (initialOffsetRef.current === null) {
      initialOffsetRef.current = cardRef.current.offsetTop;
    }

    const scrollThreshold =
      initialOffsetRef.current - STICKY_CONFIG.STICKY_OFFSET_TOP;

    return window.scrollY > scrollThreshold;
  }, []);

  /**
   * Scroll event handler that updates the sticky state of the card.
   * 
   * Executes every time the user scrolls on the page and determines
   * whether the card should switch between its normal and sticky state.
   * 
   * Wrapped in useCallback to maintain the same function reference
   * and avoid adding/removing listeners unnecessarily.
   */
  const handleScroll = useCallback(() => {
    const newStickyState = shouldBeSticky();
    setIsSticky(newStickyState);
  }, [shouldBeSticky]);

  /**
   * Effect hook that registers and cleans up the scroll listener.
   * 
   * Executes only when mounting the component and configures the global scroll listener.
   * The cleanup function ensures that the listener is removed when the component unmounts,
   * preventing memory leaks and errors.
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup: removes the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  /**
   * Renders a placeholder div when the card is in sticky mode.
   * 
   * This placeholder occupies the space that the card would normally occupy in the document flow.
   * Prevents the content below the card from jumping up when the card becomes
   * position: fixed (which removes it from the normal document flow).
   */
  const renderPlaceholder = (): React.ReactElement | null => {
    if (!isSticky) {
      return null;
    }

    return (
      <div
        style={{
          height: `${STICKY_CONFIG.CARD_HEIGHT}px`,
          marginBottom: `${STICKY_CONFIG.CARD_MARGIN_BOTTOM}px`,
        }}
        aria-hidden="true"
      />
    );
  };

  /**
   * Generates CSS classes for the card based on its sticky state.
   * 
   * @returns String with CSS classes separated by space.
   */
  const getCardClassName = (): string => {
    const baseClass = "candidate-info";
    const stickyClass = "candidate-info-sticky";

    return isSticky ? `${baseClass} ${stickyClass}` : baseClass;
  };

  return (
    <>
      {renderPlaceholder()}

      <section ref={cardRef} className={getCardClassName()} aria-label="Candidate information">
        <div className="candidate-avatar" aria-hidden="true">
          {getInitials(fullName)}
        </div>

        <div className="candidate-details">
          <div className="candidate-name">{fullName}</div>
          <div className="candidate-email">{email}</div>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
          aria-label={t("signOut")}
        >
          <svg
            className="logout-button-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="logout-button-text">{t("signOut")}</span>
        </button>
      </section>
    </>
  );
};

export default CandidateInfoCard;
