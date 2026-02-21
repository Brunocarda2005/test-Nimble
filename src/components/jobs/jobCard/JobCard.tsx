import React, { useState, useCallback } from "react";
import { JobService } from "@/services";
import type { Job, Candidate } from "@/models";
import { isError, isValidGitHubUrl } from "@/utils";
import { errors } from "@/constants/error.constants";
import { $Default } from "@/constants/defualt.constants";
import { useTranslation } from "@/hooks";
import "./JobCard.css";

/**
 * Props for the JobCard component.
 * 
 * @property job - Information about the available job (id, title, description).
 * @property candidate - Data of the candidate who is applying (uuid, candidateId).
 */
interface JobCardProps {
  job: Job;
  candidate: Candidate;
}

/**
 * Possible states of the job application.
 */
interface ApplicationState {
  repoUrl: string;
  isSubmitting: boolean;
  error: string;
  isSuccess: boolean;
}

/**
 * JobCard
 * 
 * Component that represents an individual job offer card.
 * 
 * Functionality:
 * - Displays job information (title and ID).
 * - Provides a form for the candidate to enter their GitHub repository URL.
 * - Validates the repository URL before submitting it.
 * - Sends the application to the API when the form is valid.
 * - Manages loading, error, and success states independently.
 * - Automatically clears the form after a successful application.
 * 
 * Validations:
 * - The URL cannot be empty.
 * - The URL must be a valid GitHub repository.
 * - The format is validated using the isValidGitHubUrl utility.
 * 
 * States:
 * - repoUrl: URL entered by the user.
 * - isSubmitting: Indicates whether a request is in progress.
 * - error: Error message to display.
 * - isSuccess: Indicates whether the application was successful.
 * 
 * @param props - JobCardProps with the job and candidate information.
 * @returns React element that renders the job card with its form.
 */
const JobCard: React.FC<JobCardProps> = ({ job, candidate }) => {
  const { t } = useTranslation();
  
  const [state, setState] = useState<ApplicationState>({
    repoUrl: $Default.EMPTY_STRING,
    isSubmitting: false,
    error: $Default.EMPTY_STRING,
    isSuccess: false,
  });

  /**
   * Updates the application state partially.
   * 
   * @param updates - Object with the state properties to update.
   */
  const updateState = useCallback(
    (updates: Partial<ApplicationState>): void => {
      setState((prevState) => ({ ...prevState, ...updates }));
    },
    []
  );

  /**
   * Resets error and success messages when the user modifies the URL.
   * Maintains a clean user experience by removing outdated feedback.
   */
  const clearMessages = useCallback((): void => {
    updateState({
      error: $Default.EMPTY_STRING,
      isSuccess: false,
    });
  }, [updateState]);

  /**
   * Handler for changes in the repository URL input.
   * 
   * Updates the state with the new URL and clears any previous error or success messages.
   * This provides immediate and clean feedback when the user corrects errors.
   * 
   * @param url - New URL entered by the user.
   */
  const handleRepoUrlChange = useCallback(
    (url: string): void => {
      updateState({ repoUrl: url });
      clearMessages();
    },
    [updateState, clearMessages]
  );

  /**
   * Validates the repository URL entered by the user.
   * 
   * Performs two levels of validation:
   * 1. Verifies that the URL is not empty after removing spaces.
   * 2. Validates that it is a valid GitHub URL using isValidGitHubUrl.
   * 
   * @param url - Repository URL to validate.
   * @returns Object with the validation state and error message if applicable.
   */
  const validateRepositoryUrl = useCallback(
    (url: string): { isValid: boolean; errorMessage: string } => {
      const trimmedUrl = url.trim();

      if (!trimmedUrl) {
        return {
          isValid: false,
          errorMessage: errors.INVALID_GITHUB_URL,
        };
      }

      const { valid, message } = isValidGitHubUrl(trimmedUrl);

      return {
        isValid: valid,
        errorMessage: valid ? $Default.EMPTY_STRING : message,
      };
    },
    []
  );

  /**
   * Sends the candidate's application to the API.
   * 
   * Builds the payload with the candidate and job information,
   * then makes the request to the service. If the response is successful,
   * updates the state to show the success message and clears the form.
   * 
   * @param url - Validated repository URL.
   * @throws Error if the request fails.
   */
  const submitApplication = useCallback(
    async (url: string): Promise<void> => {
      const payload = {
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl: url,
      };

      const result = await JobService.applyToJob(payload);

      if (result.ok) {
        updateState({
          isSuccess: true,
          repoUrl: $Default.EMPTY_STRING,
          error: $Default.EMPTY_STRING,
        });
      }
    },
    [candidate, job, updateState]
  );

  /**
   * Main handler for form submission.
   * 
   * Execution flow:
   * 1. Prevents the default form behavior.
   * 2. Validates the repository URL.
   * 3. If validation fails, displays the error and stops the flow.
   * 4. If validation passes, activates loading state and sends the application.
   * 5. Handles API errors and displays them to the user.
   * 6. Finalizes the loading state regardless of the result.
   * 
   * @param e - Form event.
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      const { isValid, errorMessage } = validateRepositoryUrl(state.repoUrl);

      if (!isValid) {
        updateState({ error: errorMessage });
        return;
      }

      updateState({ isSubmitting: true, error: $Default.EMPTY_STRING });

      try {
        await submitApplication(state.repoUrl.trim());
      } catch (err) {
        const errorMsg = isError(err)
          ? err.message
          : errors.APPLICATION_FAILED;
        updateState({ error: errorMsg });
      } finally {
        updateState({ isSubmitting: false });
      }
    },
    [state.repoUrl, validateRepositoryUrl, submitApplication, updateState]
  );

  /**
   * Determines whether the submit button should be disabled.
   * 
   * @returns true if submitting or the URL is empty.
   */
  const isSubmitDisabled = (): boolean => {
    return state.isSubmitting || !state.repoUrl.trim();
  };

  /**
   * Gets the submit button text based on the current state.
   * 
   * @returns Translated text for the button.
   */
  const getSubmitButtonText = (): string => {
    return state.isSubmitting ? t("submitting") : t("submitApplication");
  };

  return (
    <article className="job-card" aria-labelledby={`job-title-${job.id}`}>
      <header className="job-header">
        <h3 id={`job-title-${job.id}`} className="job-title">
          {job.title}
        </h3>
        <p className="job-id" aria-label={`${t("jobId")}: ${job.id}`}>
          {t("jobId")}: {job.id}
        </p>
      </header>

      <form className="job-form" onSubmit={handleSubmit} noValidate>
        <div className="repo-input-group">
          <label htmlFor={`repo-${job.id}`} className="repo-label">
            {t("githubRepoUrl")}
          </label>
          <input
            id={`repo-${job.id}`}
            type="url"
            className="repo-input"
            placeholder={$Default.GITHUB}
            value={state.repoUrl}
            onChange={(e) => handleRepoUrlChange(e.target.value)}
            disabled={state.isSubmitting}
            aria-invalid={!!state.error}
            aria-describedby={
              state.error ? `error-${job.id}` : undefined
            }
          />
        </div>

        {state.error && (
          <div
            id={`error-${job.id}`}
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {state.error}
          </div>
        )}

        {state.isSuccess && (
          <div
            className="success-message"
            role="status"
            aria-live="polite"
          >
            {t("applicationSuccess")}
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitDisabled()}
          aria-busy={state.isSubmitting}
        >
          {getSubmitButtonText()}
        </button>
      </form>
    </article>
  );
};

export default JobCard;
