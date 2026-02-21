import React, { useState, useEffect, useCallback } from "react";
import type { Job } from "@/models";
import { JobService } from "@/services";
import { useCandidateContext, useTranslation } from "@/hooks";
import { errors } from "@/constants/error.constants";
import { isError } from "@/utils";
import JobsHeader from "../../../components/jobs/header/JobsHeader";
import CandidateInfoCard from "../../../components/jobs/info/CandidateInfoCard";
import JobCard from "../../../components/jobs/jobCard/JobCard";
import "./JobsPage.css";

/**
 * Possible states for jobs loading.
 */
interface JobsState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
}

/**
 * JobsPage
 * 
 * Main component of the available jobs page.
 * 
 * Responsibilities:
 * - Get and manage the list of available jobs from the API.
 * - Render the page header with title and subtitle.
 * - Display the authenticated candidate's information with sticky functionality.
 * - Present the list of jobs through independent JobCard components.
 * - Manage loading, error, and empty list states with appropriate UI.
 * - Delegate application logic to each individual JobCard.
 * 
 * Flow:
 * 1. On mount, verifies that an authenticated candidate exists.
 * 2. Loads the list of jobs from the API.
 * 3. Renders different views based on state (loading, error, empty, list).
 * 4. Each job is rendered as an independent JobCard component.
 * 
 * States:
 * - jobs: Array of available jobs.
 * - isLoading: Indicates whether the jobs request is in progress.
 * - error: Error message if the load fails.
 * 
 * @returns React element with the complete jobs page or null if there's no candidate.
 */
const JobsPage: React.FC = () => {
  const { candidate, logout } = useCandidateContext();
  const { t } = useTranslation();
  
  const [state, setState] = useState<JobsState>({
    jobs: [],
    isLoading: false,
    error: null,
  });

  /**
   * Updates the page state partially.
   * 
   * @param updates - Object with the state properties to update.
   */
  const updateState = useCallback(
    (updates: Partial<JobsState>): void => {
      setState((prevState) => ({ ...prevState, ...updates }));
    },
    []
  );

  /**
   * Gets the list of available jobs from the API.
   * 
   * Flow:
   * 1. Activates loading state and clears previous errors.
   * 2. Makes the request to the jobs service.
   * 3. If successful, updates the state with the list of jobs.
   * 4. If it fails, captures the error and updates the state with the message.
   * 5. Finalizes the loading state regardless of the result.
   * 
   * Executes automatically when mounting the component.
   */
  const loadJobs = useCallback(async (): Promise<void> => {
    updateState({ isLoading: true, error: null });

    try {
      const jobsList = await JobService.getJobsList();
      updateState({ jobs: jobsList, error: null });
    } catch (err) {
      const errorMsg = isError(err) ? err.message : errors.LOAD_JOBS_FAILED;
      updateState({ error: errorMsg });
    } finally {
      updateState({ isLoading: false });
    }
  }, [updateState]);

  /**
   * Effect hook that loads jobs when mounting the component.
   * 
   * Executes only once after the first render.
   */
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  /**
   * Renders the loading state with a spinner and message.
   * 
   * @returns Element with animated spinner and loading text.
   */
  const renderLoadingState = (): React.ReactElement => (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true"></div>
      <p>{t("loadingPositions")}</p>
    </div>
  );

  /**
   * Renders the empty state when there are no jobs available.
   * 
   * @returns Element with empty list message.
   */
  const renderEmptyState = (): React.ReactElement => (
    <div className="empty-state" role="status">
      <p>{t("noPositions")}</p>
    </div>
  );

  /**
   * Renders the list of job cards.
   * 
   * Each job is rendered as an independent JobCard component that handles
   * its own application logic and state.
   * 
   * @returns Element with the list of JobCards.
   */
  const renderJobsList = (): React.ReactElement => (
    <div className="jobs-list" role="list">
      {state.jobs.map((job) => (
        <JobCard key={job.id} job={job} candidate={candidate!} />
      ))}
    </div>
  );

  /**
   * Determines what content to render based on the current state.
   * 
   * Rendering priority:
   * 1. Loading state: Shows spinner.
   * 2. Empty list: Shows no jobs message.
   * 3. List with jobs: Shows the cards.
   * 
   * @returns The appropriate React element based on the state.
   */
  const renderContent = (): React.ReactElement => {
    if (state.isLoading) {
      return renderLoadingState();
    }

    if (state.jobs.length === 0) {
      return renderEmptyState();
    }

    return renderJobsList();
  };

  // If there's no authenticated candidate, don't render the page
  if (!candidate) {
    return null;
  }

  return (
    <div className="jobs-page">
      <div className="jobs-container">
        <JobsHeader />
        
        <CandidateInfoCard candidate={candidate} onLogout={logout} />

        {state.error && (
          <div className="error-message" role="alert" aria-live="assertive">
            {state.error}
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
};

export default JobsPage;
